import * as React from 'react'
import Editor from '../editor'
import HireInput from 'hire-forms-input'

const defaultGeneratePath = (slug: string) => `/**
function(attributeValue) {
	return \`/api/facsimile/${slug}/\$\{attributeValue\}.dzi\`
}
*/`

interface Props {
	facsimileExtractor: {
		selector: string
		attribute: string
		generatePath?: string
	}
	onChange: (facsimileExtractor: string) => void
	slug: string
}
interface State {
	selector: string
	attribute: string
	generatePath: string
}
export default class FacsimileExtractorForm extends React.PureComponent<Props, State> {
	state: State = {
		selector: this.props.facsimileExtractor != null && this.props.facsimileExtractor.selector != null ? this.props.facsimileExtractor.selector : '',
		attribute: this.props.facsimileExtractor != null && this.props.facsimileExtractor.attribute != null ? this.props.facsimileExtractor.attribute : '',
		generatePath: this.props.facsimileExtractor != null && this.props.facsimileExtractor.generatePath != null ? this.props.facsimileExtractor.generatePath.toString() : defaultGeneratePath(this.props.slug)
	}

	render() {
		return (
			<section>
				<h3>Facsimile Extractor</h3>
				<HireInput
					onChange={selector => this.updateState({ selector })}
					value={this.state.selector}
				/>
				<HireInput
					onChange={attribute => this.updateState({ attribute })}
					value={this.state.attribute}
				/>
				<Editor
					change={(generatePath => {
						this.updateState({ generatePath })
					})}
					initValue={this.state.generatePath}
				/>
			</section>

		)
	}

	private updateState(nextState: Partial<State>) {
		this.setState(
			// First update the state, otherwise the input elements will not update their values
			nextState as State,

			// Then prepare and fire onChange
			() => {
				// Clone state
				const facsimileExtractor = { ...this.state }

				// If the generate path function is the default one, remove it
				if (facsimileExtractor.generatePath === defaultGeneratePath(this.props.slug)) facsimileExtractor.generatePath = ''

				// If a value is empty, set it to null, because JSON.stringify(null) === null
				Object.keys(facsimileExtractor).forEach(key => {
					if (!facsimileExtractor[key].length) facsimileExtractor[key] = null
				})

				// If all values are set to null, the whole state should be null
				if (Object.keys(facsimileExtractor).every(key => facsimileExtractor[key] == null)) nextState = null

				// Stringify the facsimile extractor, which should then be a string or null
				this.props.onChange(JSON.stringify(facsimileExtractor))
			}
		)
	}
}