type Viewport = import('../constants').Viewport
type AsideTab = import('../constants').AsideTab
type SearchTab = import('../constants').SearchTab
type FooterTab = import('../constants').FooterTab

declare const enum Orientation {
	Horizontal,
	Vertical
}

declare const enum LayerType { Facsimile, Text, WitnessAnimation, XML }

declare const enum TextDataExtractionType {
	Attribute = "attribute",
	TextContent = "textcontent",
	Milestone = "milestone",
}
