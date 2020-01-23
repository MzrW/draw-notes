const Toolbar = require('./toolbar');
const DrawingPad = require('./drawing-pad');


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