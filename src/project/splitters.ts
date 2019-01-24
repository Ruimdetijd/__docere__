import XMLio from 'xmlio'

function abeltasman(xmlio: XMLio) {
	return xmlio
		.select('div[type="section"]')
		.export({ type: 'dom' })
}

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

function serrure(xmlio: XMLio) {
	return xmlio
		.select('group')
		.export({ type: 'dom' })
}

function bartholomeus(xmlio: XMLio) {
	return xmlio
		.select('group > text')
		.export({ type: 'dom' })
}

export type Splitter = (xmlio: XMLio) => Element | Element[]

export default {
	abeltasman,
	annefrank,
	blauweschuit,
	serrure,
	bartholomeus,
	'correspondenten-1900': bartholomeus,
} as {
	[slug: string]: Splitter
}