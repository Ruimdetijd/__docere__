import XMLio from 'xmlio'

function mondrian(xmlio: XMLio) {
	const idnos = xmlio
		.select('idno')
		.export({ type: 'data' }) as DataNode[] || []
	return idnos.map(idno => [idno.attributes.type, idno.children[0]])
}

function blauweschuit(xmlio: XMLio) {
	const idnos = xmlio
		.select('msidentifier > *')
		.export({ type: 'data' }) as DataNode[]
	return Array.isArray(idnos) ? idnos.map(idno => [idno.name, idno.children[0]]) : []
}

function annefrank(xmlio: XMLio) {
	const idnos = xmlio
		.select('titleStmt > *')
		.export({ type: 'data' }) as DataNode[]
	return Array.isArray(idnos) ? idnos.map(idno => [idno.name, idno.children[0]]) : []
}

// function gekaaptebrieven(xmlio: XMLio) {
// 	let meta = xmlio
// 		.select('meta')
// 		.export(({ type: 'data', deep: false }))
// 	if (meta == null) return []
// 	if (!Array.isArray(meta)) meta = [meta]
// 	return meta.map(m => [m.attributes.type, m.attributes.value])
// }

export default {
	abeltasman: function() { return [] },
	vangogh: annefrank,
	mondrian,
	annefrank,
	blauweschuit,
	serrure: function() { return [] },
	walewein: function() { return [] },
	bartholomeus: function() { return [] },
	clusius: function() { return [] },
	deystroom: function() { return [] },
	'menschen-en-bergen': function() { return [] },
	'correspondenten-1900': function(xmlio: XMLio) {
		const meta = xmlio.select('interpGrp > interp').export({ type: 'data', deep: false }) as DataNode[]
		return meta.map(m => [m.attributes.type, m.attributes.value])
	}
}