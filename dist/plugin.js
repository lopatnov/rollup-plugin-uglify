'use strict';

var uglifyJs = require('uglify-js');

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

module.exports = uglify;
//# sourceMappingURL=plugin.js.map
