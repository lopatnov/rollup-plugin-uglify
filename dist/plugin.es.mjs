import { minify } from 'terser';
import { createFilter } from '@rollup/pluginutils';

function uglify(options = {}) {
    const filter = createFilter(options.include, options.exclude);
    const hook = options.hook || "renderChunk";
    delete options.include;
    delete options.exclude;
    delete options.hook;
    async function minifyCode(code, sourceMap) {
        if (typeof options.sourceMap === "undefined") {
            options.sourceMap = sourceMap;
        }
        const result = await minify(code, options);
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

export { uglify as default, uglify };
//# sourceMappingURL=plugin.es.mjs.map
