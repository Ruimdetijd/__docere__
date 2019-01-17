import * as React from 'react'
import { Form } from '../../ui/form'

export default class TextForm extends React.PureComponent<FormProps<TextExporter>> {
	render() {
		return (
			<Form
				active={this.props.handler.active}
				change={this.props.change}
				close={this.props.close}
				label="Text"
				type="exporter"
			/>
		)
	}
}