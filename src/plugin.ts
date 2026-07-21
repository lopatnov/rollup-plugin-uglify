import {
  Plugin,
  NormalizedOutputOptions,
  RenderedChunk,
  SourceMapInput,
  TransformPluginContext,
} from "rollup";
import { minify, MinifyOptions } from "terser";
import { createFilter } from "@rollup/pluginutils";

export interface IUglifyOptions extends MinifyOptions {
  include?: string | RegExp;
  exclude?: string | RegExp;
  /** @default "transform" */
  hook?: "renderChunk" | "transform";
}

function uglify(options: IUglifyOptions = {}): Plugin {
  const { include, exclude, hook: hookOption, ...terserOptions } = options;
  const filter = createFilter(include, exclude);
  const hook = hookOption || "transform";

  async function minifyCode(code: string, defaultSourceMap: boolean) {
    const minifyOptions = {
      ...terserOptions,
      sourceMap:
        terserOptions.sourceMap !== undefined
          ? terserOptions.sourceMap
          : defaultSourceMap,
    };

    const result = await minify(code, minifyOptions);

    if (!result || !result.code) {
      throw new Error("Minification failed: no result");
    }

    return {
      code: result.code,
      map: result.map as SourceMapInput | undefined,
    };
  }

  const plugin: Plugin = {
    name: "uglify",
  };

  if (hook === "transform") {
    plugin.transform = async function (
      this: TransformPluginContext,
      code: string,
      id: string,
    ) {
      if (!filter(id)) {
        return null;
      }
      return minifyCode(code, true);
    };
  } else {
    plugin.renderChunk = async function (
      code: string,
      chunk: RenderedChunk,
      outputOptions: NormalizedOutputOptions,
    ) {
      if (!filter(chunk.fileName)) {
        return null;
      }
      return minifyCode(code, !!outputOptions.sourcemap);
    };
  }

  return plugin;
}

export { uglify };
export default uglify;
