"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const editor_1 = require("../../editor");
const defaultSplitter = `/**
function(xmlio) {
	const selector = ""
	return xmlio
		.select(selector)
		.export({ type: 'dom' })
}
*/`;
function Splitter(props) {
    if (props.project == null)
        return null;
    const initValue = props.project.splitter == null ?
        defaultSplitter :
        props.project.splitter.toString();
    return (React.createElement("section", null,
        React.createElement("h3", null, "Splitter"),
        React.createElement(editor_1.default, { change: value => {
                if (value === defaultSplitter)
                    value = null;
                props.change('splitter', value);
            }, initValue: initValue })));
}
exports.default = Splitter;
