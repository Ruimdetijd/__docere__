import * as React from 'react'
import Editor from '../../editor'
import { Props } from '../main'

const defaultSplitter = `/**
function(xmlio) {
	const selector = ""
	return xmlio
		.select(selector)
		.export({ type: 'dom' })
}
*/`

export default function Splitter(props: Props) {
	if (props.project == null) return null

	const initValue = props.project.splitter == null ?
		defaultSplitter :
		props.project.splitter.toString()
		
	return (
		<section>
			<h3>Splitter</h3>
			<Editor
				change={value => {
					if (value === defaultSplitter) value = null
					props.change('splitter', value)
				}}
				initValue={initValue}
			/>
		</section>
	)
}
