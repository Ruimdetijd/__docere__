import * as React from 'react'
import StringOrFunction from '../../ui/string-or-function'
import Button from '../../ui/button'
import Input from '../../ui/input'
import { Form } from '../../ui/form'

interface State {
	targetSelector: string
	sourceSelectorFunc: string
}
export default class ReplaceForm extends React.PureComponent<FormProps<ReplaceTransformer>, State> {
	inputRef: React.RefObject<HTMLInputElement>

	state: State = {
		targetSelector: this.props.handler.targetSelector,
		sourceSelectorFunc: this.props.handler.sourceSelectorFunc
	}

	constructor(props: FormProps<ReplaceTransformer>) {
		super(props)
		this.inputRef = React.createRef()
	}

	componentDidMount() {
		this.inputRef.current.focus()
	}

	render() {
		return (
			<Form
				active={this.props.handler.active}
				change={this.props.change}
				close={this.props.close}
				label="Replace"
				type="replace"
			>
				<Input
					onChange={(ev) => {
						this.setState({ targetSelector: ev.currentTarget.value })
					}}
					placeholder="Selector for element(s) to replace"
					ref={this.inputRef}
					value={this.state.targetSelector}
				/>
				{
					this.state.targetSelector.length > 0 &&
					<StringOrFunction change={(sourceSelectorFunc => this.setState({ sourceSelectorFunc }))} />
				}
				{
					this.state.targetSelector.length > 0 &&
					this.state.sourceSelectorFunc.length > 0 &&
					<Button
						onClick={() => this.props.change({
							sourceSelectorFunc: this.state.sourceSelectorFunc,
							targetSelector: this.state.targetSelector,
						})}
					>
						Add replace transform
					</Button>
				}
			</Form>
		)
	}
}