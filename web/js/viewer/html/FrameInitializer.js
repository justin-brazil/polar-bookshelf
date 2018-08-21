"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Preconditions_1 = require("../../Preconditions");
const { EventBridge } = require("./EventBridge");
class FrameInitializer {
    constructor(iframe, textLayer) {
        this.loaded = false;
        if (!iframe) {
            throw new Error("No iframe");
        }
        this.iframe = iframe;
        this.textLayer = textLayer;
    }
    start() {
        Preconditions_1.notNull(this.iframe.contentDocument)
            .addEventListener("readystatechange", this.onReadyStateChange.bind(this));
        this._checkLoaded();
    }
    _checkLoaded() {
        if (!this.loaded) {
            this.loaded = true;
            this.onLoad();
            console.log("FrameInitializer: Document has finished loading");
        }
    }
    onReadyStateChange() {
        if (Preconditions_1.notNull(this.iframe.contentDocument).readyState === "complete") {
            this._checkLoaded();
        }
    }
    onLoad() {
        console.log("Frame loaded.  Sending pagesinit on .page");
        this.dispatchPagesInit();
        this.startEventBridge();
        this.updateDocTitle();
    }
    updateDocTitle() {
        let title = Preconditions_1.notNull(this.iframe.contentDocument).title;
        console.log("Setting title: " + title);
        document.title = title;
    }
    dispatchPagesInit() {
        let event = new Event('pagesinit', { bubbles: true });
        Preconditions_1.notNull(document.querySelector(".page")).dispatchEvent(event);
    }
    startEventBridge() {
        document.querySelectorAll(".page").forEach(pageElement => {
            let eventBridge = new EventBridge(pageElement, this.iframe);
            eventBridge.start();
        });
    }
}
exports.FrameInitializer = FrameInitializer;
//# sourceMappingURL=FrameInitializer.js.map