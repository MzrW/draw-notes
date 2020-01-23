const { Pen, PenType, PRIMARY_BUTTON, ERASER_BUTTON } = require("./pen");

class EraserPen extends Pen {
    constructor(name, icon) {
        super(name, icon);
    }

    handleEvents(event, svgPad) {
        if ((event.buttons & (PRIMARY_BUTTON | ERASER_BUTTON)) == 0)
            return;

        let element = document.elementFromPoint(event.x, event.y);
        if (element && element.parentElement === svgPad) {
            element.remove();
        }
    }

    getPenType() {
        return PenType.eraser;
    }
}

module.exports = EraserPen;