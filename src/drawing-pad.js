const Toolbar = require('./toolbar');
const { QuickSwitchPens } = require('./pens/index');
const { Pen, PenType } = require('./pens/pen');
const MovingPen = require('./pens/moving-pen');


class DrawingPad {
    /**
     * 
     * @param {Toolbar} toolbar 
     * @param {SVGElement} pad 
     */
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


    /**
     * Set the current pen
     * @param {Pen} pen 
     */
    setCurrentPen(pen) {
        this.currentPen.penReplacedBy(pen);
        this.currentPen = pen;
    }

    /**
     * Quickly switch to this pen
     * @param {Pen} pen 
     */
    quickSwitchPen(pen) {
        this.previousPen = this.currentPen;
        this.setCurrentPen(pen);
    }

    undoQuickSwitch() {
        if (this.previousPen) {
            this.setCurrentPen(this.previousPen);
            this.previousPen = undefined;
        }
    }

    /**
     * Handle the event
     * @param {PointerEvent} event 
     */
    handleEvents(event) {
        //if (event.pointerType != "pen")
        //   return;

        event.stopPropagation();

        // when we are in painting mode but button is ERASER_BUTTON we erase instead of paint
        if ("pointerdown" == event.type) {
            for (let quickSwitchPen of QuickSwitchPens) {
                if ((event.buttons & quickSwitchPen.getQuickSwitchButton()) > 0) {
                    this.quickSwitchPen(quickSwitchPen);
                    break;
                }
            }
        }

        this.currentPen.handleEvents(event, this.pad);

        if ("pointerup" == event.type) {
            if (this.currentPen.getPenType() == PenType.selector) {
                // @ts-ignore 
                let selectedElements = this.currentPen.findSelectedElements(this.pad);
                if (selectedElements.length > 0) {
                    let movingPen = new MovingPen(selectedElements, this.pad);
                    movingPen.onEndMoving = () => {
                        this.undoQuickSwitch();
                    };
                    this.setCurrentPen(movingPen);
                } else {
                    this.undoQuickSwitch();
                }
            }
            if (this.currentPen.isQuickSwitchPen() && this.previousPen) {
                this.undoQuickSwitch();
            }
        }
    }
}

module.exports = DrawingPad;