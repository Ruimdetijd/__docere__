import * as React from 'react'
import { Props } from '../main'
import ExtractorForm from './extractor-form'
import styled from '@emotion/styled';

const Forms = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, 240px);
	grid-gap: 20px;
`

const defaultExtractor: Extractor = {
	// color: '',
	id: '',
	// title: '',
	selector: '',
	idAttribute: '',
}

interface State {
	extractors: Extractor[]
}
export default class Extractors extends React.PureComponent<Props, State> {
	state: State = {
		extractors: this.props.project.extractors || []
	}

	render() {
		return (
			<section>
				<h3>Extractors</h3>
				<button
					onClick={() => {
						// Add a new/default extractor to the beginning of extractors
						const extractors = [{ ...defaultExtractor }].concat(this.state.extractors)
						this.setState({ extractors })
					}}
				>
					Add extractor		
				</button>
				<Forms>
					{
						this.state.extractors.map((extractor, index) =>
							<ExtractorForm
								change={nextExtractor => {
									// Remove the changed extractor from the current state
									const nextExtractors = this.state.extractors.filter((_e, i) => i !== index)

									// Add the new extractor to the next state. We can use splice here, 
									// because filter created a new array
									nextExtractors.splice(index, 0, nextExtractor)

									// Set the state and when finished, move the change up the chain
									this.setState({ extractors: nextExtractors }, () =>
										this.props.change('extractors', nextExtractors)
									)
								}}
								extractor={extractor}
								key={index}
								removeExtractor={() => {
									// Filter the extractor to remove from current state
									const extractors = this.state.extractors.filter((_e, i) => i !== index)
									this.setState({ extractors })
								}}
							/>
						)
					}
				</Forms>
			</section>
		)
	}
}
