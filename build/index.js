"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = require("react");
const ReactDOM = require("react-dom");
const react_router_dom_1 = require("react-router-dom");
const entry_1 = require("./entry");
const projects_1 = require("./projects");
const project_1 = require("./project");
const extractors_1 = require("./entry/extractors");
const xmlio_1 = require("xmlio");
const splitters_1 = require("./project/splitters");
const index_components_1 = require("./entry/index.components");
const metadata_1 = require("./entry/metadata");
const facsimile_path_extractor_1 = require("./entry/facsimile-path-extractor");
function formatBytes(a) {
    var c = 1024, e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], f = Math.floor(Math.log(a) / Math.log(c));
    const num = (a / Math.pow(c, f));
    const d = num < 10 ? 1 : 0;
    return parseFloat(num.toFixed(d)) + e[f];
}
function fetchXml(slug, filename) {
    return new Promise((resolve, _reject) => {
        var xhr = new XMLHttpRequest;
        xhr.open('GET', `/api/xml/${slug}/${filename}.xml`);
        xhr.responseType = 'document';
        xhr.overrideMimeType('text/xml');
        xhr.onload = function () {
            if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                const size = formatBytes(xhr.getResponseHeader('Content-length'));
                const xmlio = new xmlio_1.default(xhr.responseXML.documentElement, { namespaces: ['af', 'md'] });
                resolve({ xmlio, size });
            }
        };
        xhr.send();
    });
}
class App extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            project: null,
            projects: [],
            setProjects: () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const nextState = yield this.ensureProjects();
                this.setState(() => nextState);
            }),
            setProject: (slug) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const nextState = yield this.ensureProject(slug);
                this.setState(() => nextState);
            }),
            setXml: (slug, filename) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const nextState = yield this.ensureXml(slug, filename);
                this.setState(() => nextState);
            }),
            setEntry: (slug, filename, entryId) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const nextState = yield this.ensureXml(slug, filename);
                if (entryId != null) {
                    const project = nextState.hasOwnProperty('project') ? nextState.project : this.state.project;
                    nextState.xmlio = project.entries[filename][parseInt(entryId, 10)];
                }
                this.setState(() => nextState);
            }),
            xmlio: null
        };
        this.renderEntry = (props) => {
            return (React.createElement(entry_1.default, Object.assign({}, props, this.state)));
        };
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
            const nextProject = yield response.json();
            return Object.assign({}, nextProject, { entries: {}, extractors: extractors_1.default[slug], facsimile_extractor: facsimile_path_extractor_1.default[slug], metadata_extractor: metadata_1.default[slug], splitter: splitters_1.default[slug], xml: {} });
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
                return this.updateProject(nextProject);
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
            const xmlData = yield fetchXml(project.slug, filename);
            const xml = Object.assign({}, project.xml, { [filename]: xmlData });
            let entries = {};
            if (splitters_1.default.hasOwnProperty(project.slug)) {
                const splitted = splitters_1.default[project.slug](xmlData.xmlio);
                entries = Object.assign({}, project.entries, { [filename]: splitted.map(s => new xmlio_1.default(s)) });
            }
            const partialState = this.updateProject({ xml, entries }, project, nextState.projects);
            return Object.assign({}, partialState, { xmlio: xmlData.xmlio });
        });
    }
    updateProject(props, project, projects) {
        if (project == null)
            project = this.state.project;
        project = Object.assign({}, project, props);
        if (projects == null)
            projects = this.state.projects;
        projects = projects
            .filter(p => p.id !== project.id)
            .concat(project);
        return { project, projects };
    }
    render() {
        return (React.createElement(react_router_dom_1.BrowserRouter, null,
            React.createElement(index_components_1.Main, null,
                React.createElement(index_components_1.H1, null,
                    "NINEVEH",
                    React.createElement("small", null, "Digital Scholarly Editions")),
                React.createElement(react_router_dom_1.Route, { path: "/admin", exact: true, render: () => React.createElement("strong", null, "ADMIN") }),
                React.createElement(react_router_dom_1.Route, { path: "/", render: () => React.createElement("div", null,
                        React.createElement(index_components_1.Menu, null,
                            React.createElement(react_router_dom_1.Link, { to: "/projects" }, "Projects"),
                            "\u00A0",
                            this.state.project != null &&
                                React.createElement(react_router_dom_1.Link, { to: `/projects/${this.state.project.slug}` }, this.state.project.title)),
                        React.createElement(react_router_dom_1.Route, { path: "/projects", exact: true, render: () => React.createElement(projects_1.default, Object.assign({}, this.state)) }),
                        React.createElement(react_router_dom_1.Route, { path: "/projects/:slug", exact: true, render: props => React.createElement(project_1.default, Object.assign({}, props, this.state)) }),
                        React.createElement(react_router_dom_1.Route, { exact: true, path: "/projects/:projectSlug/xml/:xmlId", render: this.renderEntry }),
                        React.createElement(react_router_dom_1.Route, { path: "/projects/:projectSlug/xml/:xmlId/entries/:entryId", render: this.renderEntry })) }))));
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    ReactDOM.render(React.createElement(App, null), container);
});
