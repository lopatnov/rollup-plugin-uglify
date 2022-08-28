# @lopatnov/rollup-plugin-uglify [![Twitter][twitterbage]][tweet] [![LinkedIn][linkedinbage]][linkedin]

[![npm](https://img.shields.io/npm/dt/@lopatnov/rollup-plugin-uglify)](https://www.npmjs.com/package/@lopatnov/rollup-plugin-uglify)
[![NPM version](https://badge.fury.io/js/%40lopatnov%2Frollup-plugin-uglify.svg)](https://www.npmjs.com/package/@lopatnov/rollup-plugin-uglify)
[![License](https://img.shields.io/github/license/lopatnov/rollup-plugin-uglify)](https://github.com/lopatnov/rollup-plugin-uglify/blob/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/lopatnov/rollup-plugin-uglify)](https://github.com/lopatnov/rollup-plugin-uglify/issues)
[![GitHub forks](https://img.shields.io/github/forks/lopatnov/rollup-plugin-uglify)](https://github.com/lopatnov/rollup-plugin-uglify/network)
[![GitHub stars](https://img.shields.io/github/stars/lopatnov/rollup-plugin-uglify)](https://github.com/lopatnov/rollup-plugin-uglify/stargazers)
[![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/@lopatnov/rollup-plugin-uglify)](https://www.npmjs.com/package/@lopatnov/rollup-plugin-uglify?activeTab=dependencies)
![GitHub top language](https://img.shields.io/github/languages/top/lopatnov/rollup-plugin-uglify)

A rollup plugin to minify javascript

## Requirements

Install rollup and terser first.

```shell
npm install rollup --save-dev
npm install terser --save-dev
```

## Install

[![https://nodei.co/npm/@lopatnov/rollup-plugin-uglify.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/@lopatnov/rollup-plugin-uglify.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/@lopatnov/rollup-plugin-uglify)

```shell
npm install @lopatnov/rollup-plugin-uglify --save-dev
```

### Import package to the project

ESM import

```typescript
import uglify from "@lopatnov/rollup-plugin-uglify";
```

CJS require

```javascript
var uglify = require("@lopatnov/rollup-plugin-uglify");
```

### How to use plugin

File rollup.config.ts

```typescript
export default {
  //...
  plugins: [
    //...
    uglify(),
  ],
};
```

#### with options

```typescript
export default {
  //...
  plugins: [
    //...
    uglify({
      //options: IUglifyOptions
    }),
  ],
};
```

#### Options

`uglify` function has optional argument `options: IUglifyOptions`.

`IUglifyOptions` is an interface, that extends [`MinifyOptions`][minify-options] of `terser` package.

`IUglifyOptions` contains:

- `include?: string | RegExp`
- `exclude?: string | RegExp`

A valid minimatch pattern, or array of patterns to include / exclude files. If `include` is omitted or has zero length, filter will return true by default. Otherwise, an ID must match one or more of the minimatch patterns, and must not match any of the `exclude` patterns.

## Troubleshooting

### Issue 13: cannot find module @rollup/pluginutils

Versions migration: 2.1.2 -> 2.1.4

[rollup-pluginutils](https://github.com/rollup/rollup-pluginutils) has moved and is now available at [@rollup/pluginutils](https://www.npmjs.com/package/@rollup/pluginutils). The best way is to update dependency to `@rollup/pluginutils` as in [documentation](https://rollupjs.org/guide/en/#transformers) or use version `2.1.2` that don't have conflict with `rollup-pluginutils`.

## Donate

[![Charity Health][charity_health]][dobro]

Open source software is just a hobby. I am making it just for fun. A small amount of help will be more significant for charitable foundations. I propose to pay attention to the various local funds or to the volunteers in my country. I hope this will make someone's life better.

## Rights and Agreements [![LinkedIn][linkedinbage]][linkedin]

Contact me in LinkedIn, I will consider profitable business offers. I am Computer Software Engineer, individual entrepreneur. I develop software of various complexity for the web, desktop, mobile and embedded devices. I have expertise in web development using .NET, Angular and React frameworks, Microsoft and Google technologies, working with the North American and European markets through reseller companies by B2B business model. I was a part of development teams and worked independently with enterprise projects, digital technologies, fintech projects, real estate, barcode software and petroleum industry. I would like to note that I have not bad analytical skills. I'm improving my skills continuously and I have recommendations.

License [Apache-2.0][license]

Copyright 2019-2022 Oleksandr Lopatnov

[minify-options]: https://terser.org/docs/api-reference#minify-options-structure
[license]: https://github.com/lopatnov/rollup-plugin-uglify/blob/master/LICENSE
[twitterbage]: https://img.shields.io/twitter/url?url=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40lopatnov%2Frollup-plugin-uglify
[tweet]: https://twitter.com/intent/tweet?text=I%20want%20to%20share%20TypeScript%20library:&url=https://www.npmjs.com/package/@lopatnov/rollup-plugin-uglify
[linkedinbage]: https://img.shields.io/badge/LinkedIn-lopatnov-informational?style=social&logo=linkedin
[linkedin]: https://www.linkedin.com/in/lopatnov/
[dobro]: https://dobro.ua/en/projects/category/zdorovia?page=1&category=zdorovia&tag=28
[charity_health]: https://img.shields.io/badge/Charity%20Health-Dobro-red?style=flat-square&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABBVBMVEUAAAAAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWQAuWT///+PPo6DAAAAVXRSTlMAAA4wOR0CAUe/7vPbfA9K5PyKBAPF9PL47f7qN2QiW0V+mpvejJWBnaBanDWLpUva3aGemaa7o1d7rY2nXt/G/eszLmoUZ4mAT+ePBU3D3IIREDEe6n6MQgAAAAFiS0dEVgoN6YkAAAAHdElNRQfkCAcPCB1MJSGgAAAAlElEQVQY02NgIB0wMjIxs7CyMcIF2Dk4ubh5ePngIvwCoUAgKCTMyMjOyCbCziAqJi4hKSUlLSMrJ6+gqKTMoKKqqqauoaGppa2jq6epb8BgqGFkbGJqZm6hZmllbWNrx2AfKuXgIBXq6OSs6uLq5u7B4OkFMtTB24cRCEC2sPn6cXH7BwQyIhwWFMwSIsJIkm9QAQBayRNRV4rFmQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0wOC0wN1QxNTowODoyOSswMjowMBaHG7YAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjAtMDgtMDdUMTU6MDg6MjkrMDI6MDBn2qMKAAAAV3pUWHRSYXcgcHJvZmlsZSB0eXBlIGlwdGMAAHic4/IMCHFWKCjKT8vMSeVSAAMjCy5jCxMjE0uTFAMTIESANMNkAyOzVCDL2NTIxMzEHMQHy4BIoEouAOoXEXTyQjWVAAAAAElFTkSuQmCC
