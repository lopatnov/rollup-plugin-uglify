import { Plugin, TransformPluginContext, TransformResult } from "rollup";
import { minify, MinifyOptions } from "terser";
import { createFilter } from '@rollup/pluginutils';

export interface IUglifyOptions extends MinifyOptions {
  include?: string | RegExp;
  exclude?: string | RegExp;
}

function uglify(options: IUglifyOptions = {}): Plugin {
  const filter = createFilter(options.include, options.exclude);
  return {
    name: "uglify",
    transform(this: TransformPluginContext, code: any, id: any) {
      if (!filter(id)) {
        return;
      }

      if (typeof options.sourceMap === "undefined") {
        options.sourceMap = true;
      }

      if (typeof (options as any).warnings === "undefined") {
        (options as any).warnings = true;
      }

      const result = minify(code, options);

      if (!(result instanceof Promise)) {
        if ((result as any).error) {
          throw (result as any).error;
        }

        if ((result as any).warnings) {
          (result as any).warnings.forEach((warning: any) => {
            this.warn(warning);
          });
        }

        return {
          code: (result as any).code,
          map: (result as any).map,
        } as TransformResult;
      } else {
        return result as Promise<TransformResult>;
      }
    },
  };
}

export default uglify;
