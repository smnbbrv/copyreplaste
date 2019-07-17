"use strict";
exports.__esModule = true;
var transformer_1 = require("./transformer");
var Replacer = /** @class */ (function () {
    function Replacer() {
        this.transformer = new transformer_1.Transformer();
    }
    Replacer.prototype.replace = function (str, replacements, transformationOrder) {
        var _this = this;
        return replacements.reduce(function (rs, rss) {
            var _a = rss.map(function (_) { return _this.transformer.all(_); }), o = _a[0], n = _a[1];
            return transformationOrder.reduce(function (s, r) { return s.replace(new RegExp(o[r], 'g'), n[r]); }, rs);
        }, str);
    };
    return Replacer;
}());
exports.Replacer = Replacer;
