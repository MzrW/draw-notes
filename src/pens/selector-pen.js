const pointInsidePolygon = require('point-in-polygon');

const { PenType, PRIMARY_BUTTON, SECUNDARY_BUTTON } = require("./pen");
const StylusPen = require('./stylus-pen');

class SelectorPen extends StylusPen {
    constructor(name, icon, size = undefined, color = undefined, bgColor = "black") {
        super(name, icon, size, color, bgColor);
    }

    handleEvents(event, svgPad) {
        if ("pointerup" == event.type) {
            this.polyline.remove();

            // what do we do with them
            // this.findSelectedElements(svgPad);
        } else if ((event.buttons & (PRIMARY_BUTTON | SECUNDARY_BUTTON)) > 0)
            super.handleEvents(event, svgPad);
    }

    /**
     * 
     * @param {SVGElement} svgPad 
     */
    findSelectedElements(svgPad) {
        // create array of elements
        let elements = [];
        {
            let polylines = svgPad.children;
            for (let i = 0; i < polylines.length; i++) {
                let polyline = polylines.item(i);

                let points = polyline
                    .getAttribute("points")
                    .split(" ");

                elements.push({ element: polyline, points: points});
            }
        }

        // filter the elements
        let selectedElements = [];
        {
            elements.forEach(element => {
                for (let i = 0; i < element.points.length; i++) {
                    let pointString = element.points[i];
                    let point = this.mapPointFromString(pointString);

                    if(!pointInsidePolygon(point, this.linePoints))
                        return;
                }

                selectedElements.push(element.element);
            });
        }
        return selectedElements;
    }


    /**
     * 
     * @param {string} string in the form "x,y"
     * @returns number array [x,y]
     */
    mapPointFromString(string) {
        let coordinates = string.split(",");

        return [Number.parseInt(coordinates[0]), Number.parseInt(coordinates[1])];
    }

    getPenType() {
        return PenType.selector;
    }
}

module.exports = SelectorPen;