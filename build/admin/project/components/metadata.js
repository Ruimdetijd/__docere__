"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const styled_1 = require("@emotion/styled");
const utils_1 = require("../../../utils");
const field_form_1 = require("./field-form");
const Ul = styled_1.default.ul `
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 4fr 16fr 16fr 8fr 48px;
	grid-column-gap: 24px;

	li:first-of-type {
		grid-column: 4;
	}
`;
class Metadata extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.moved = 0;
        this.state = {
            dragging: null,
            metadataFields: this.props.project.metadata_fields
        };
    }
    componentDidMount() {
        document.addEventListener('mouseup', () => {
            if (this.state.dragging != null) {
                this.moved = 0;
                this.setState({ dragging: null });
            }
        });
    }
    render() {
        return (React.createElement("section", { style: { userSelect: 'none' } },
            React.createElement(Ul, null,
                React.createElement("li", null, "type"),
                React.createElement("li", null, "slug"),
                React.createElement("li", null, "title"),
                React.createElement("li", null, "data type"),
                React.createElement("li", null, "aside")),
            React.createElement("ul", { onMouseMove: (ev) => {
                    if (this.state.dragging) {
                        this.handleDrag(ev);
                    }
                } }, this.state.metadataFields
                .sort((f1, f2) => f1.sortorder - f2.sortorder)
                .map((field, _index) => React.createElement(field_form_1.default, { active: this.state.dragging === field, onMouseDown: () => {
                    this.setState({ dragging: field });
                }, field: field, key: field.slug, moveToFirst: () => this.moveTo(field.id, 'first'), moveToLast: () => this.moveTo(field.id, 'last') })))));
    }
    moveTo(fieldId, place) {
        const found = this.state.metadataFields.find(f => f.id === fieldId);
        const rest = this.state.metadataFields.filter(f => f.id !== fieldId);
        const metadataFields = (place === 'first' ? [found].concat(rest) : rest.concat(found));
        this.updateMetadataFields(metadataFields);
    }
    handleDrag(ev) {
        this.moved += ev.movementY;
        const orderOffset = Math.round(this.moved / 64);
        if (orderOffset !== 0) {
            const fromIndex = this.state.dragging.sortorder - 1;
            const toIndex = fromIndex + orderOffset;
            const arr = this.state.metadataFields;
            var element = arr[fromIndex];
            arr.splice(fromIndex, 1);
            arr.splice(toIndex, 0, element);
            const nextMetadataFields = arr
                .map((f, i) => {
                return Object.assign({}, f, { sortorder: i + 1 });
            });
            const nextField = nextMetadataFields[toIndex];
            this.saveDiff(nextMetadataFields);
            this.setState(() => ({ metadataFields: nextMetadataFields, dragging: nextField }));
            this.moved = 0;
        }
    }
    updateMetadataFields(nextMetadataFields, nextState = {}) {
        const metadataFields = nextMetadataFields.map((f, i) => (Object.assign({}, f, { sortorder: i + 1 })));
        this.saveDiff(metadataFields);
        this.setState(Object.assign({ metadataFields }, nextState));
    }
    saveDiff(nextMetadataFields) {
        if (this.state.metadataFields !== nextMetadataFields) {
            const prevMap = this.state.metadataFields.reduce((prev, curr) => {
                prev[curr.id] = curr.sortorder;
                return prev;
            }, {});
            const changed = nextMetadataFields
                .filter(f => f.sortorder !== prevMap[f.id])
                .map(f => [f.id, f.sortorder]);
            utils_1.fetchPut(`/api/metadata/sortorder`, changed);
        }
    }
}
exports.default = Metadata;
