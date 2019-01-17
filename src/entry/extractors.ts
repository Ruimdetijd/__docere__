const annefrank: Extractor[] = [
	{
		color: 'blue',
		id: 'persons',
		idAttribute: 'key',
		selector: 'rs[type="person"][key]',
		title: 'Persons'
	},
	{
		color: 'purple',
		id: 'places',
		idAttribute: 'key',
		selector: 'rs[type="place"][key]',
		title: 'Places'
	},
	{
		color: 'green',
		id: 'damages',
		idAttribute: 'agent',
		selector: 'damage[agent]',
		title: 'Damages'
	}	
]

const mondrian: Extractor[] = [
	{
		color: 'blue',
		id: 'references',
		idAttribute: 'type',
		selector: 'rs',
		title: 'References'
	}
]

const vangogh: Extractor[] = [
	{
		color: 'blue',
		id: 'persons',
		idAttribute: 'key',
		selector: 'rs[type="pers"][key]',
		title: 'Persons'
	}
]

export default {
	annefrank,
	mondrian,
	vangogh,
	blauweschuit: []
}