/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Pen = __webpack_require__(3);

const PRIMARY_BUTTON = 1;
const SECUNDARY_BUTTON = 2;
const ERASER_BUTTON = 32;

const PenType = Object.freeze({
    eraser: 'eraser',
    pen: 'pen',
    selector: 'selector'
});

const InitialPen = new Pen(PenType.pen, "black pen", "create.svg", 2, "black", "white");
const EraserPen = new Pen(PenType.eraser, "eraser", "delete.svg");
const SelectionPen = new Pen(PenType.selector, "select", "select.svg", 2, "gray");
const Pens = [
    SelectionPen,
    EraserPen,
    InitialPen,
    new Pen(PenType.pen, "white pen", "create.svg", 2, "white"),
    new Pen(PenType.pen, "green pen", "create.svg", 2, "green"),
    new Pen(PenType.pen, "red pen", "create.svg", 2, "red"),
    new Pen(PenType.pen, "blue pen", "create.svg", 2, "blue", "white")
];

module.exports = {
    PRIMARY_BUTTON: PRIMARY_BUTTON,
    SECUNDARY_BUTTON: SECUNDARY_BUTTON,
    ERASER_BUTTON: ERASER_BUTTON,

    PenType: PenType,

    InitialPen: InitialPen,
    EraserPen: EraserPen,
    SelectionPen: SelectionPen,

    Pens: Pens
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Toolbar = __webpack_require__(2);
const DrawingPad = __webpack_require__(4);


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

module.exports = DrawNotes;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const { InitialPen, Pens} = __webpack_require__(0);

class Toolbar {
    constructor(toolbar) {
        this.toolbar = toolbar;
        this.selectedPen = InitialPen;
        this.selectedDiv = undefined;
    }

    init() {
        Pens.forEach(pen => {
            let div = document.createElement("div");
            this.toolbar.appendChild(div);

            let img = document.createElement("img");
            div.appendChild(img);

            let p = document.createElement("p");
            div.appendChild(p);

            div.onclick = (event) => {
                this.selectedDiv.classList.remove("selected-pen");
                this.selectedDiv = div;
                div.classList.add("selected-pen");
                this.setSelectedPen(pen);
            }

            if (pen === this.selectedPen) {
                this.selectedDiv = div;
                div.classList.add("selected-pen");
            }

            // set properties
            img.src = "icon/" + pen.icon;
            div.classList.add("pen");
            p.style.backgroundColor = pen.color;
            p.style.color = pen.bgColor;
            p.textContent = pen.name;
        });
    }

    getSelectedPen() {
        return this.selectedPen;
    }

    setSelectedPen(pen) {
        this.selectedPen = pen;
        this.onPenSelected(pen);
    }

    onPenSelected(pen) { }
}

module.exports = Toolbar;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

class Pen {
    constructor(penType, name, icon, size = undefined, color = undefined, bgColor = "black") {
        this.penType = penType;
        this.name = name;
        this.icon = icon;
        this.size = size;
        this.color = color;
        this.bgColor = bgColor;
    }
}

module.exports = Pen;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const { PenType, ERASER_BUTTON, SECUNDARY_BUTTON, EraserPen, SelectionPen } = __webpack_require__(0);

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
        this.previousPen = undefined;
    }

    init() {
        this.registerListeners();
        this.toolbar.onPenSelected = (pen) => this.setCurrentPen(pen);
    }

    setCurrentPen(pen) {
        this.currentPen = pen;
        switch (pen.penType) {
            case PenType.pen:
                this.currentHandler = this.handlePenEvent;
                break;
            case PenType.eraser:
                this.currentHandler = this.handleEraserEvent;
                break;
            case PenType.selector:
                this.currentHandler = this.handleSelectionEvent;
                break;
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

        console.log(event.type + " " + event.target.tagName + " " + event.buttons);

        // when we are in painting mode but button is ERASER_BUTTON we erase instead of paint
        if ("pointerdown" == event.type) {
            if (this.currentPen.penType == PenType.pen) {
                if ((event.buttons & ERASER_BUTTON) > 0) {
                    this.previousPen = this.currentPen;
                    this.setCurrentPen(EraserPen);
                } else if ((event.buttons & SECUNDARY_BUTTON) > 0) {
                    this.previousPen = this.currentPen;
                    this.setCurrentPen(SelectionPen);
                }
            }
        }

        this.currentHandler(event);

        if ("pointerup" == event.type) {
            if (this.previousPen) {
                this.setCurrentPen(this.previousPen);
                this.previousPen = undefined;
            }
        }
    }

    handleEraserEvent(event) {
        if ((event.buttons & (PRIMARY_BUTTON | ERASER_BUTTON)) == 0)
            return;

        let element = document.elementFromPoint(event.x, event.y);
        if (element && element.parentElement === this.pad) {
            element.remove();
        }
    }

    handleSelectionEvent(event) {
        if ("pointerup" == event.type) {
            this.polyline.remove();

            this.pad.children
        } else if ((event.buttons & (PRIMARY_BUTTON | SECUNDARY_BUTTON)) > 0)
            this.handlePenEvent(event);
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
            this.btnPressed = event.buttons > 0;
            if (this.btnPressed)
                this.createNewPolyline();
        } else if ("pointerup" == event.type) {
            this.btnPressed = event.buttons > 0;
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
        this.polyline.setAttribute("stroke-width", this.currentPen.size);
        this.polyline.setAttribute("stroke-linecap", "round");
        this.pad.appendChild(this.polyline);
    }
}

exports = DrawingPad;

/***/ })
/******/ ]);