import * as React from 'react'
import Input from '../../ui/input'
import { Form } from '../../ui/form'

export default class SelectForm extends React.PureComponent<FormProps<SelectTransformer>> {
	inputRef: React.RefObject<HTMLInputElement>

	constructor(props: FormProps<SelectTransformer>) {
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
				label="Select"
				type="select"
			>
				<Input
					onChange={(ev) => {
						this.props.change({ selector: ev.currentTarget.value })
					}}
					placeholder="Selector for element(s) to select"
					ref={this.inputRef}
					style={{ marginBottom: '1em' }}
					value={this.props.handler.selector}
				/>
			</Form>
		)
	}
}