"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const editor_1 = require("../../editor");
const defaultMetadataExtractorValue = `/**
function(xmlio) {
	const selector = ""
	let meta = xmlio
		.select(selector)
		.export(({ type: 'data', deep: false }))
	if (meta == null) return []
	if (!Array.isArray(meta)) meta = [meta]
	return meta.map(m => [m.attributes.type, m.attributes.value])
}
*/`;
function MetadataExtractor(props) {
    if (props.project == null)
        return null;
    const initValue = props.project.metadata_extractor == null ?
        defaultMetadataExtractorValue :
        props.project.metadata_extractor.toString();
    return (React.createElement("section", null,
        React.createElement("h3", null, "Metadata Extractor"),
        React.createElement(editor_1.default, { change: value => {
                if (value === defaultMetadataExtractorValue)
                    value = null;
                props.change('metadata_extractor', value);
            }, initValue: initValue })));
}
exports.default = MetadataExtractor;
