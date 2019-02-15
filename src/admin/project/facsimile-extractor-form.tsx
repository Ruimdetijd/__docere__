// TODO move to ./components

import * as React from 'react'
import Editor from '../editor'
// import { FacsimileExtractor } from '../../models'
import { Props } from './main';

const defaultFacsimileExtractorValue = `/**
function(xmlio) {
	const selector = ""
	let facsimiles = xmlio
		.select(selector)
		.export(({ type: 'data', deep: false }))
	if (facsimiles == null) return []
	if (!Array.isArray(facsimiles)) facsimiles = [facsimiles]
	return facsimiles.map(f => \`/api/facsimile/<slug>/\$\{f\}.dzi\`)
}
*/`

export default function FacsimileExtractor(props: Props) {
	const initValue = props.project.facsimile_extractor == null ?
		defaultFacsimileExtractorValue :
		props.project.facsimile_extractor.toString()

	return (
		<section>
			<h3>Facsimile Extractor</h3>
			<Editor
				change={value => {
					if (value === defaultFacsimileExtractorValue) value = null
					props.change('facsimile_extractor', value)
				}}
				initValue={initValue}
			/>
		</section>

	)
}

	// private updateState(nextState: Partial<State>) {
	// 	this.setState(
	// 		// First update the state, otherwise the input elements will not update their values
	// 		nextState as State,

	// 		// Then prepare and fire onChange
	// 		() => {
	// 			// Clone state
	// 			const facsimileExtractor = { ...this.state }

	// 			// If the generate path function is the default one, remove it
	// 			if (facsimileExtractor.generatePath === defaultFacsimileExtractorValue(this.props.slug)) facsimileExtractor.generatePath = ''

	// 			// If a value is empty, set it to null, because JSON.stringify(null) === null
	// 			Object.keys(facsimileExtractor).forEach(key => {
	// 				if (!facsimileExtractor[key].length) facsimileExtractor[key] = null
	// 			})

	// 			// If all values are set to null, the whole state should be null
	// 			if (Object.keys(facsimileExtractor).every(key => facsimileExtractor[key] == null)) nextState = null

	// 			// Stringify the facsimile extractor, which should then be a string or null
	// 			this.props.onChange(JSON.stringify(facsimileExtractor))
	// 		}
	// 	)
	// }