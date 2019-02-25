"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class Select extends React.PureComponent {
    render() {
        return (React.createElement("select", { defaultValue: this.props.value, onChange: (ev) => this.props.change(ev.target.value) }, this.props.options.map(option => React.createElement("option", { key: option, value: option }, option))));
    }
}
exports.default = Select;
