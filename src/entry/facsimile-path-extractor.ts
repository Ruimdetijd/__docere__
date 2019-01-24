import XMLio from 'xmlio'

export default {
	abeltasman: function(xmlio: XMLio): string {
		const node = xmlio.select('div[facs]').export({ type: 'data', deep: false }) as DataNode
		return node.attributes.facs.slice(2)
	},
	gekaaptebrieven: function(xmlio: XMLio): string {
		xmlio
		return ''
	}
}