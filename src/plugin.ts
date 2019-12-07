import { Plugin } from 'rollup';
import { minify, MinifyOptions } from "terser";
import { createFilter } from "rollup-pluginutils";

export interface IUglifyOptions extends MinifyOptions {
  include?: string | RegExp;
  exclude?: string | RegExp;
}

function uglify(options: IUglifyOptions = {}): Plugin {
  const filter = createFilter(options.include, options.exclude);
  return {
    name: "uglify",
    transform(code: any, id: any) {
      if (!filter(id)) {
        return;
      }

      if (typeof options.sourceMap === "undefined") {
        options.sourceMap = true;
      }

      if (typeof options.warnings === "undefined") {
        options.warnings = true;
      }

      const result = minify(code, options);

      if (result.error) {
        throw result.error;
      }

      if (result.warnings) {
        result.warnings.forEach(warning => {
          this.warn(warning);
        });
      }

      return {
        code: result.code,
        map: result.map
      } as any;
    }
  };
}

export default uglify;
