class ResizeableWrapper {
    /**
     * 
     * @param {HTMLElement} element 
     */
    constructor(element) {
        this.element = element;

        this.resizingevents = ["pointerdown", "pointermove", "pointerup"];
    }
    init() {
        // wrap container
        this.container = document.createElement("div");
        this.container.style.width = this.element.clientWidth + "px";
        this.container.style.height = this.element.clientHeight + "px";
        this.container.style.position = "relative";
        this.element.style.width = "100%";
        this.element.style.height = "100%";

        this.element.replaceWith(this.container);
        this.container.appendChild(this.element);

        // init resizable elements

        let styles = document.createElement("style");
        styles.innerHTML = `
        .resizer{
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: white;
            border: 3px solid #4286f4;
            position: absolute;
            box-sizing: border-box;
          }

          .top-left {
            left: -5px;
            top: -5px;
            cursor: nwse-resize;
        }
        .top-right {
            right: -5px;
            top: -5px;
            cursor: nesw-resize;
        }
        .bottom-left {
            left: -5px;
            bottom: -5px;
            cursor: nesw-resize;
        }
        .bottom-right {
            right: -5px;
            bottom: -5px;
            cursor: nwse-resize;
        }

        `;
        this.container.appendChild(styles);
        this.resizingEventListeners = [];

        this.resizeables = [];
        ["top-left", "top-right", "bottom-left", "bottom-right"].forEach(corner => {
            let div = document.createElement("div");
            div.classList.add(corner);
            div.classList.add("resizer");
            this.container.appendChild(div);
            this.resizeables.push(div);
        });

        this.resizingevents.forEach(e => {
            let eventHandler = event => this.handleResizingEvents(event);
            window.addEventListener(e, eventHandler);
            this.resizingEventListeners[e] = eventHandler;
        });
    }

    /**
     * 
     * @param {PointerEvent} event 
     */
    handleResizingEvents(event) {
        if (event.type == "pointerdown" &&
            this.resizeables.includes(event.target)) {
            this.resizing = true;
            this.resizingTarget = event.target;
            this.resizingOrigin = { x: event.pageX, y: event.pageY };
        } else if (this.resizing &&
            event.type == "pointermove") {
            let movementX = event.pageX - this.resizingOrigin.x;
            let movementY = event.pageY - this.resizingOrigin.y;

            this.resizingOrigin = { x: event.pageX, y: event.pageY };

            let x = Number.parseFloat(this.container.style.getPropertyValue("width"));
            x = isNaN(x) ? 0 : x;
            this.container.style.setProperty("width", (x + movementX) + "px");

            let y = Number.parseFloat(this.container.style.getPropertyValue("height"));
            y = isNaN(y) ? 0 : y;
            this.container.style.setProperty("height", (y + movementY) + "px");
        } else if (this.resizing &&
            event.type == "pointerup") {
            this.resizing = false;
        }
    }

    deinit() {
        this.resizeables.forEach(r => r.remove());
        this.resizeables = [];

        this.resizingevents.forEach(e => window.removeEventListener(e, this.resizingEventListeners[e]));

        this.element.style.width = this.container.style.width;
        this.element.style.height = this.container.style.height;

        this.container.replaceWith(this.element);
    }
}

module.exports = ResizeableWrapper;