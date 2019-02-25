"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const styled_1 = require("@emotion/styled");
{ }
const Snippets = styled_1.default.ul `
	color: #444;
	font-size: .66em;	
	grid-column: 1 / span 3;
	margin-top: 1em;

	em {
		color: black;
		font-weight: bold;
	}
`;
const Cell = (props) => React.createElement("div", { style: {
        color: props.small ? '#888' : 'black',
        fontSize: props.small ? '.85em' : '1em',
        fontWeight: props.bold ? 'bold' : 'normal',
        textAlign: props.right ? 'right' : 'left'
    } }, props.children == null || (typeof props.children === 'string' && !props.children.length) ? React.createElement("i", null, "Unknown") : props.children);
const ResultBody = (slug) => (props) => React.createElement(react_router_dom_1.Link, { to: `/projects/${slug}/xml/${props.result.m__filebasename}`, style: {
        display: 'grid',
        gridTemplateRows: '1fr .5fr .5fr 1fr 1fr',
        gridTemplateColumns: '4fr auto 4fr',
        textDecoration: 'none',
    } },
    React.createElement(Cell, { bold: true }, props.result.m_date),
    React.createElement("div", null),
    React.createElement("div", null),
    React.createElement("div", { style: { gridColumn: '1 / 4' } }),
    React.createElement("div", { style: { borderTop: '1px solid #CCC', gridColumn: '1 / 4' } }),
    React.createElement(Cell, null, props.result.m_sender),
    React.createElement("div", null, "\u21D2"),
    React.createElement(Cell, { right: true }, props.result.m_recipient),
    React.createElement(Cell, { small: true }, props.result.m_senderloc),
    React.createElement("div", null),
    React.createElement(Cell, { right: true, small: true }, props.result.m_recipientloc),
    React.createElement(Snippets, null, props.result.snippets.map((snippet, index) => React.createElement("li", { dangerouslySetInnerHTML: { __html: `...${snippet}...` }, key: index }))));
exports.default = ResultBody;
