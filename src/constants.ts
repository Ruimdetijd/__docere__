export const DEFAULT_SPACING = 32

export const RESULT_ASIDE_WIDTH = DEFAULT_SPACING * 5
export const ASIDE_WIDTH = DEFAULT_SPACING * 15
export const ASIDE_HANDLE_HEIGHT = DEFAULT_SPACING * 1.5
export const ASIDE_HANDLE_WIDTH = DEFAULT_SPACING

export const FOOTER_HEIGHT = DEFAULT_SPACING * 5
export const FOOTER_HANDLE_HEIGHT = ASIDE_HANDLE_WIDTH


export const TOPMENU_HEIGHT = DEFAULT_SPACING
export const MAINHEADER_HEIGHT = DEFAULT_SPACING * 2
export const TOP_OFFSET = MAINHEADER_HEIGHT + TOPMENU_HEIGHT

export const TEXT_PANEL_WIDTH = DEFAULT_SPACING * 15

export const GRAY_LIGHT = '#373b47'
export const GRAY_DARK = '#212830'

export const BROWN_LIGHT = '#c7aa71'
export const BROWN_DARK = '#988258'

export enum Colors {
	Green = '#5fb53f',
	Orange = 'orange',
	Blue = '#8080ff',
	Red = '#DB4437'
}

export enum AsideTab {
	Metadata = 'Metadata',
	Notes = 'Notes',
	TextData = 'TextData',
}

export enum FooterTab {
	PanelSelector = 'PanelSelector'
}

export enum SearchTab {
	Search = 'Search',
	Results = 'Results'
}

export enum TabPosition {
	Left, Right, Bottom
}
