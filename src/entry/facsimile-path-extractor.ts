// import XMLio from 'xmlio'

export default {
	abeltasman: {
		selector: 'div',
		attribute: 'facs',
		generatePath: function (basename: string) {
		 	return `/api/facsimile/abeltasman/${basename.slice(2)}.dzi`
		}
	},
	// gekaaptebrieven: {
	// 	selector: 'pb',
	// 	attribute: 'facs',
	// 	generatePath: function (basename: string) {
	// 	 	return `/api/facsimile/gekaaptebrieven/${basename.slice(0, -4)}.dzi`
	// 	}
	// }
	// abeltasman: function(xmlio: XMLio): string[] {
	// 	let nodes = xmlio.select('div[facs]').export({ type: 'data', deep: false })
	// 	if (!Array.isArray(nodes)) nodes = [nodes]
	// 	return nodes.map(node => `/api/facsimile/abeltasman/${node.attributes.facs.slice(2)}.dzi`)
	// },
	// gekaaptebrieven: function(xmlio: XMLio, _metadata: Metadata): string[] {
	// 	let facsimiles = xmlio.select('pb[facs]').export({ type: 'data', deep: false })
	// 	if (!Array.isArray(facsimiles)) facsimiles = [facsimiles]
	// 	const paths = facsimiles.map(facs => `/api/facsimile/gekaaptebrieven/${facs.attributes.facs.slice(0, -4)}.dzi`)
	// 	return paths
	// }
}