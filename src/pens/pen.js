const PRIMARY_BUTTON = 1;
const SECUNDARY_BUTTON = 2;
const ERASER_BUTTON = 32;

const PenType = Object.freeze({
    eraser: 'eraser',
    pen: 'pen',
    selector: 'selector'
});

class Pen {
    constructor(name, icon, size = undefined, color = undefined, bgColor = "black") {
        this.name = name;
        this.icon = icon;
        this.size = size;
        this.color = color;
        this.bgColor = bgColor;
    }

    /**
     * Handle the event
     * @param {PointerEvent} event
     * @param {SVGElement} svgPad
     */
    handleEvents(event, svgPad) {
        throw new Error("Must be overridden");
    }

    /**
     * Override this method to be notified when this pen is replaced by another one.
     * @param {Pen} pen another pen
     */
    penReplacedBy(pen) {

    }

    /**
     * @return {string}
     */
    getPenType() {
        throw new Error("Must be overridden");
    }

    /**
     * If the pointerevent's event.button contains this value, we switch to this pen quickly.
     * @return {number} the value 
     */
    getQuickSwitchButton() {
        return 0;
    }

    /**
     * @return {Boolean} true if this is a quickSwitchPen
     */
    isQuickSwitchPen() {
        return this.getQuickSwitchButton() != 0;
    }
}

module.exports = {
    PRIMARY_BUTTON: PRIMARY_BUTTON,
    SECUNDARY_BUTTON: SECUNDARY_BUTTON,
    ERASER_BUTTON: ERASER_BUTTON,

    PenType: PenType,

    Pen: Pen
};