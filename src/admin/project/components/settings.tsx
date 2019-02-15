import * as React from 'react'
import { Props } from '../main'
import Input from '../../../ui/input';

interface State {
	title: string
}
export default class Settings extends React.PureComponent<Props, State> {
	state: State = {
		title: this.props.project.title || ''
	}

	render() {
		return (
			<section>
				<Input
					change={title => {
						this.setState({ title })
						this.props.change('title', title)
					}}
					label="Title"
					value={this.state.title}
				/>
			</section>
		)
	}
}
// title => this.setState({ title })