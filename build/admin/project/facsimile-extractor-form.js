"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const editor_1 = require("../editor");
const defaultFacsimileExtractorValue = `/**
function(xmlio) {
	const selector = ""
	let facsimiles = xmlio
		.select(selector)
		.export(({ type: 'data', deep: false }))
	if (facsimiles == null) return []
	if (!Array.isArray(facsimiles)) facsimiles = [facsimiles]
	return facsimiles.map(f => \`/api/facsimile/<slug>/\$\{f\}.dzi\`)
}
*/`;
function FacsimileExtractor(props) {
    const initValue = props.project.facsimile_extractor == null ?
        defaultFacsimileExtractorValue :
        props.project.facsimile_extractor.toString();
    return (React.createElement("section", null,
        React.createElement("h3", null, "Facsimile Extractor"),
        React.createElement(editor_1.default, { change: value => {
                if (value === defaultFacsimileExtractorValue)
                    value = null;
                props.change('facsimile_extractor', value);
            }, initValue: initValue })));
}
exports.default = FacsimileExtractor;
