import * as React from 'react'
import FacsimileExtractorForm from '../facsimile-extractor-form'
import { Props } from '../main';

export default function FacsimileExtractor(props: Props) {
	return (
		<FacsimileExtractorForm
			{...props}
			// facsimileExtractor={props.project.facsimile_extractor}
			// onChange={value => props.change('facsimile_extractor', value)}
			// slug={props.project.slug}
		/>
	)
}
// facsimile_extractor => this.setState({ facsimile_extractor })