"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = require("react");
const ReactDOM = require("react-dom");
const react_router_dom_1 = require("react-router-dom");
const entry_1 = require("./entry");
const projects_1 = require("./projects");
const project_1 = require("./project");
const index_components_1 = require("./entry/index.components");
const admin_1 = require("./admin");
const react_router_1 = require("react-router");
const utils_1 = require("./utils");
class App extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            project: null,
            projects: [],
            searchQuery: null,
            setProjects: () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const nextState = yield this.ensureProjects();
                this.setState(() => nextState);
            }),
            setProject: (slug) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const nextState = yield this.ensureProject(slug);
                this.setState(() => nextState);
            }),
            setSearchQuery: (searchQuery) => {
                this.setState({ searchQuery });
            },
            setXml: (slug, filename) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const nextState = yield this.ensureXml(slug, filename);
                this.setState(() => nextState);
            }),
            setEntry: (slug, filename) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const nextState = yield this.ensureXml(slug, filename);
                this.setState(() => nextState);
            }),
            updateProject: (nextProject) => {
                this.setState(() => this.nextProjectState(nextProject));
            },
            xmlio: null
        };
        this.renderEntry = (props) => {
            return (React.createElement(entry_1.default, Object.assign({}, props, this.state)));
        };
        this.nextProjectState = (props, project, projects) => {
            if (project == null)
                project = this.state.project;
            project = Object.assign({}, project, props);
            if (projects == null)
                projects = this.state.projects;
            projects = projects
                .filter(p => p.id !== project.id)
                .concat(project);
            return { project, projects };
        };
    }
    render() {
        const title = this.state.project != null ?
            React.createElement(index_components_1.H1, null,
                React.createElement(react_router_dom_1.Link, { to: `/projects/${this.state.project.slug}` }, this.state.project.title || this.state.project.slug)) :
            React.createElement(index_components_1.H1, null,
                React.createElement("div", null,
                    "DOCERE",
                    React.createElement("small", null, "Digital Scholarly Editions")));
        return (React.createElement(react_router_dom_1.BrowserRouter, null,
            React.createElement(index_components_1.Main, null,
                React.createElement(index_components_1.Menu, null,
                    React.createElement("div", null),
                    React.createElement(react_router_dom_1.Route, { path: "/projects/:projectSlug/xml/:xmlId", render: () => React.createElement("div", null,
                            React.createElement("input", { onKeyUp: ev => {
                                    if (ev.keyCode === 13) {
                                        this.state.setSearchQuery(ev.target.value);
                                    }
                                } }),
                            React.createElement("div", null,
                                React.createElement("svg", { viewBox: "0 0 250.313 250.313" },
                                    React.createElement("path", { d: "M244.186,214.604l-54.379-54.378c-0.289-0.289-0.628-0.491-0.93-0.76 c10.7-16.231,16.945-35.66,16.945-56.554C205.822,46.075,159.747,0,102.911,0S0,46.075,0,102.911 c0,56.835,46.074,102.911,102.91,102.911c20.895,0,40.323-6.245,56.554-16.945c0.269,0.301,0.47,0.64,0.759,0.929l54.38,54.38 c8.169,8.168,21.413,8.168,29.583,0C252.354,236.017,252.354,222.773,244.186,214.604z M102.911,170.146 c-37.134,0-67.236-30.102-67.236-67.235c0-37.134,30.103-67.236,67.236-67.236c37.132,0,67.235,30.103,67.235,67.236 C170.146,140.044,140.043,170.146,102.911,170.146z" })))) })),
                title,
                React.createElement(react_router_1.Switch, null,
                    React.createElement(react_router_dom_1.Route, { path: "/admin", render: (props) => React.createElement(admin_1.default, Object.assign({}, props, this.state)) }),
                    React.createElement(react_router_dom_1.Route, { path: "/", render: () => React.createElement(React.Fragment, null,
                            React.createElement("div", null,
                                React.createElement(react_router_dom_1.Route, { path: "/projects", exact: true, render: () => React.createElement(projects_1.default, Object.assign({}, this.state)) }),
                                React.createElement(react_router_dom_1.Route, { path: "/projects/:slug", exact: true, render: props => React.createElement(project_1.default, Object.assign({}, props, this.state)) }),
                                React.createElement(react_router_dom_1.Route, { exact: true, path: "/projects/:projectSlug/xml/:xmlId", render: this.renderEntry }),
                                React.createElement(react_router_dom_1.Route, { path: "/projects/:projectSlug/xml/:xmlId/entries/:entryId", render: this.renderEntry }))) })))));
    }
    ensureProjects() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const nextState = {};
            if (!this.state.projects.length) {
                const response = yield fetch(`/api/projects`);
                const projects = yield response.json();
                nextState.projects = projects;
            }
            return nextState;
        });
    }
    fetchProject(slug) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`/api/projects/${slug}`);
            let nextProject = yield response.json();
            nextProject = utils_1.parseReceivedProject(nextProject);
            return Object.assign({}, nextProject, { entries: {}, xml: {} });
        });
    }
    ensureProject(slug) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.state.project != null && this.state.project.slug === slug)
                return {};
            if (!this.state.projects.length) {
                const nextState = {};
                nextState.project = yield this.fetchProject(slug);
                const { projects } = yield this.ensureProjects();
                nextState.projects = projects
                    .filter(p => p.id !== nextState.project.id)
                    .concat(nextState.project);
                return nextState;
            }
            const project = this.state.projects.find(p => p.slug === slug);
            if (project.xml == null) {
                const nextProject = yield this.fetchProject(slug);
                return this.nextProjectState(nextProject);
            }
            return {};
        });
    }
    ensureXml(slug, filename) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const nextState = yield this.ensureProject(slug);
            const project = nextState.hasOwnProperty('project') ? nextState.project : this.state.project;
            if (project.xml.hasOwnProperty(filename)) {
                const { xmlio } = project.xml[filename];
                return (xmlio !== this.state.xmlio) ? { xmlio } : {};
            }
            const xmlData = yield utils_1.fetchXml(project.slug, filename);
            const xml = Object.assign({}, project.xml, { [filename]: xmlData });
            const partialState = this.nextProjectState({ xml }, project, nextState.projects);
            return Object.assign({}, partialState, { xmlio: xmlData.xmlio });
        });
    }
}
document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('container');
    ReactDOM.render(React.createElement(App, null), container);
});
