const { Pen } = require('./pens/pen');
const { InitialPen, Pens } = require('./pens/index');

const ToolbarStyle = require('./toolbar.styles');

class Toolbar {
    /**
     * 
     * @param {HTMLElement} toolbar 
     */
    constructor(toolbar) {
        this.rootElement = toolbar;
        this.selectedPen = InitialPen;
        this.selectedDiv = undefined;
    }

    init() {
        this.toolbar = document.createElement("div");
        this.rootElement.appendChild(this.toolbar);

        this.shadow = this.toolbar.attachShadow({ mode: "open" });

        let style = document.createElement("style");
        style.innerHTML = ToolbarStyle;
        this.shadow.appendChild(style);

        let toolbar = document.createElement("div");
        toolbar.classList.add("toolbar");
        this.shadow.appendChild(toolbar);

        Pens.forEach(pen => {
            let div = document.createElement("div");
            toolbar.appendChild(div);

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

    deinit() {
        this.toolbar.remove();
    }

    /**
     * @returns {Pen} the selected pen
     */
    getSelectedPen() {
        return this.selectedPen;
    }

    /**
     * 
     * @param {Pen} pen 
     */
    setSelectedPen(pen) {
        this.selectedPen = pen;
        this.onPenSelected(pen);
    }

    /**
     * Override this method to get notified when a pen is selected.
     * @param {Pen} pen 
     */
    onPenSelected(pen) { }
}

module.exports = Toolbar;