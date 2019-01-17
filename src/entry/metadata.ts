import XMLio from 'xmlio';

// function vangogh(xmlio: XMLio) {
// 	const root = xmlio.export({ type: 'data', deep: false }) as DataNode
// 	return Object.keys(root.attributes).map(key => [key, root.attributes[key]]) as [string, string][]
// }

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
	return idnos.map(idno => [idno.name, idno.children[0]])
}

function annefrank(xmlio: XMLio) {
	const idnos = xmlio
		.select('titleStmt > *')
		.export({ type: 'data' }) as DataNode[]
	return idnos.map(idno => [idno.name, idno.children[0]])
}

export default {
	vangogh: annefrank,
	mondrian,
	annefrank,
	blauweschuit,
}