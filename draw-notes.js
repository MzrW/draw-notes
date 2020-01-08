const PRIMARY_BUTTON = 1;
const SECUNDARY_BUTTON = 2;
const ERASER_BUTTON = 32;

class PenType {
    constructor(eraser, name, icon, size = undefined, color = undefined, bgColor = "black") {
        this.eraser = eraser;
        this.name = name;
        this.icon = icon;
        this.size = size;
        this.color = color;
        this.bgColor = bgColor;
    }
}

const InitialPenType = new PenType(false, "black pen", "create.svg", 1, "black", "white");
const PenTypes = [
    new PenType(true, "eraser", "delete.svg"),
    InitialPenType,
    new PenType(false, "white pen", "create.svg", 1, "white"),
    new PenType(false, "green pen", "create.svg", 1, "green"),
    new PenType(false, "red pen", "create.svg", 1, "red"),
    new PenType(false, "blue pen", "create.svg", 1, "blue", "white")
];

class Toolbar {
    constructor(toolbar) {
        this.toolbar = toolbar;
        this.selectedPen = InitialPenType;
        this.selectedDiv = undefined;
    }

    init() {
        PenTypes.forEach(type => {
            let pen = document.createElement("div");
            this.toolbar.appendChild(pen);

            let img = document.createElement("img");
            pen.appendChild(img);

            let p = document.createElement("p");
            pen.appendChild(p);

            pen.onclick = (event) => {
                this.selectedDiv.classList.remove("selected-pen");
                this.selectedDiv = pen;
                pen.classList.add("selected-pen");
                this.setSelectedPen(type);
            }

            if (type === this.selectedPen) {
                this.selectedDiv = pen;
                pen.classList.add("selected-pen");
            }

            // set properties
            img.src = "icon/" + type.icon;
            pen.classList.add("pen");
            p.style.backgroundColor = type.color;
            p.style.color = type.bgColor;
            p.textContent = type.name;
        });
    }

    getSelectedPen() {
        return this.selectedPen;
    }

    setSelectedPen(penType) {
        this.selectedPen = penType;
        this.onPenSelected(penType);
    }

    onPenSelected(penType) { }
}

class DrawingPad {
    constructor(toolbar, pad) {
        this.toolbar = toolbar;
        this.pad = pad;
        this.btnPressed = false;
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

        this.currentHandler = this.handlePenEvent;
        this.currentPen = this.toolbar.getSelectedPen();
    }

    init() {
        this.registerListeners();
        this.toolbar.onPenSelected = (penType) => {
            this.currentPen = penType;
            this.currentHandler = penType.eraser ? this.handleEraserEvent : this.handlePenEvent;
        }
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

        // when we are in painting mode but button is ERASER_BUTTON we erase instead of paint
        if ("pointerdown" == event.type) {
            if (!this.currentPen.eraser && (event.buttons & ERASER_BUTTON) > 0) {
                this.currentHandler = this.handleEraserEvent;
            }
        } else if ("pointerup" == event.type) {
            if (!this.currentPen.eraser && this.currentHandler == this.handleEraserEvent)
                this.currentHandler = this.handlePenEvent;
        }

        console.log(event.type + " " + event.buttons);
        this.currentHandler(event);
    }

    handleEraserEvent(event) {
        if ((event.buttons & (PRIMARY_BUTTON | ERASER_BUTTON)) == 0)
            return;

        let element = document.elementFromPoint(event.x, event.y);
        if (element && element.parentElement === this.pad) {
            element.remove();
        }
    }

    handlePenEvent(event) {
        if ("pointerenter" == event.type) {
            if (this.btnPressed)
                this.createNewPolyline();
        } else if ("pointermove" == event.type) {
            if (this.btnPressed && event.target === this.pad) {
                this.linePoints.push([event.offsetX, event.offsetY]);

                this.polyline.setAttribute("points", this
                    .linePoints
                    .map(v => v[0] + "," + v[1])
                    .join(" "));
            }
        } else if ("pointerdown" == event.type) {
            this.btnPressed = (event.buttons & PRIMARY_BUTTON) > 0;
            if (this.btnPressed)
                this.createNewPolyline();
        } else if ("pointerup" == event.type) {
            this.btnPressed = (event.buttons & SECUNDARY_BUTTON) > 0;
            this.endPolyline();
        } else if ("pointerleave" == event.type) {
            this.btnPressed = false;
            this.endPolyline();
        }
    }

    endPolyline() {
        this.linePoints = [];
    }

    createNewPolyline() {
        this.linePoints = [];

        this.polyline = document.createElementNS('http://www.w3.org/2000/svg', "polyline");
        this.polyline.setAttribute("fill", "none");
        this.polyline.setAttribute("stroke", this.currentPen.color);
        this.polyline.setAttribute("stroke-width", "1");
        this.pad.appendChild(this.polyline);
    }
}

class DrawNotes {
    constructor(toolbar, pad) {
        this.toolbar = new Toolbar(toolbar);
        this.pad = new DrawingPad(this.toolbar, pad);
    }

    init() {
        this.toolbar.init();
        this.pad.init();
    }
}
