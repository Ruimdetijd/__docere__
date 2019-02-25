"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_1 = require("react-router");
const menu_data_1 = require("./menu-data");
function Menu(props) {
    return (React.createElement("div", null, menu_data_1.default.map(item => React.createElement(react_router_1.Route, { exact: true, key: item.slug, path: `${props.match.url}/${item.slug}`, render: (routerProps) => React.createElement(item.component, Object.assign({}, routerProps, props)) }))));
}
exports.default = Menu;
