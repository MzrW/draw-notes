const SelectorPen = require('./selector-pen');
const EraserPen = require('./eraser-pen');
const StylusPen = require('./stylus-pen');

const Initial = new StylusPen("black pen", "create.svg", 2, "black", "white");
const Eraser = new EraserPen("eraser", "delete.svg");
const Selection = new SelectorPen("select", "select.svg", 2, "gray");

const QuickSwitchPens = [
    Eraser,
    Selection
];

const Pens = [
    Selection,
    Eraser,
    Initial,
    new StylusPen("white pen", "create.svg", 2, "white"),
    new StylusPen("green pen", "create.svg", 2, "green"),
    new StylusPen("red pen", "create.svg", 2, "red"),
    new StylusPen("blue pen", "create.svg", 2, "blue", "white")
];

module.exports = {
    InitialPen: Initial,
    EraserPen: Eraser,
    SelectionPen: Selection,

    QuickSwitchPens: QuickSwitchPens,
    Pens: Pens
};