"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const input_1 = require("../../../ui/input");
class Settings extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            title: this.props.project.title || ''
        };
    }
    render() {
        return (React.createElement("section", null,
            React.createElement(input_1.default, { change: title => {
                    this.setState({ title });
                    this.props.change('title', title);
                }, label: "Title", value: this.state.title })));
    }
}
exports.default = Settings;
