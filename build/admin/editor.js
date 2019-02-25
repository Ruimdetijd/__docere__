"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const monaco = require("monaco-editor");
const styled_1 = require("@emotion/styled");
const utils_1 = require("../utils");
const Editor = styled_1.default('div') `
	width: 100%;
`;
class MiniEditor extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.id = utils_1.generateId();
        this.state = {
            height: 80
        };
    }
    componentDidMount() {
        this.initEditor();
    }
    render() {
        return (React.createElement(Editor, { id: this.id, style: {
                height: `${this.state.height}px`
            } }));
    }
    initEditor() {
        this.editor = monaco.editor.create(document.getElementById(this.id), {
            folding: false,
            language: 'javascript',
            lineNumbers: 'off',
            minimap: {
                enabled: false,
            },
            scrollBeyondLastLine: false,
            value: this.props.initValue
        });
        this.editor.onKeyUp(() => {
            this.setHeight();
            this.props.change(this.editor.getModel().getValue());
        });
        this.setHeight();
    }
    setHeight() {
        const lc = this.editor.getModel().getLineCount();
        const nextHeight = (lc + 1) * 20;
        if (this.state.height !== (lc + 1) * 20) {
            this.setState({ height: nextHeight }, () => this.editor.layout());
        }
    }
}
MiniEditor.defaultProps = {
    initValue: ''
};
exports.default = MiniEditor;
