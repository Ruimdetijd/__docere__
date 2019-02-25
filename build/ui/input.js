"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styled_1 = require("@emotion/styled");
const hire_forms_input_1 = require("hire-forms-input");
const InputWrapper = styled_1.default.div `
	background: white;
	border: 1px solid #CCC;
	border-radius: .4em;
	box-sizing: border-box;
	color: #2196f3;
	font-size: .8em;
	list-style: none;
	margin-bottom: .5em;
	text-transform: uppercase;
	padding: .5em;

	input {
		border: none;
		box-sizing: border-box;
		font-size: 1.6em;
		outline: none;
		width: 100%;
	}
`;
function Input(props) {
    return (React.createElement(InputWrapper, null,
        React.createElement("label", null, props.label),
        React.createElement(hire_forms_input_1.default, { onChange: props.change, value: props.value })));
}
exports.default = Input;
function DisabledInput(props) {
    return (React.createElement(InputWrapper, null,
        React.createElement("label", null, props.label),
        props.value));
}
exports.DisabledInput = DisabledInput;
