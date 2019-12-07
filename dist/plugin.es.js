import { minify } from 'uglify-js';

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
            var result = minify(code, options);
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

export default uglify;
//# sourceMappingURL=plugin.es.js.map
