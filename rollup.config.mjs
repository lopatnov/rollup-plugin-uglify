import json from "@rollup/plugin-json";
import esbuild from "rollup-plugin-esbuild";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

import pkg from "./package.json" with { type: "json" };

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {})
];

const plugins = [
  json(),
  esbuild({
    tsconfig: "./tsconfig.json"
  }),
  resolve({
    preferBuiltins: true
  }),
  commonjs()
];

export default {
  input: pkg.source,

  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
      exports: "named",
      outro: "module.exports = exports.default;\nObject.assign(module.exports, exports);"
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true
    },
    {
      file: pkg.browser,
      format: "umd",
      name: pkg.umdName,
      sourcemap: true,
      exports: "named",
      globals: {
        "@rollup/pluginutils": "pluginutils",
        terser: "terser",
        path: "path"
      }
    }
  ],

  external,
  plugins
};
