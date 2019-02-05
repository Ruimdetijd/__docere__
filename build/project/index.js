"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const splitters_1 = require("./splitters");
class Project extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            filename: null
        };
    }
    componentDidMount() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.props.setProject(this.props.match.params.slug);
        });
    }
    render() {
        if (this.props.project == null)
            return null;
        return (React.createElement(React.Fragment, null,
            React.createElement("h2", null, `Project: ${this.props.project.title || this.props.project.slug}`),
            React.createElement("div", null,
                React.createElement("h3", null, "XML documents"),
                React.createElement("ul", null, this.props.project.files.map(filename => React.createElement("li", { key: filename },
                    React.createElement(react_router_dom_1.Link, { to: `/projects/${this.props.project.slug}/xml/${filename}` }, filename),
                    splitters_1.default.hasOwnProperty(this.props.project.slug) &&
                        React.createElement("span", { onClick: () => {
                                this.setState({ filename });
                                this.props.setXml(this.props.match.params.slug, filename);
                            } }, "split"),
                    this.props.project.xml.hasOwnProperty(filename) &&
                        React.createElement("span", null, this.props.project.xml[filename].size))))),
            splitters_1.default.hasOwnProperty(this.props.project.slug) &&
                this.state.filename != null &&
                this.props.project.entries.hasOwnProperty(this.state.filename) &&
                this.props.project.entries[this.state.filename].length &&
                React.createElement("div", null,
                    React.createElement("h3", null, "Entries"),
                    React.createElement("ul", null, this.props.project.entries[this.state.filename].map((_xmlio, index) => React.createElement("li", { key: index },
                        React.createElement(react_router_dom_1.Link, { to: `/projects/${this.props.project.slug}/xml/${this.state.filename}/entries/${index}` }, index)))))));
    }
}
exports.default = Project;
