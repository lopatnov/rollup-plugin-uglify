(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('terser'), require('@rollup/pluginutils')) :
    typeof define === 'function' && define.amd ? define(['exports', 'terser', '@rollup/pluginutils'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.uglify = {}, global.terser, global.pluginutils));
})(this, (function (exports, terser, pluginutils) { 'use strict';

    function uglify(options = {}) {
        const filter = pluginutils.createFilter(options.include, options.exclude);
        delete options.include;
        delete options.exclude;
        return {
            name: "uglify",
            async transform(code, id) {
                if (!filter(id)) {
                    return null;
                }
                if (typeof options.sourceMap === "undefined") {
                    options.sourceMap = true;
                }
                const result = await terser.minify(code, options);
                if (!result || !result.code) {
                    throw new Error("Minification failed: no result");
                }
                return {
                    code: result.code,
                    map: result.map,
                };
            },
        };
    }

    exports.default = uglify;
    exports.uglify = uglify;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=plugin.umd.js.map
