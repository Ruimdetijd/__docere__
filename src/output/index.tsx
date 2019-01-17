import * as React from 'react'
import * as monaco from 'monaco-editor'
import styled from '@emotion/styled'
import XMLio from 'xmlio'
import editorOptionsByExporterType from './editor-options-by-exporter-type'
import { EditorWrapper } from '../index.components'
import PartNavigator from './part-navigator'

const Wrapper = styled('div')`
	grid-row-start: 3;
	grid-row-end: 4;
	position: relative;

	img {
		position: absolute;
		width: 20px;
		height: 20px;
		right: 0;
		fill: green;
		top: 0;
		transform: rotate(180deg) scaleX(1.2);
	}

	${(props: { hasParts: boolean }) =>
		props.hasParts ? `display: grid; grid-template-rows: 5% 95%; grid-row-gap: 1em;` : ''
	}
`

interface Props {
	columns: Columns
	input: string
	transformers: XMLioTransformer[]
	exporters: Exporter[]
}
interface State {
	activePart: number
	output: string[] | DataNode[]
}
export default class Output extends React.PureComponent<Props, State> {
	editor
	wrapperRef: React.RefObject<HTMLDivElement>

	state: State = {
		activePart: 0,
		output: []
	}

	constructor(props: Props) {
		super(props)
		this.wrapperRef = React.createRef()
	}

	async componentDidUpdate(prevProps: Props, prevState: State) {
		if (!this.activeExporter()) {
			console.log('no exporters')
			if (this.editor != null) {
				this.editor.dispose()
				this.editor = null
			}
			return
		}

		if (prevState.output.length !== this.state.output.length) {
			const el = document.getElementById('output-editor')
			el.style.height = this.state.output.length > 1 ? '90%' : '100%'
			this.editor.layout()
		}

		if (this.editor != null && prevProps.columns !== this.props.columns) {
			this.editor.layout()
		}

		const prevExporter = prevProps.exporters.find(e => e.active)
		const thisExporter = this.activeExporter()

		if (prevProps.input !== this.props.input ||
			prevProps.transformers !== this.props.transformers ||
			prevExporter !== thisExporter
		) {
			console.log('gen output')
			const output = await this.generateOutput()

			if (this.editor == null || prevExporter == null || prevExporter.type !== thisExporter.type) {
				console.log('init editor')
				const editorOptions = editorOptionsByExporterType[thisExporter.type]
				this.editor = this.initEditor(editorOptions)
			}

			const nextState: Partial<State> = { activePart: 0, output }
			this.setState(nextState as State)

			return
		}

		if (
			prevState.output !== this.state.output ||
			prevState.activePart !== this.state.activePart
		) {
			console.log('update editor')
			this.updateEditor()
		}
	}

	render() {
		const hasExporter = this.activeExporter() != null && this.editor != null
		const hasParts = hasExporter && this.state.output.length > 1

		return (
			<Wrapper
				hasParts={hasParts}
				ref={this.wrapperRef}
			>
				<img src="/static/download.svg" />
				{
					hasParts &&
					<PartNavigator
						activePart={this.state.activePart}
						change={activePart => this.setState({ activePart })}
						partCount={this.state.output.length}
					/>
				}
				<EditorWrapper>
					<div id="output-editor" />
				</EditorWrapper>
			</Wrapper>
		)
	}

	private activeExporter(): Exporter {
		return this.props.exporters.find(e => e.active)
	}

	private updateEditor() {
		if (this.editor == null) return

		const model = this.editor.getModel()
		const output = this.state.output[this.state.activePart]

		if (model.getModeId() === 'json') {
			model.setValue(JSON.stringify(output))
			setTimeout(async () => {
				this.editor.updateOptions({ readOnly: false })
				await this.editor.getAction('editor.action.formatDocument').run()
				this.editor.updateOptions({ readOnly: true })
			}, 100)
		} else {
			model.setValue(output)
		}
	}

	private initEditor(options: any = {}) {
		if (this.editor != null) this.editor.dispose()
		return monaco.editor.create(document.getElementById('output-editor'), options)
	}

	private async generateOutput(): Promise<string[] | DataNode[]> {
		const xmlio = new XMLio(this.props.input, { namespaces: ['af'] })
		const transformed = this.props.transformers.reduce((prev, curr) => {
			if (curr.active) xmlio.addTransform(curr)
			return prev
		}, xmlio)
		let output = await transformed.export(this.activeExporter() as any) as any

		if (!Array.isArray(output)) output = [output]
		return output
		// else if (!output.length) return
		// return output.map((o: any) => Array.isArray(o) ? o : [o])
	}
}
