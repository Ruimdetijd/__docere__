"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_1 = require("react-router");
const project_1 = require("./project");
function default_1(appState) {
    return (React.createElement(react_router_1.Route, { path: "/admin/project/:slug", render: (props) => React.createElement(project_1.default, Object.assign({}, appState, props)) }));
}
exports.default = default_1;
