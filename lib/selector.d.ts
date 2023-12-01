export interface Selector {
    mainSelector: string;
    shadowDOMSelector: Selector | string;
}
export declare function parse(selector: string): Selector | null;
