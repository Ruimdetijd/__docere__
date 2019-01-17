import XMLio from 'xmlio';

function annefrank(xmlio: XMLio) {
	return xmlio
		.select('div[n]:not([rend="external"])')
		.export({ type: 'dom' })
}

function blauweschuit(xmlio: XMLio) {
	return xmlio
		.select('text')
		.export({ type: 'dom' })
}

export type Splitter = (xmlio: XMLio) => Element | Element[]

export default {
	annefrank,
	blauweschuit,
} as {
	[slug: string]: Splitter
}