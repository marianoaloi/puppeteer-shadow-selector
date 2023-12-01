"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
function parse(selector) {
    selector = escapePartSelector(selector);
    var parsed = selector.match(/(.+?)::shadow-dom\((.+)\)/);
    if (parsed) {
        var mainSelector = parsed[1], shadowDOMSelector = parsed[2];
        return {
            mainSelector: mainSelector,
            shadowDOMSelector: parse(shadowDOMSelector) || shadowDOMSelector,
        };
    }
    return null;
}
exports.parse = parse;
function escapePartSelector(source) {
    var rexExp = /(.*?)::part\((.+?)\)(.*)/;
    return source.replace(rexExp, function (_, selector, partName, rest) {
        return "".concat(selector, "::shadow-dom([part=\"").concat(partName, "\"]").concat(rest ? escapePartSelector(rest) : "", ")");
    });
}
