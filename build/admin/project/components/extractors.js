"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const extractor_form_1 = require("./extractor-form");
const styled_1 = require("@emotion/styled");
const Forms = styled_1.default.div `
	display: grid;
	grid-template-columns: repeat(auto-fill, 240px);
	grid-gap: 20px;
`;
const defaultExtractor = {
    id: '',
    selector: '',
    idAttribute: '',
};
class Extractors extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            extractors: this.props.project.extractors || []
        };
    }
    render() {
        return (React.createElement("section", null,
            React.createElement("h3", null, "Extractors"),
            React.createElement("button", { onClick: () => {
                    const extractors = [Object.assign({}, defaultExtractor)].concat(this.state.extractors);
                    this.setState({ extractors });
                } }, "Add extractor"),
            React.createElement(Forms, null, this.state.extractors.map((extractor, index) => React.createElement(extractor_form_1.default, { change: nextExtractor => {
                    const nextExtractors = this.state.extractors.filter((_e, i) => i !== index);
                    nextExtractors.splice(index, 0, nextExtractor);
                    this.setState({ extractors: nextExtractors }, () => this.props.change('extractors', nextExtractors));
                }, extractor: extractor, key: index, removeExtractor: () => {
                    const extractors = this.state.extractors.filter((_e, i) => i !== index);
                    this.setState({ extractors });
                } })))));
    }
}
exports.default = Extractors;
