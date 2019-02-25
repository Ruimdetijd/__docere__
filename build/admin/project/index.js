"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = require("react");
const menu_1 = require("./menu");
const main_1 = require("./main");
const utils_1 = require("../../utils");
const react_router_dom_1 = require("react-router-dom");
function getPropValue(project, prop, initValue = null) {
    if (project == null || project[prop] == null)
        return initValue;
    return project[prop];
}
class ProjectAdmin extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            extractors: getPropValue(this.props.project, 'extractors'),
            facsimile_extractor: getPropValue(this.props.project, 'facsimile_extractor'),
            metadata_extractor: getPropValue(this.props.project, 'metadata_extractor'),
            metadata_fields: getPropValue(this.props.project, 'metadata_fields'),
            splitter: getPropValue(this.props.project, 'splitter'),
            title: getPropValue(this.props.project, 'title', ''),
        };
    }
    componentDidMount() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.props.setProject(this.props.match.params.slug);
        });
    }
    componentDidUpdate() {
        const nextState = {};
        if (this.state.facsimile_extractor == null && this.props.project.facsimile_extractor != null) {
            nextState.facsimile_extractor = this.props.project.facsimile_extractor.toString();
        }
        if (this.state.metadata_extractor == null && this.props.project.metadata_extractor != null) {
            nextState.metadata_extractor = this.props.project.metadata_extractor.toString();
        }
        if (this.state.splitter == null && this.props.project.splitter != null) {
            nextState.splitter = this.props.project.splitter.toString();
        }
        if (this.state.title == '' && this.props.project.title != null && this.props.project.title.length) {
            nextState.title = this.props.project.title;
        }
        if (this.state.extractors == null && this.props.project.extractors != null && this.props.project.extractors.length) {
            nextState.extractors = this.props.project.extractors;
        }
        if (Object.keys(nextState).length)
            this.setState(nextState);
    }
    render() {
        if (this.props.project == null)
            return null;
        return (React.createElement(React.Fragment, null,
            React.createElement("h2", { style: { margin: 0 } },
                `${this.props.project.title || this.props.project.slug}`,
                " - ",
                React.createElement(react_router_dom_1.Link, { to: `/projects/${this.props.project.slug}` }, "site"),
                React.createElement("button", { onClick: () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        const body = Object.assign({}, this.state);
                        delete body.metadata_fields;
                        if (Array.isArray(body.extractors)) {
                            body.extractors = body.extractors.map(e => {
                                if (e.idAttribute != null && !e.idAttribute.length)
                                    e.idAttribute = null;
                                return e;
                            });
                        }
                        const response = yield fetch(`/api/projects/${this.props.project.slug}`, {
                            body: JSON.stringify(body),
                            headers: { 'Content-Type': 'application/json' },
                            method: "PUT",
                        });
                        let project = yield response.json();
                        project = utils_1.parseReceivedProject(project);
                        this.props.updateProject(project);
                    }) }, "Save")),
            React.createElement("div", { style: {
                    display: 'grid',
                    gridTemplateColumns: '1fr 3fr',
                    gridTemplateRows: '100%',
                    gridColumnGap: '8%'
                } },
                React.createElement(menu_1.default, { slug: this.props.project.slug }),
                React.createElement(main_1.default, Object.assign({}, this.props, { change: (key, value) => {
                        this.setState({ [key]: value });
                    } })))));
    }
}
exports.default = ProjectAdmin;
