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

const abeltasman: Extractor[] = [
	{
		color: 'blue',
		id: 'persons',
		idAttribute: 'key',
		selector: 'rs[type="person"][key]',
		title: 'Persons'
	},
	{
		color: 'green',
		id: 'ships',
		idAttribute: 'key',
		selector: 'rs[type="ship"][key]',
		title: 'Ships'
	},
	{
		color: 'purple',
		id: 'places',
		idAttribute: 'key',
		selector: 'rs[type="place"][key]',
		title: 'Places'
	},
	{
		color: 'red',
		id: 'weather',
		selector: 'rs[type="weather"]',
		title: 'Weather'
	},
	{
		color: 'orange',
		id: 'course',
		selector: 'rs[type="course"]',
		title: 'Course'
	},
	{
		color: 'brown',
		id: 'geo',
		selector: 'geo',
		title: 'Geo'
	}
]

export default {
	abeltasman,
	annefrank,
	mondrian,
	vangogh,
	blauweschuit: [],
	gekaaptebrieven: [],
	serrure: [],
	walewein: [],
	bartholomeus: [],
	'correspondenten-1900': [],
	clusius: [],
	deystroom: [],
	'menschen-en-bergen': []
}