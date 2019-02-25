"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const menu_data_1 = require("./menu-data");
function Menu(props) {
    return (React.createElement("aside", null,
        React.createElement("ul", { style: { display: 'grid', height: '100%', gridTemplateRows: 'repeat(auto-fill, 72px)' } }, menu_data_1.default.map(item => React.createElement("li", { key: item.slug, style: { display: 'grid', borderBottom: '1px solid lightblue', alignContent: 'center', cursor: 'pointer' } },
            React.createElement(react_router_dom_1.Link, { style: { textDecoration: 'none', color: '#888', textTransform: 'uppercase' }, to: `/admin/project/${props.slug}/${item.slug}` }, item.title))))));
}
exports.default = Menu;
