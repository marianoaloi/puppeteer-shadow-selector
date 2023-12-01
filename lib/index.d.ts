import { ElementHandle, Page } from "puppeteer";
export declare function $(page: Page, selector: string): Promise<ElementHandle<Element> | ElementHandle<Node> | null>;
