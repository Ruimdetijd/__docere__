import { Splitter } from './project/splitters'
import XMLio from 'xmlio'

export class Project {
	description: string
	entries: {
		[filename: string]: XMLio[]
	}
	extractors: Extractor[]
	id: string
	label: string
	splitter: Splitter
	xml: {
		[filename: string]: XMLio
	}
	userIds: string[]
	files: string[]
}

export class User {
	admin: boolean
	authenticated: boolean
	email: string
	id: string
	password: string
	projects: string[]
}

export class Entry {
	id: string
	xml_id: number
	xml: string
	created: string
	updated: string
}