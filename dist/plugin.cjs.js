'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var terser = require('terser');
var pluginutils = require('@rollup/pluginutils');

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

module.exports = exports.default;
Object.assign(module.exports, exports);
//# sourceMappingURL=plugin.cjs.js.map
