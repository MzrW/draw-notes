const { PenType, PRIMARY_BUTTON, SECUNDARY_BUTTON } = require("./pen");
const StylusPen = require('./stylus-pen');

class SelectorPen extends StylusPen {
    constructor(name, icon, size = undefined, color = undefined, bgColor = "black") {
        super(name, icon, size, color, bgColor);
    }

    handleEvents(event, svgPad) {
        if ("pointerup" == event.type) {
            this.polyline.remove();

            
        } else if ((event.buttons & (PRIMARY_BUTTON | SECUNDARY_BUTTON)) > 0)
            super.handleEvents(event, svgPad);
    }

    getPenType() {
        return PenType.selector;
    }
}

module.exports = SelectorPen;