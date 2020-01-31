const ToolbarStyle = `
.toolbar {
    border: 1px solid black;
    display: inline-flex;
}

.toolbar .pen {
    margin: 4px;
    border: 1px solid black;
    width: 75px;
    cursor: pointer;
}

.toolbar .pen:hover {
    background-color: rgba(155, 155, 155, 0.5);
}

.toolbar .selected-pen {
    border: 3px solid gray;
}

.toolbar .pen p {
    display: block;
    text-align: center;
}

.toolbar .pen img {
    display: block;
    margin: auto;
}
`;

module.exports = ToolbarStyle;