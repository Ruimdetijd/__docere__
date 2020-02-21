type PanelsProps = EntryProps & EntryState & {
	entryDispatch: React.Dispatch<EntryStateAction>
}

type TextPanelBaseProps = Pick<PanelsProps, 'activeEntity' | 'activeNote' | 'activeFacsimile' | 'activeFacsimileAreas' | 'appDispatch' | 'entryDispatch' | 'entry' | 'searchQuery'>
interface TextPanelProps extends TextPanelBaseProps {
	textLayerConfig: LayerConfig
}

type WitnessAnimationPanelProps = TextPanelProps
