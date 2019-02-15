import XMLio from 'xmlio'
import { FacsimileExtractor } from 'dispilio'

export interface XMLData {
	xmlio: XMLio,
	size: string
}

type Splitter = (xmlio: XMLio) => Element | Element[]

export enum EsDataType {
	boolean = "boolean",
	date = "date",
	geo_point = "geo_point",
	integer = "integer",
	keyword = "keyword",
	null = "null",
	text = "text",
}
export interface MetadataField {
	aside: boolean
	es_data_type: EsDataType
	id: string
	slug: string
	sortorder: number
	title: string
	type: 'meta' | 'text'
}

export class Project {
	// Description of the project for display purposes only
	description: string

	// Map of entries by XML basename, an XML file can be
	// split in to entries (using this.splitter)
	entries: {
		[basename: string]: XMLio[]
	}

	// List of extractors. An extractor is used to extract
	// items from the text (ie persons, locations, etc)
	extractors: Extractor[]
	id: string

	metadata_fields: MetadataField[]

	// A machine friendly version of the title, all lowercase and no punctuation marks,
	// used as identifier in internal maps and the URL
	slug: string

	// Title of the project for display purposes only
	title: string

	// A function which takes an instance of XMLio and returns a list of Element
	splitter: Splitter

	// Map of XML data associated with the project 
	xml: {
		[basename: string]: XMLData
	}

	// List of user IDs which are part of the project
	userIds: string[]

	// List of XML file basenames. For example ["file1", "file2"] are
	// references to /public/xml/<project-slug/file<n>.xml
	files: string[]

	metadata_extractor: (xmlio: XMLio) => [string, string][]
	facsimile_extractor: FacsimileExtractor
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