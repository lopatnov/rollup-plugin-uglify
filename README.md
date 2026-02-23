# @lopatnov/rollup-plugin-uglify

> A [Rollup](https://rollupjs.org/) plugin for minifying JavaScript bundles using [Terser](https://terser.org/).
> Full TypeScript support, multiple output formats, flexible file filtering, zero configuration required for basic usage.

[![npm downloads](https://img.shields.io/npm/dt/@lopatnov/rollup-plugin-uglify)](https://www.npmjs.com/package/@lopatnov/rollup-plugin-uglify)
[![npm version](https://badge.fury.io/js/%40lopatnov%2Frollup-plugin-uglify.svg)](https://www.npmjs.com/package/@lopatnov/rollup-plugin-uglify)
[![License](https://img.shields.io/github/license/lopatnov/rollup-plugin-uglify)](https://github.com/lopatnov/rollup-plugin-uglify/blob/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/lopatnov/rollup-plugin-uglify)](https://github.com/lopatnov/rollup-plugin-uglify/issues)
[![GitHub stars](https://img.shields.io/github/stars/lopatnov/rollup-plugin-uglify)](https://github.com/lopatnov/rollup-plugin-uglify/stargazers)

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Built With](#built-with)
- [License](#license)

---

## Installation

### Prerequisites

This plugin requires Rollup and Terser as peer dependencies:

```bash
npm install rollup terser --save-dev
```

### Install the plugin

```bash
npm install @lopatnov/rollup-plugin-uglify --save-dev
```

---

## Usage

### Basic Usage

```javascript
// rollup.config.js
import uglify from "@lopatnov/rollup-plugin-uglify";

export default {
  input: "src/index.js",
  output: {
    file: "dist/bundle.js",
    format: "cjs",
  },
  plugins: [uglify()],
};
```

### With Options

```javascript
import uglify from "@lopatnov/rollup-plugin-uglify";

export default {
  input: "src/index.js",
  output: {
    file: "dist/bundle.js",
    format: "es",
    sourcemap: true,
  },
  plugins: [
    uglify({
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      mangle: true,
      ecma: 2020,
    }),
  ],
};
```

### CommonJS Import

```javascript
const uglify = require("@lopatnov/rollup-plugin-uglify");
```

---

## Options

The `uglify()` function accepts an optional configuration object that extends Terser's [MinifyOptions](https://terser.org/docs/api-reference#minify-options-structure).

### Plugin-specific Options

| Option    | Type                           | Default         | Description                                     |
| --------- | ------------------------------ | --------------- | ----------------------------------------------- |
| `include` | `string \| RegExp`             | -               | Pattern to match chunks that should be minified  |
| `exclude` | `string \| RegExp`             | -               | Pattern to match chunks that should be skipped   |
| `hook`    | `"renderChunk" \| "transform"` | `"renderChunk"` | Rollup hook to use for minification              |

### Common Terser Options

| Option      | Type      | Default | Description                                              |
| ----------- | --------- | ------- | -------------------------------------------------------- |
| `sourceMap` | `boolean` | auto    | Generate source maps (follows output `sourcemap` option) |
| `compress`  | `object`  | -       | Compression options                                      |
| `mangle`    | `boolean` | -       | Mangle variable names                                    |
| `ecma`      | `number`  | -       | ECMAScript version (2015, 2020, etc.)                    |

For a complete list of options, see the [Terser documentation](https://terser.org/docs/api-reference#minify-options-structure).

### Examples

Minify only specific files:

```javascript
uglify({ include: /\.min\.js$/ });
```

Exclude test files:

```javascript
uglify({ exclude: /\.test\.js$/ });
```

Use legacy transform hook (per-module minification):

```javascript
uglify({ hook: "transform", compress: true });
```

Production build with aggressive compression:

```javascript
uglify({
  compress: {
    drop_console: true,
    drop_debugger: true,
    pure_funcs: ["console.log"],
  },
  mangle: { properties: false },
  ecma: 2020,
});
```

---

## Troubleshooting

**Cannot find module @rollup/pluginutils**

If you're upgrading from version 2.1.2 to 2.1.4+, the dependency has been updated from `rollup-pluginutils` to `@rollup/pluginutils`. Run `npm install` to resolve.

---

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

- Bug reports → [open an issue](https://github.com/lopatnov/rollup-plugin-uglify/issues)
- Questions → [Discussions](https://github.com/lopatnov/rollup-plugin-uglify/discussions)
- Found it useful? A [star on GitHub](https://github.com/lopatnov/rollup-plugin-uglify) helps others discover the project

---

## Built With

- [TypeScript](https://www.typescriptlang.org/) — strict typing throughout
- [Rollup](https://rollupjs.org/) — bundled to ESM, CJS, and UMD formats
- [Terser](https://terser.org/) — JavaScript minification engine
- [@rollup/pluginutils](https://github.com/rollup/plugins/tree/master/packages/pluginutils) — include/exclude pattern filtering
- [Jest](https://jestjs.io/) — unit testing with coverage

---

## License

[Apache-2.0](https://github.com/lopatnov/rollup-plugin-uglify/blob/master/LICENSE) © 2019–2026 [Oleksandr Lopatnov](https://github.com/lopatnov) · [LinkedIn](https://www.linkedin.com/in/lopatnov/)
