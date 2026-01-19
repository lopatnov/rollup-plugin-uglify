# @lopatnov/rollup-plugin-uglify

[![npm](https://img.shields.io/npm/dt/@lopatnov/rollup-plugin-uglify)](https://www.npmjs.com/package/@lopatnov/rollup-plugin-uglify)
[![NPM version](https://badge.fury.io/js/%40lopatnov%2Frollup-plugin-uglify.svg)](https://www.npmjs.com/package/@lopatnov/rollup-plugin-uglify)
[![License](https://img.shields.io/github/license/lopatnov/rollup-plugin-uglify)](https://github.com/lopatnov/rollup-plugin-uglify/blob/master/LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/lopatnov/rollup-plugin-uglify/node-package-ci.yml)](https://github.com/lopatnov/rollup-plugin-uglify/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![GitHub stars](https://img.shields.io/github/stars/lopatnov/rollup-plugin-uglify)](https://github.com/lopatnov/rollup-plugin-uglify/stargazers)

A [Rollup](https://rollupjs.org/) plugin for minifying JavaScript bundles using [Terser](https://terser.org/).

## Features

- Full TypeScript support with type definitions
- Multiple output formats: CommonJS, ES Modules, UMD
- Source map generation enabled by default
- Flexible file filtering with `include`/`exclude` patterns
- All Terser minification options supported
- Zero configuration required for basic usage

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

## Options

The `uglify()` function accepts an optional configuration object that extends Terser's [MinifyOptions](https://terser.org/docs/api-reference#minify-options-structure).

### Plugin-specific Options

| Option    | Type                | Description                                    |
| --------- | ------------------- | ---------------------------------------------- |
| `include` | `string \| RegExp`  | Pattern to match files that should be minified |
| `exclude` | `string \| RegExp`  | Pattern to match files that should be skipped  |

### Common Terser Options

| Option      | Type      | Default | Description                           |
| ----------- | --------- | ------- | ------------------------------------- |
| `sourceMap` | `boolean` | `true`  | Generate source maps                  |
| `compress`  | `object`  | -       | Compression options                   |
| `mangle`    | `boolean` | -       | Mangle variable names                 |
| `ecma`      | `number`  | -       | ECMAScript version (2015, 2020, etc.) |

For a complete list of options, see the [Terser documentation](https://terser.org/docs/api-reference#minify-options-structure).

### Examples

#### Minify only specific files

```javascript
uglify({
  include: /\.min\.js$/,
});
```

#### Exclude test files

```javascript
uglify({
  exclude: /\.test\.js$/,
});
```

#### Production build with aggressive compression

```javascript
uglify({
  compress: {
    drop_console: true,
    drop_debugger: true,
    pure_funcs: ["console.log"],
  },
  mangle: {
    properties: false,
  },
  ecma: 2020,
});
```

## Troubleshooting

### Cannot find module @rollup/pluginutils

If you're upgrading from version 2.1.2 to 2.1.4+, you may encounter this error. The dependency has been updated from `rollup-pluginutils` to `@rollup/pluginutils`. Run `npm install` to resolve.

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

[Apache-2.0](LICENSE)

Copyright 2019-2026 Oleksandr Lopatnov

---

### Author

**Oleksandr Lopatnov** — Full-stack developer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/lopatnov/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=flat&logo=github)](https://github.com/lopatnov)

If you find this project useful, please consider giving it a star on GitHub!
