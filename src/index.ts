import { not } from "logical-not";
import { ElementHandle, Page } from "puppeteer";

import { Selector, parse } from "./selector";

export function $(page: Page, selector: string): Promise<ElementHandle<Element> | ElementHandle<Node> | null> {
    const parsedSelector = parse(selector);

    if (not(parsedSelector)) return page.$(selector);

    return page.waitForSelector(parsedSelector!.mainSelector).then(() =>
        page
            .evaluateHandle((selectorSource: string) => {
                return query(JSON.parse(selectorSource) as Selector, document);

                function query(
                    selector: Selector,
                    context: Document | ShadowRoot | Element,
                ): Element | null | undefined {
                    const shadowRoot = Array.from(context.querySelectorAll(
                        selector.mainSelector,
                    )).map(x => x.shadowRoot).map(x => {
                        if (!shadowRoot) return null;
                        if (typeof selector.shadowDOMSelector === "string")
                            return x?.querySelector(
                                selector.shadowDOMSelector,
                            );
                        else return query(selector.shadowDOMSelector, x || context);

                    }


                        // x.shadowRoot?.querySelector(selector.shadowDOMSelector.toString())
                    ).filter(x => x);

                    if (!shadowRoot || shadowRoot.length < 1) return null;

                    return shadowRoot[0];
                }
            }, JSON.stringify(parsedSelector))
            .then(source => source.asElement()),
    );
}
