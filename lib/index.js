"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ = void 0;
var logical_not_1 = require("logical-not");
var selector_1 = require("./selector");
function $(page, selector) {
    var parsedSelector = (0, selector_1.parse)(selector);
    if ((0, logical_not_1.not)(parsedSelector))
        return page.$(selector);
    return page.waitForSelector(parsedSelector.mainSelector).then(function () {
        return page
            .evaluateHandle(function (selectorSource) {
            return query(JSON.parse(selectorSource), document);
            function query(selector, context) {
                var shadowRoot = Array.from(context.querySelectorAll(selector.mainSelector)).map(function (x) {
                    if (typeof selector.shadowDOMSelector === "string")
                        return x.querySelector(selector.shadowDOMSelector);
                    else
                        return query(selector.shadowDOMSelector, x);
                }
                // x.shadowRoot?.querySelector(selector.shadowDOMSelector.toString())
                ).filter(function (x) { return x; });
                if (!shadowRoot || shadowRoot.length < 1)
                    return null;
                return shadowRoot[0];
            }
        }, JSON.stringify(parsedSelector))
            .then(function (source) { return source.asElement(); });
    });
}
exports.$ = $;
