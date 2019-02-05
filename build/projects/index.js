"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
class Projects extends React.Component {
    componentDidMount() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.props.setProjects();
        });
    }
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement("h1", null, "Projects"),
            React.createElement("ul", null, this.props.projects
                .sort((a, b) => {
                if (a.slug < b.slug)
                    return -1;
                if (a.slug > b.slug)
                    return 1;
                return 0;
            })
                .map(project => React.createElement("li", { key: project.id },
                React.createElement(react_router_dom_1.Link, { to: `/projects/${project.slug}` }, project.title || project.slug))))));
    }
}
exports.default = Projects;
