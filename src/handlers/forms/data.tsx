import * as React from 'react'
import { Form } from '../../ui/form';

export default class DataForm extends React.PureComponent<FormProps<DataExporter>> {
	render() {
		return (
			<Form
				active={this.props.handler.active}
				change={this.props.change}
				close={this.props.close}
				label="JSON"
				type="exporter"
			/>
		)
	}
}