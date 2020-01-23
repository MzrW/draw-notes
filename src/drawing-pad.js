const { ERASER_BUTTON, SECUNDARY_BUTTON,
    EraserPen, SelectionPen } = require('./pens/index');
const { PenType } = require('./pens/pen');


class DrawingPad {
    constructor(toolbar, pad) {
        this.toolbar = toolbar;
        this.pad = pad;
        this.eventTypes = [
            "pointerover",
            "pointerenter",
            "pointerdown",
            "pointermove",
            "pointerup",
            "pointercancel",
            "pointerout",
            "pointerleave",
        ];
        this.eventListeners = {};

        this.currentPen = this.toolbar.getSelectedPen();
        this.previousPen = undefined;
    }

    init() {
        this.registerListeners();
        this.toolbar.onPenSelected = (pen) => this.setCurrentPen(pen);
    }

    setCurrentPen(pen) {
        this.currentPen = pen;
    }

    registerListeners() {
        this.eventTypes.forEach((eventType) => {
            let eventListener = event => this.handleEvents(event);
            this.pad.addEventListener(eventType, eventListener);
            this.eventListeners[eventType] = eventListener;
        });
    }

    removeListeners() {
        this.eventTypes.forEach(eventType => {
            this.pad.removeEventListener(eventType, this.eventListeners[eventType]);
        });
    }

    handleEvents(event) {
        if (event.pointerType != "pen")
            return;

        event.stopPropagation();

        console.log(event.type + " " + event.target.tagName + " " + event.buttons);

        // when we are in painting mode but button is ERASER_BUTTON we erase instead of paint
        if ("pointerdown" == event.type) {
            if (this.currentPen.getPenType() == PenType.pen) {
                if ((event.buttons & ERASER_BUTTON) > 0) {
                    this.previousPen = this.currentPen;
                    this.setCurrentPen(EraserPen);
                } else if ((event.buttons & SECUNDARY_BUTTON) > 0) {
                    this.previousPen = this.currentPen;
                    this.setCurrentPen(SelectionPen);
                }
            }
        }

        this.currentPen.handleEvents(event, this.pad);

        if ("pointerup" == event.type) {
            if (this.previousPen) {
                this.setCurrentPen(this.previousPen);
                this.previousPen = undefined;
            }
        }
    }
}

module.exports = DrawingPad;