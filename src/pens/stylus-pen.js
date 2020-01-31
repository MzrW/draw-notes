const { Pen, PenType } = require("./pen");

class StylusPen extends Pen {
    constructor(name, icon, size = undefined, color = undefined, bgColor = "black") {
        super(name, icon, size, color, bgColor);

        this.btnPressed = false;

        this.linePoints = null;
        this.polyline = null;
    }

    handleEvents(event, svgPad) {
        if ("pointermove" == event.type) {
            if (this.btnPressed && event.target === svgPad) {
                this.addPoint(event.offsetX, event.offsetY);
            }
        } else if ("pointerdown" == event.type) {
            this.btnPressed = event.buttons > 0;
            if (this.btnPressed) {
                this.createNewPolyline(svgPad);
                this.addPoint(event.offsetX, event.offsetY);
            }
        } else if ("pointerup" == event.type) {
            this.btnPressed = event.buttons > 0;
            this.endPolyline();
        }
    }

    endPolyline() {
        if (this.linePoints.length < 2
            && this.polyline)
            this.polyline.remove();
        this.linePoints = [];
    }

    addPoint(x, y) {
        this.linePoints.push([x, y]);

        this.polyline.setAttribute("points", this
            .linePoints
            .map(v => v[0] + "," + v[1])
            .join(" "));
    }

    createNewPolyline(svgPad) {
        this.linePoints = [];

        this.polyline = document.createElementNS('http://www.w3.org/2000/svg', "polyline");
        this.polyline.setAttribute("fill", "none");
        this.polyline.setAttribute("stroke", this.color);
        this.polyline.setAttribute("stroke-width", this.size);
        this.polyline.setAttribute("stroke-linecap", "round");
        svgPad.appendChild(this.polyline);
    }

    getPenType() {
        return PenType.pen;
    }
}

module.exports = StylusPen;