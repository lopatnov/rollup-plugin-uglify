import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

import pkg from "./package.json" with { type: "json" };

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {})
];

const plugins = [
  json(),
  typescript({
    tsconfig: "./tsconfig.json",
    declaration: true,
    declarationMap: true
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
