import json from "rollup-plugin-json";
import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";

import pkg from "./package.json" assert { type: "json" };

export default {
  input: pkg.source,
  output: [
    {
      file: pkg.main,
      format: "umd",
      name: pkg.umdName,
      sourcemap: true
    },
    {
      file: pkg.module,
      format: "cjs",
      sourcemap: true
    }
  ],
  external: [
    ...Object.keys(pkg.devDependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ],

  plugins: [
    json(),
    typescript(),
    resolve({
      preferBuiltins: true
    }),
    commonjs(),
  ]
};
