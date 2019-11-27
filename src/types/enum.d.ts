type Viewport = import('../constants').Viewport
type AsideTab = import('../constants').AsideTab
type SearchTab = import('../constants').SearchTab

declare const enum Orientation {
	Horizontal,
	Vertical
}

declare const enum TextLayerType { Facsimile, TextLayer, WitnessAnimation, XML }

// TODO items in enum should be capitalized
declare const enum EsDataType {
	boolean = "boolean",
	date = "date",
	geo_point = "geo_point",
	integer = "integer",
	keyword = "keyword",
	null = "null",
	text = "text",
}

declare const enum TextDataExtractionType {
	Attribute = "attribute",
	TextContent = "textcontent",
	Milestone = "milestone",
}
