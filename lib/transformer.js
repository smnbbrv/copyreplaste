"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var STRING_DASHERIZE_REGEXP = (/[ _]/g);
var STRING_DECAMELIZE_REGEXP = (/([a-z\d])([A-Z])/g);
var STRING_CAMELIZE_REGEXP = (/(-|_|\.|\s)+(.)?/g);
var STRING_UNDERSCORE_REGEXP_1 = (/([a-z\d])([A-Z]+)/g);
var STRING_UNDERSCORE_REGEXP_2 = (/-|\s+/g);
var Transformer = /** @class */ (function () {
    function Transformer() {
    }
    Transformer.prototype.dasherize = function (str) {
        return this.decamelize(str).replace(STRING_DASHERIZE_REGEXP, '-');
    };
    Transformer.prototype.decamelize = function (str) {
        return str.replace(STRING_DECAMELIZE_REGEXP, '$1_$2').toLowerCase();
    };
    Transformer.prototype.camelize = function (str) {
        return str
            .replace(STRING_CAMELIZE_REGEXP, function (_match, _separator, chr) {
            return chr ? chr.toUpperCase() : '';
        }).replace(/^([A-Z])/, function (match) { return match.toLowerCase(); });
    };
    Transformer.prototype.classify = function (str) {
        var _this = this;
        return str.split('.').map(function (part) { return _this.capitalize(_this.camelize(part)); }).join('.');
    };
    Transformer.prototype.underscore = function (str) {
        return str
            .replace(STRING_UNDERSCORE_REGEXP_1, '$1_$2')
            .replace(STRING_UNDERSCORE_REGEXP_2, '_')
            .toLowerCase();
    };
    Transformer.prototype.capitalize = function (str) {
        return str.charAt(0).toUpperCase() + str.substr(1);
    };
    Transformer.prototype.all = function (original) {
        return {
            original: original,
            dasherized: this.dasherize(original),
            decamelized: this.decamelize(original),
            camelized: this.camelize(original),
            classified: this.classify(original),
            underscored: this.underscore(original),
            capitalized: this.capitalize(original),
        };
    };
    return Transformer;
}());
exports.Transformer = Transformer;
