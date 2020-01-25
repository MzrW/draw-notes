const { Pen } = require('./pen');

const events = [
    "pointerover",
    "pointerenter",
    "pointerdown",
    "pointermove",
    "pointerup",
    "pointercancel",
    "pointerout",
    "pointerleave"
];

class MovingPen extends Pen {

    /**
     * @param {Element[]} selectedElements 
     * @param {SVGElement} svgPad
     */
    constructor(selectedElements, svgPad) {
        super("moving pen");
        this.selectedElements = selectedElements;
        this.svgPad = svgPad;

        this.previousPosition = { x: 0, y: 0 };
        this.eventListeners = {};

        this.init();
        this.registerListeners();
    }

    init() {
        // create an rectangle
        this.rect = document.createElementNS('http://www.w3.org/2000/svg', "rect");

        let boundings = this.getBoundingSelectedElementsRect();
        this.rect.setAttribute("x", boundings[0].toString());
        this.rect.setAttribute("y", boundings[1].toString());
        this.rect.setAttribute("width", boundings[2].toString());
        this.rect.setAttribute("height", boundings[3].toString());
        this.rect.style.fill = "blue";
        this.rect.style.fillOpacity = "0.2";
        this.rect.style.stroke = "black";
        this.rect.style.strokeWidth = "2";
        this.svgPad.appendChild(this.rect);
    }

    getBoundingSelectedElementsRect() {
        let parentRect = this.svgPad.getBoundingClientRect();

        let xl = this.svgPad.clientWidth,
            yt = this.svgPad.clientHeight,
            xr = 0,
            yb = 0;

        this.selectedElements.forEach(element => {
            let rect = element.getBoundingClientRect();

            let x = rect.x - parentRect.x;
            if (x < xl)
                xl = x;
            let y = rect.y - parentRect.y;
            if (y < yt)
                yt = y;
            let w = x + rect.width
            if (w > xr)
                xr = w;
            let h = y + rect.height;
            if (h > yb)
                yb = h;
        });


        return [xl - 10, yt - 10, xr - xl + 20, yb - yt + 20];
    }

    registerListeners() {
        for (let type of events) {
            let listener = event => this.selectedElementsEventHandler(event);
            this.rect.addEventListener(type, listener);
            this.eventListeners[type] = listener;
        }
    }

    removeListeners() {
        for (let type of events)
            this.rect.removeEventListener(type, this.eventListeners[type]);
    }

    /**
     * 
     * @param {PointerEvent} event
     */
    selectedElementsEventHandler(event) {
        event.stopPropagation();

        if (event.type == "pointerdown") {
            this.initialPosition = { x: event.clientX, y: event.clientY };
            this.previousPosition = { x: event.clientX, y: event.clientY };
        } else if (event.type == "pointermove" && event.buttons > 0) {
            let movement = {
                x: event.clientX - this.previousPosition.x,
                y: event.clientY - this.previousPosition.y
            };
            this.previousPosition = { x: event.clientX, y: event.clientY };

            this.moveElementsBy(movement);
        }
    }

    moveElementsBy(movement) {
        this.selectedElements.forEach(e => {
            e.setAttribute("points",
                e.getAttribute("points").split(" ")
                    .map(point => {
                        let cordinates = point.split(",");
                        return (Number.parseFloat(cordinates[0]) + movement.x).toString()
                            + "," +
                            (Number.parseFloat(cordinates[1]) + movement.y).toString();
                    }).join(" ")
            );
        });

        this.rect.setAttribute("x",
            (Number.parseFloat(this.rect.getAttribute("x")) + movement.x).toString()
        );
        this.rect.setAttribute("y",
            (Number.parseFloat(this.rect.getAttribute("y")) + movement.y).toString()
        );
    }

    /**
     * Handle the event
     * @param {PointerEvent} event
     * @param {SVGElement} svgPad
     */
    handleEvents(event, svgPad) {
        if (event.type == "pointerup") {
            this.deinit();
        }
    }

    penReplacedBy(pen) {
        this.deinit();
    }

    deinit() {
        if (!this.deinited) {
            this.deinited = true;
            this.removeListeners();
            this.rect.remove();
            this.onEndMoving();
        }
    }

    getPenType() {
        return undefined;
    }

    /**
     * Override this method to be notified when moving is done.
     */
    onEndMoving() {

    }
}

module.exports = MovingPen;