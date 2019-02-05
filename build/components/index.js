"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styled_1 = require("@emotion/styled");
const dispilio_1 = require("dispilio");
const div = styled_1.default.div `
`;
const p = styled_1.default.div `
	margin-bottom: 1em;
`;
const add = styled_1.default.span `
	color: green;
`;
const del = styled_1.default.span `
	color: red;
	text-decoration: line-through;
`;
const lb = styled_1.default.span `
	display: block;

	&:before {
		box-sizing: border-box;
		color: #444;
		content: counter(linenumber);
		counter-increment: linenumber;
		font-size: .8em;
		left: 0;
		padding-right: .5em;
		position: absolute;
		text-align: right;
		width: 2em;
	}
`;
const rs = styled_1.default.span `
	border-bottom: 2px;
	border-bottom-style: solid;
	border-bottom-color: ${(props) => props[dispilio_1.COLOR_ATTRIBUTE_NAME]};
	background-color: ${(props) => props.activeId === props[dispilio_1.ID_ATTRIBUTE_NAME] ? props[dispilio_1.COLOR_ATTRIBUTE_NAME] : 'none'};
	color: ${(props) => props.activeId === props[dispilio_1.ID_ATTRIBUTE_NAME] ? 'white' : 'initial'};
	cursor: pointer;
	padding: .05em .1em;
`;
const damage = styled_1.default.span `
	&:before {
		content: '✸';
		color: ${(props) => props.activeId === props[dispilio_1.ID_ATTRIBUTE_NAME] ? props[dispilio_1.COLOR_ATTRIBUTE_NAME] : '#444'};
	}
`;
const hi = styled_1.default.span `
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
exports.default = {
    add,
    damage,
    del,
    div,
    geo: rs,
    head: styled_1.default.strong ``,
    lb,
    p,
    rs,
    hi
};
