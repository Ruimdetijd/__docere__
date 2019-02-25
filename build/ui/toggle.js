"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styled_1 = require("@emotion/styled");
const Wrapper = styled_1.default.div `
	align-self: center;
	background: #EEE;
	border-radius: 32px;
	box-sizing: border-box;
	cursor: pointer;
	display: grid;
	height: 32px;
	padding: 0 8px;
	text-align: right;
	width: 48px;

	& > div {
		align-self: center;
		background-color: ${(props) => props.value ? 'lightblue' : '#CCC'};
		border: 4px solid ${(props) => props.value ? '#7cb3c5' : '#CCC'};
		border-radius: 16px;
		box-sizing: border-box;
		display: grid;
		height: 24px;
		margin-left: ${(props) => props.value ? '8px' : 0};
		transition: all 300ms;
		width: 24px;
	}
`;
function Toggle(props) {
    return (React.createElement(Wrapper, { value: props.value, onClick: () => props.change(!props.value) },
        React.createElement("div", null,
            React.createElement("div", null))));
}
exports.default = Toggle;
