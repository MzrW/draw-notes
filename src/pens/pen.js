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

    handleEvents(event, svgPad) {
        throw new Error("Must be overridden");
    }

    getPenType() {
        throw new Error("Must be overridden");
    }
}

module.exports = {
    PRIMARY_BUTTON: PRIMARY_BUTTON,
    SECUNDARY_BUTTON: SECUNDARY_BUTTON,
    ERASER_BUTTON: ERASER_BUTTON,

    PenType: PenType,

    Pen: Pen
};