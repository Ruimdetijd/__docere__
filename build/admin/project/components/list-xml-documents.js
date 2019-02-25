"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styled_1 = require("@emotion/styled");
const Section = styled_1.default.section `
	display: grid;
	grid-template-columns: 1fr 2fr;
	grid-template-rows: 3em repeat(3, 1fr);
	height: 100%;

	h3 {
		margin: 0;
		grid-column: 1 / span 2;
	}

	ul {
		overflow: auto;
		grid-row: 2 / span 3;
	}
`;
const Metadata = styled_1.default.div `
	li {
		margin-bottom: 1em;
	}

`;
class ListXMLDocuments extends React.PureComponent {
    render() {
        return (React.createElement(Section, null,
            React.createElement("h3", null, "XML documents"),
            React.createElement("ul", null, this.props.project.files.map(filename => React.createElement("li", { key: filename, onClick: () => this.props.setXml(this.props.project.slug, filename), style: { textAlign: 'right' } }, filename))),
            React.createElement(Metadata, null,
                React.createElement("h3", null, "Metadata"),
                this.props.xmlio != null &&
                    this.props.project.metadata_extractor != null &&
                    React.createElement("ul", null, this.props.project.metadata_extractor(this.props.xmlio).map(([key, value]) => React.createElement("li", { key: key },
                        React.createElement("div", null, key),
                        React.createElement("div", null, value))))),
            React.createElement(Metadata, null,
                React.createElement("h3", null, "Facsimiles"),
                this.props.xmlio != null &&
                    this.props.project.facsimile_extractor != null &&
                    React.createElement("ul", null, this.props.project.facsimile_extractor(this.props.xmlio).facsimiles
                        .filter(facsimile => facsimile != null)
                        .map((facsimile, index) => React.createElement("li", { key: index },
                        facsimile.id != null &&
                            React.createElement("div", null, facsimile.id),
                        facsimile.path != null &&
                            React.createElement("div", null, facsimile.path))))),
            React.createElement("div", null, "Data")));
    }
}
exports.default = ListXMLDocuments;
