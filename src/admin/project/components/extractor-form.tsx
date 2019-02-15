import * as React from 'react'
import Input from '../../../ui/input'

interface Props {
	change: (extractor: Extractor) => void
	extractor: Extractor
	removeExtractor: () => void
}
export default class ExtractorForm extends React.PureComponent<Props, Extractor> {
	state: Extractor = {
		// color: this.props.extractor.color || '',
		id: this.props.extractor.id || '',
		idAttribute: this.props.extractor.idAttribute || '',
		selector: this.props.extractor.selector || '',
		// title: this.props.extractor.title || '',
	}

	componentDidUpdate(prevProps) {
		if (prevProps.extractor !== this.props.extractor) {
			const nextState = { ...this.props.extractor }
			if (this.props.extractor.idAttribute == null) nextState.idAttribute = ''
			this.setState(nextState)
		}
	}

	render() {
		return (
			<ul>
				<button onClick={() => this.props.removeExtractor()}>Remove</button>
				<Input
					change={this.updateState('id')}
					label="ID"
					value={this.state.id}
				/>
				{/* <Input
					change={this.updateState('title')}
					label="Title"
					value={this.state.title}
				/> */}
				<Input
					change={this.updateState('selector')}
					label="Selector"
					value={this.state.selector}
				/>
				<Input
					change={this.updateState('idAttribute')}
					label="ID attribute"
					value={this.state.idAttribute}
				/>
				{/* <Input
					change={this.updateState('color')}
					label="Color"
					value={this.state.color}
				/> */}
			</ul>

		)
	}

	private updateState = (key: keyof Extractor) => (value: string) => {
		this.setState({ [key]: value } as any, () => this.props.change(this.state))
	}
}
