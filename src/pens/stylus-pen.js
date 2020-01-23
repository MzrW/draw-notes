const { Pen, PenType} = require("./pen");

class StylusPen extends Pen {
    constructor(name, icon, size = undefined, color = undefined, bgColor = "black") {
        super(name, icon, size, color, bgColor);
        
        this.btnPressed = false;

        this.linePoints = null;
        this.polyline = null;
    }

    handleEvents(event, svgPad) {
        if ("pointerenter" == event.type) {
            if (this.btnPressed)
                this.createNewPolyline(svgPad);
        } else if ("pointermove" == event.type) {
            if (this.btnPressed && event.target === svgPad) {
                this.linePoints.push([event.offsetX, event.offsetY]);

                this.polyline.setAttribute("points", this
                    .linePoints
                    .map(v => v[0] + "," + v[1])
                    .join(" "));
            }
        } else if ("pointerdown" == event.type) {
            this.btnPressed = event.buttons > 0;
            if (this.btnPressed)
                this.createNewPolyline(svgPad);
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