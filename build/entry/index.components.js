"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_1 = require("@emotion/styled");
const core_1 = require("@emotion/core");
exports.Main = styled_1.default('div') `
	box-sizing: border-box;
	display: grid;
	grid-column-gap: 2%;
	grid-template-rows: 10% 3% 84%;
	grid-template-columns: 80% 18%;
	height: 100%;
	padding: 0 2%;
	transition: all 1s;
	width: 100%;
`;
exports.Layers = styled_1.default.div `
	display: grid;
	grid-column-gap: 2%;
	${(props) => {
    console.log(props);
    if (props.orientation === 0)
        return 'grid-template-columns: 1fr 1fr;';
    if (props.orientation === 1)
        return 'grid-template-rows: 1fr 1fr;';
}}
`;
exports.H1 = styled_1.default('h1') `
	grid-column-start: 1;
	grid-column-end: 5;
    margin: 0;
    justify-self: center;
    background: rgba(255, 255, 255, .8);
    align-self: start;
    padding: 0.2em 1.4em;
    border-bottom-left-radius: 1em;
    border-bottom-right-radius: 1em;
	box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.2);
	text-align: center;
	
	small {
		color: #888;
		font-weight: normal;
		font-size: .375em;
		display: block;
		text-transform: uppercase;
	}
`;
exports.Menu = styled_1.default.div `
	grid-column: 1 / span 3;
`;
exports.MetadataItem = styled_1.default.li `
	margin-bottom: .5em;

	& span:first-of-type {
		display: block;
		font-weight: bold;
	}
`;
exports.small = core_1.css `
		color: #444;
		font-size: .8em;
		margin-left: .5em;
`;
