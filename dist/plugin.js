(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('uglify-js')) :
  typeof define === 'function' && define.amd ? define(['uglify-js'], factory) :
  (global = global || self, global.uglify = factory(global.uglifyJs));
}(this, (function (uglifyJs) { 'use strict';

  function uglify(options) {
      if (options === void 0) { options = {}; }
      return {
          name: 'uglify',
          transform: function (code) {
              var _this = this;
              if (typeof options.sourceMap === 'undefined') {
                  options.sourceMap = true;
              }
              if (typeof options.warnings === 'undefined') {
                  options.warnings = true;
              }
              var result = uglifyJs.minify(code, options);
              if (result.error) {
                  throw result.error;
              }
              if (result.warnings) {
                  result.warnings.forEach(function (warning) {
                      _this.warn(warning);
                  });
              }
              return {
                  code: result.code,
                  map: result.map
              };
          }
      };
  }

  return uglify;

})));
//# sourceMappingURL=plugin.js.map
