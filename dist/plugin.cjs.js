'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var terser = require('terser');
var pluginutils = require('@rollup/pluginutils');

function uglify(options = {}) {
    const { include, exclude, hook: hookOption, ...terserOptions } = options || {};
    const filter = pluginutils.createFilter(include, exclude);
    const hook = hookOption || "transform";
    async function minifyCode(code, defaultSourceMap) {
        const minifyOptions = {
            ...terserOptions,
            sourceMap: terserOptions.sourceMap !== undefined
                ? terserOptions.sourceMap
                : defaultSourceMap,
        };
        const result = await terser.minify(code, minifyOptions);
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
