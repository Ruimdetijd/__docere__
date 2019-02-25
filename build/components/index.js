"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_1 = require("@emotion/styled");
const dispilio_1 = require("dispilio");
exports.div = styled_1.default.div `
`;
exports.p = styled_1.default.div `
	margin-bottom: 1em;
`;
exports.add = styled_1.default.span `
	color: green;
`;
exports.del = styled_1.default.span `
	color: red;
	text-decoration: line-through;
`;
exports.lb = styled_1.default.span `
	display: ${(props) => props.wordwrap ? 'block' : 'inline'};

	${(props) => (props.wordwrap) ?
    `&:before {
				box-sizing: border-box;
				color: #444;
				content: counter(linenumber);
				counter-increment: linenumber;
				font-size: .8em;
				position: absolute;
				text-align: right;
				width: 42px;
				margin-left: -42px;
				padding-right: 8px;
			}` :
    ''}
`;
exports.rs = styled_1.default.span `
	border-bottom: 2px;
	border-bottom-style: solid;
	border-bottom-color: ${(props) => props[dispilio_1.COLOR_ATTRIBUTE_NAME]};
	background-color: ${(props) => props.activeId === props[dispilio_1.ID_ATTRIBUTE_NAME] ? props[dispilio_1.COLOR_ATTRIBUTE_NAME] : 'initial'};
	color: ${(props) => props.activeId === props[dispilio_1.ID_ATTRIBUTE_NAME] ? 'white' : 'initial'};
	cursor: pointer;
	padding: .05em .1em;
`;
exports.damage = styled_1.default.span `
	&:before {
		content: '✸';
		color: ${(props) => props.activeId === props[dispilio_1.ID_ATTRIBUTE_NAME] ? props[dispilio_1.COLOR_ATTRIBUTE_NAME] : '#444'};
	}
`;
exports.hi = styled_1.default.span `
	${(props) => {
    if (!props.hasOwnProperty('rend'))
        return '';
    const has = (rendStyle) => props.rend.indexOf(rendStyle) > -1;
    const rules = [];
    if (has('underline'))
        rules.push('text-decoration: underline;');
    if (has('super'))
        rules.push('font-style: italic;');
    return rules.join('');
}}
`;
const components = {};
exports.default = components;
