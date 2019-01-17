import * as React from 'react'
import { Form } from '../../ui/form';

export default class XmlForm extends React.PureComponent<FormProps<XmlExporter>> {
	render() {
		return (
			<Form
				active={this.props.handler.active}
				change={this.props.change}
				close={this.props.close}
				label="XML"
				type="exporter"
			/>
		)
	}
}