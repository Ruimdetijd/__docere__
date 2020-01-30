type PanelsProps = EntryProps & EntryState & {
	dispatch: React.Dispatch<EntryStateAction>
}

type TextPanelBaseProps = Pick<PanelsProps, 'activeEntity' | 'activeNote' | 'activeFacsimileAreas' | 'activeFacsimilePath' | 'dispatch' | 'entry'>
interface TextPanelProps extends TextPanelBaseProps {
	textLayerConfig: LayerConfig
}

type WitnessAnimationPanelProps = TextPanelProps
