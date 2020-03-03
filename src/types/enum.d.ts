type AsideTab = import('../constants').AsideTab
type SearchTab = import('../constants').SearchTab
type FooterTab = import('../constants').FooterTab

declare const enum Viewport {
	Page,
	Entry,
	EntrySelector
}

declare const enum LayerType {
	Facsimile = 'facsimile',
	Text = 'text',
	WitnessAnimation = 'witness-animation',
	XML = 'xml'
}

declare const enum TextDataExtractionType {
	Attribute = "attribute",
	TextContent = "textcontent",
	Milestone = "milestone",
}

declare const enum DocereComponentContainer {
	Layer = 'layer',
	Notes = 'notes',
	Page = 'page',
}

declare const enum UIComponentType {
	SearchResult = 'search-result'
}
