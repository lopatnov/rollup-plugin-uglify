(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('terser'), require('@rollup/pluginutils')) :
    typeof define === 'function' && define.amd ? define(['exports', 'terser', '@rollup/pluginutils'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.uglify = {}, global.terser, global.pluginutils));
})(this, (function (exports, terser, pluginutils) { 'use strict';

    function uglify(options = {}) {
        const filter = pluginutils.createFilter(options.include, options.exclude);
        const hook = options.hook || "renderChunk";
        delete options.include;
        delete options.exclude;
        delete options.hook;
        async function minifyCode(code, sourceMap) {
            if (typeof options.sourceMap === "undefined") {
                options.sourceMap = sourceMap;
            }
            const result = await terser.minify(code, options);
            if (!result || !result.code) {
                throw new Error("Minification failed: no result");
            }
            return {
                code: result.code,
                map: result.map,
            };
        }
        const plugin = {
            name: "uglify",
        };
        if (hook === "transform") {
            plugin.transform = async function (code, id) {
                if (!filter(id)) {
                    return null;
                }
                return minifyCode(code, true);
            };
        }
        else {
            plugin.renderChunk = async function (code, chunk, outputOptions) {
                if (!filter(chunk.fileName)) {
                    return null;
                }
                return minifyCode(code, !!outputOptions.sourcemap);
            };
        }
        return plugin;
    }

    exports.default = uglify;
    exports.uglify = uglify;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=plugin.umd.js.map
