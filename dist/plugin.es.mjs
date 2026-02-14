import { minify } from 'terser';
import { createFilter } from '@rollup/pluginutils';

function uglify(options = {}) {
    const filter = createFilter(options.include, options.exclude);
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
            const result = await minify(code, options);
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

export { uglify as default, uglify };
//# sourceMappingURL=plugin.es.mjs.map
