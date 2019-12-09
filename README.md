# @lopatnov/rollup-plugin-uglify

[![NPM version](https://badge.fury.io/js/%40lopatnov%2Frollup-plugin-uglify.svg)](https://www.npmjs.com/package/@lopatnov/rollup-plugin-uglify)
![License](https://img.shields.io/github/license/lopatnov/rollup-plugin-uglify)
[![Twitter](https://img.shields.io/twitter/url?url=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40lopatnov%2Frollup-plugin-uglify)](https://img.shields.io/twitter/url?url=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40lopatnov%2Frollup-plugin-uglify)

A rollup plugin to minify javascript

# Requirements

Install rollup and terser first.

```shell
npm install rollup
npm install terser
```

# Install

[![https://nodei.co/npm/@lopatnov/rollup-plugin-uglify.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/@lopatnov/rollup-plugin-uglify.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/@lopatnov/rollup-plugin-uglify)

```shell
npm install @lopatnov/rollup-plugin-uglify
```

## Import package to the project

TypeScript

```typescript
import uglify from "@lopatnov/rollup-plugin-uglify";
```

JavaScript

```javascript
var uglify = require("@lopatnov/rollup-plugin-uglify");
```

## How to use plugin

File rollup.config.ts

```typescript
export default {
  //...
  plugins: [
    //...
    uglify()
  ]
};
```

# Rights and Agreements

License [Apache-2.0](https://github.com/lopatnov/rollup-plugin-uglify/blob/master/LICENSE)

Copyright 2019 Oleksandr Lopatnov
