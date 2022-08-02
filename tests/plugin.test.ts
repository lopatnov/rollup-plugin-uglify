import "core-js";
import "core-js/features/global-this";
import { rollup } from "rollup";
import uglify from "../src/plugin";

describe("rollup-plugin-uglify", () => {
  it("minifies", async () => {
    let bundle = await rollup({
      input: "tests/sample.js",
      plugins: [
        uglify({
          compress: true,
          ecma: 2020,
        }),
      ],
    });

    let result = await bundle.generate({ format: "cjs" });
    let testResult = Function(
      `var x = 1000; ${result.output[0].code}; return SimpleTest()`
    )();

    expect(testResult).toBe(1100);
  });
});
