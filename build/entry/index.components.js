"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_1 = require("@emotion/styled");
const core_1 = require("@emotion/core");
const TOPMENU_HEIGHT = 32;
const MAINHEADER_HEIGHT = 64;
exports.Main = styled_1.default('div') `
	background-color: white;
	box-sizing: border-box;
	display: grid;
	grid-template-rows: 32px 64px auto;
	width: 100%;
`;
exports.Layers = styled_1.default.div `
	display: grid;
	${(props) => {
    console.log(props);
    if (props.orientation === 0)
        return 'grid-template-columns: 1fr 1fr;';
    if (props.orientation === 1)
        return 'grid-template-rows: 1fr 1fr;';
}}
`;
exports.H1 = styled_1.default('h1') `
	align-items: center;	
	background: #e3c386;
	color: #444;
	display: grid;
	font-size: 1.75rem;
	height: ${MAINHEADER_HEIGHT}px;
	justify-items: center;
	margin: 0;
	position: sticky;
	top: ${TOPMENU_HEIGHT}px;
	text-transform: uppercase;
	z-index: 1;

	a:hover, a:link, a:active, a:visited {
		color: inherit;
		text-decoration: none;
	}

	div {
		text-align: center;
	}

	small {
		color: #888;
		font-weight: normal;
		font-size: .375em;
		display: block;
	}
`;
exports.Menu = styled_1.default.div `
	background-color: #c7aa71;
	display: grid;
	grid-template-columns: 80% 20%;
	height: ${TOPMENU_HEIGHT}px;
	position: sticky;
	top: 0;
	z-index: 1;

	& > div {
		display: grid;
		grid-template-columns: 64px auto 28px 32px;

		& > input { 
			background-color: #988258;
			border: none;
			box-sizing: border-box;
			color: white;
			font-size: 1rem;
			grid-column: 2;
			outline: none;
			padding: 0 .5em;
			width: 100%;
		}
		& > div {
			align-items: center;
			background-color: #988258;
			grid-column: 3;
			padding-right: 8px;
			display: grid;

			svg {
				fill: #c7aa71;
			}
		}
	}
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
