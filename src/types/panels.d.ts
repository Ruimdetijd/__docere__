type PanelsProps = EntryProps & EntryState & {
	setActiveId: SetActiveId
	setActiveFacsimile: (path: string) => void
}
interface PanelsState {
	customProps: DocereComponentProps
	facsimileAreas: FacsimileArea[]
	highlight: string[]
}
type TextPanelBaseProps = Pick<PanelsProps, 'configData' | 'entry' | 'hasScroll' | 'searchQuery'> & Pick<PanelsState, 'highlight'>
interface TextPanelProps extends TextPanelBaseProps {
	customProps: DocereComponentProps
	textLayerConfig: TextLayerConfig
}

type WitnessAnimationPanelProps = Omit<TextPanelProps, 'customProps' | 'highlight' | 'searchQuery'> & Pick<PanelsProps, 'setActiveFacsimile'>
