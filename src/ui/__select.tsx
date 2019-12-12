import * as React from 'react'

interface Props {
	change: (value: string) => void
	label?: string
	options: string[]
	value: string
}
export default class Select extends React.PureComponent<Props> {
	render() {
		return (
			<select
				defaultValue={this.props.value}
				onChange={(ev) => this.props.change(ev.target.value)}
			>
				{
					this.props.options.map(option =>
						<option key={option} value={option}>{option}</option>
					)
				}
			</select>
		)
	}
}