"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = require("react");
const state_1 = require("./state");
const components_1 = require("../components");
const dispilio_1 = require("dispilio");
class Entry extends React.Component {
    constructor() {
        super(...arguments);
        this.state = state_1.default;
        this.components = components_1.default;
    }
    componentDidMount() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { projectSlug, xmlId, entryId } = this.props.match.params;
            yield this.props.setEntry(projectSlug, xmlId, entryId);
        });
    }
    render() {
        if (this.state.dataNodeTree == null)
            return null;
        return (React.createElement(dispilio_1.default, { components: this.components, xmlio: this.props.xmlio, project: this.props.project }));
    }
}
exports.default = Entry;
