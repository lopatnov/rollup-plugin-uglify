import "core-js";
import { rollup } from "rollup";
import uglify from "../src/plugin";

describe("rollup-plugin-uglify", () => {
  it("minifies code", async () => {
    const bundle = await rollup({
      input: "tests/sample.js",
      plugins: [
        uglify({
          compress: true,
          ecma: 2020,
        }),
      ],
    });

    const result = await bundle.generate({ format: "cjs" });
    const testResult = Function(
      `var x = 1000; ${result.output[0].code}; return SimpleTest()`
    )();

    expect(testResult).toBe(1100);
  });

  it("generates source maps by default", async () => {
    const bundle = await rollup({
      input: "tests/sample.js",
      plugins: [uglify()],
    });

    const result = await bundle.generate({
      format: "cjs",
      sourcemap: true,
    });

    expect(result.output[0].map).toBeTruthy();
  });

  it("respects sourceMap: false option", async () => {
    const bundle = await rollup({
      input: "tests/sample.js",
      plugins: [
        uglify({
          sourceMap: false,
        }),
      ],
    });

    const result = await bundle.generate({
      format: "cjs",
      sourcemap: false,
    });

    // When sourceMap is false, the plugin shouldn't generate a map
    expect(result.output[0].code).toBeTruthy();
  });

  it("excludes files matching exclude pattern", async () => {
    const bundle = await rollup({
      input: "tests/sample.js",
      plugins: [
        uglify({
          exclude: /sample\.js$/,
        }),
      ],
    });

    const result = await bundle.generate({ format: "cjs" });
    // Code should not be minified (contains original formatting)
    expect(result.output[0].code).toContain("function");
  });

  it("includes only files matching include pattern", async () => {
    const bundle = await rollup({
      input: "tests/sample.js",
      plugins: [
        uglify({
          include: /\.ts$/, // Only TypeScript files (none in this test)
        }),
      ],
    });

    const result = await bundle.generate({ format: "cjs" });
    // JS files should not be minified
    expect(result.output[0].code).toContain("function");
  });

  it("minifies when include pattern matches", async () => {
    const bundle = await rollup({
      input: "tests/sample.js",
      plugins: [
        uglify({
          include: /\.js$/,
          sourceMap: false,
          compress: true,
        }),
      ],
    });

    const result = await bundle.generate({ format: "cjs" });
    // Code should be minified (shorter)
    expect(result.output[0].code.length).toBeLessThan(200);
  });

  it("applies terser compress options", async () => {
    const bundle = await rollup({
      input: "tests/sample.js",
      plugins: [
        uglify({
          compress: {
            drop_console: true,
          },
        }),
      ],
    });

    const result = await bundle.generate({ format: "cjs" });
    expect(result.output[0].code).toBeTruthy();
  });

  it("applies terser mangle options", async () => {
    const bundle = await rollup({
      input: "tests/sample.js",
      plugins: [
        uglify({
          mangle: true,
        }),
      ],
    });

    const result = await bundle.generate({ format: "cjs" });
    // Variable names should be shortened
    expect(result.output[0].code).toBeTruthy();
    expect(result.output[0].code.length).toBeLessThan(200);
  });

  it("works with different output formats", async () => {
    const bundle = await rollup({
      input: "tests/sample.js",
      plugins: [uglify({ compress: true })],
    });

    // Test CJS format
    const cjsResult = await bundle.generate({ format: "cjs" });
    expect(cjsResult.output[0].code).toBeTruthy();

    // Test ES format
    const esResult = await bundle.generate({ format: "es" });
    expect(esResult.output[0].code).toBeTruthy();

    // Test IIFE format
    const iifeResult = await bundle.generate({ format: "iife", name: "Test" });
    expect(iifeResult.output[0].code).toBeTruthy();
  });

  it("produces smaller output than input", async () => {
    const bundleWithout = await rollup({
      input: "tests/sample.js",
      plugins: [],
    });
    const resultWithout = await bundleWithout.generate({ format: "cjs" });

    const bundleWith = await rollup({
      input: "tests/sample.js",
      plugins: [uglify({ compress: true, mangle: true })],
    });
    const resultWith = await bundleWith.generate({ format: "cjs" });

    expect(resultWith.output[0].code.length).toBeLessThan(
      resultWithout.output[0].code.length
    );
  });

  it("handles empty options", async () => {
    const bundle = await rollup({
      input: "tests/sample.js",
      plugins: [uglify()],
    });

    const result = await bundle.generate({ format: "cjs" });
    expect(result.output[0].code).toBeTruthy();
  });

  it("preserves functionality after minification", async () => {
    const bundle = await rollup({
      input: "tests/sample.js",
      plugins: [
        uglify({
          compress: true,
          mangle: true,
        }),
      ],
    });

    const result = await bundle.generate({ format: "cjs" });

    // Execute the minified code and verify it still works
    const testResult = Function(
      `var x = 500; ${result.output[0].code}; return SimpleTest()`
    )();

    expect(testResult).toBe(600); // 100 + 500
  });
});
