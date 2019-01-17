import * as React from 'react'
import * as monaco from 'monaco-editor'
import styled from '@emotion/styled'
import { generateId } from '../utils'

const Editor = styled('div')`
	width: 100%;
`

interface Props {
	change: (value: string) => void
	initValue: string
}
interface State {
	height: number
}
export default class MiniEditor extends React.PureComponent<Props, State> {
	editor
	id = generateId()

	state: State = {
		height: 80
	}

	componentDidMount() {
		this.initEditor()
	}

	render() {
		return (
			<Editor
				id={this.id}
				style={{
					height: `${this.state.height}px`
				}}
			/>
		)
	}

	private initEditor() {
		this.editor = monaco.editor.create(document.getElementById(this.id), {
			folding: false,
			language: 'javascript',
			lineNumbers: 'off',
			minimap: {
				enabled: false,
			},
			scrollBeyondLastLine: false,
			value: this.props.initValue
		})

		this.editor.onKeyUp(() => {
			const lc = this.editor.getModel().getLineCount()
			const nextHeight = (lc + 1) * 20
			if (this.state.height !== (lc + 1) * 20) {
				this.setState(
					{ height: nextHeight },
					() => this.editor.layout()
				)
			}
			this.props.change(this.editor.getModel().getValue())			
		})
	}
}