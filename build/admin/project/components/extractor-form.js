"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const input_1 = require("../../../ui/input");
class ExtractorForm extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            id: this.props.extractor.id || '',
            idAttribute: this.props.extractor.idAttribute || '',
            selector: this.props.extractor.selector || '',
        };
        this.updateState = (key) => (value) => {
            this.setState({ [key]: value }, () => this.props.change(this.state));
        };
    }
    componentDidUpdate(prevProps) {
        if (prevProps.extractor !== this.props.extractor) {
            const nextState = Object.assign({}, this.props.extractor);
            if (this.props.extractor.idAttribute == null)
                nextState.idAttribute = '';
            this.setState(nextState);
        }
    }
    render() {
        return (React.createElement("ul", null,
            React.createElement("button", { onClick: () => this.props.removeExtractor() }, "Remove"),
            React.createElement(input_1.default, { change: this.updateState('id'), label: "ID", value: this.state.id }),
            React.createElement(input_1.default, { change: this.updateState('selector'), label: "Selector", value: this.state.selector }),
            React.createElement(input_1.default, { change: this.updateState('idAttribute'), label: "ID attribute", value: this.state.idAttribute })));
    }
}
exports.default = ExtractorForm;
