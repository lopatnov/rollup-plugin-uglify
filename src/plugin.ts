import { Plugin, TransformPluginContext } from "rollup";
import { minify, MinifyOptions } from "terser";
import { createFilter } from "@rollup/pluginutils";

export interface IUglifyOptions extends MinifyOptions {
  include?: string | RegExp;
  exclude?: string | RegExp;
}

function uglify(options: IUglifyOptions = {}): Plugin {
  const filter = createFilter(options.include, options.exclude);
  delete options.include;
  delete options.exclude;
  
  return {
    name: "uglify",
    async transform(this: TransformPluginContext, code: string, id: string) {
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
        map: result.map as any,
      };
    },
  };
}

export default uglify;
