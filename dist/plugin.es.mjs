import { minify } from 'terser';
import { createFilter } from '@rollup/pluginutils';

function uglify(options = {}) {
  const {
    include,
    exclude,
    hook: hookOption,
    ...terserOptions
  } = options || {};
  const filter = createFilter(include, exclude);
  const hook = hookOption || "transform";
  async function minifyCode(code, defaultSourceMap) {
    const minifyOptions = {
      ...terserOptions,
      sourceMap: terserOptions.sourceMap !== void 0 ? terserOptions.sourceMap : defaultSourceMap
    };
    const result = await minify(code, minifyOptions);
    if (!result || !result.code) {
      throw new Error("Minification failed: no result");
    }
    return {
      code: result.code,
      map: result.map
    };
  }
  const plugin = {
    name: "uglify"
  };
  if (hook === "transform") {
    plugin.transform = async function(code, id) {
      if (!filter(id)) {
        return null;
      }
      return minifyCode(code, true);
    };
  } else {
    plugin.renderChunk = async function(code, chunk, outputOptions) {
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
