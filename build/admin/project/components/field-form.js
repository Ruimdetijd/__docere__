"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const input_1 = require("../../../ui/input");
const select_1 = require("../../../ui/select");
const toggle_1 = require("../../../ui/toggle");
const models_1 = require("../../../models");
const styled_1 = require("@emotion/styled");
const utils_1 = require("../../../utils");
utils_1.fetchPut;
const Cell = styled_1.default.div `
	align-self: center;
`;
const Move = styled_1.default(Cell) `
	cursor: pointer;
	justify-self: center;
	transform: rotate(90deg);
`;
const Handle = styled_1.default(Cell) `
	cursor: move;
	justify-self: center;
`;
const Li = styled_1.default.li `
	box-sizing: border-box;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 4fr 16fr 16fr 8fr 48px;
	grid-column-gap: 24px;
	height: 64px;
`;
class FieldFrom extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            aside: this.props.field.aside,
            es_data_type: this.props.field.es_data_type,
            title: this.props.field.title,
        };
        this.updateState = (prop) => (value) => {
            this.setState({ [prop]: value });
            this.debouncedUpdateState();
        };
        this.debouncedUpdateState = utils_1.debounce(() => {
            utils_1.fetchPut(`/api/metadata/${this.props.field.id}`, this.state);
        }, 1000);
    }
    componentDidUpdate(prevProps) {
        const { aside, es_data_type, title } = prevProps.field;
        const nextState = {};
        if (aside !== this.props.field.aside)
            nextState.aside = this.props.field.aside;
        if (es_data_type !== this.props.field.es_data_type)
            nextState.es_data_type = this.props.field.es_data_type;
        if (title !== this.props.field.title)
            nextState.title = this.props.field.title;
        if (Object.keys(nextState).length)
            this.setState(nextState);
    }
    render() {
        return (React.createElement(Li, null,
            React.createElement(Handle, { onMouseDown: this.props.onMouseDown }, "\u2630"),
            React.createElement(Move, { onClick: this.props.moveToFirst }, "\u226A"),
            React.createElement(Move, { onClick: this.props.moveToLast }, "\u226B"),
            React.createElement(Cell, null, this.props.field.type),
            React.createElement(Cell, null, this.props.field.slug),
            React.createElement(input_1.default, { change: this.updateState('title'), label: "title", value: this.state.title }),
            React.createElement(select_1.default, { change: this.updateState('es_data_type'), options: Object.keys(models_1.EsDataType), value: this.state.es_data_type }),
            React.createElement(toggle_1.default, { change: this.updateState('aside'), value: this.state.aside })));
    }
}
exports.default = FieldFrom;
