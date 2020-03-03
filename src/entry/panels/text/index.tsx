import * as React from 'react'
import DocereTextView from 'docere-text-view'
import styled from '@emotion/styled'
import { DEFAULT_SPACING, TEXT_VIEW_WIDTH } from '../../../constants'
// @ts-ignore
import debounce from 'lodash.debounce'
import AppContext, { useComponents } from '../../../app/context'
import Minimap from './minimap'
import { isTextLayer, getTextPanelWidth } from '../../../utils'

const TopWrapper = styled.div`
	position: relative;
`

interface WProps { layer: TextLayer }
const Wrapper = styled.div`
	display: grid;
	grid-template-columns: ${DEFAULT_SPACING}px ${(props: WProps) => getTextPanelWidth(props.layer)}px ${DEFAULT_SPACING}px;
	height: 100%;
	overflow-y: auto;
	will-change: transform;

	& > div:first-of-type {
		grid-column: 2;
	}
`

interface TextProps {
	hasFacs: boolean
	layer: TextLayer
}
export const Text = styled.div`
	color: #222;
	counter-reset: linenumber notenumber;
	font-family: serif;
	font-size: 1.25rem;
	display: grid;
	grid-template-columns: ${TEXT_VIEW_WIDTH}px ${props => props.layer.asideActive ? TEXT_VIEW_WIDTH / 2 : 0}px;
	line-height: 2rem;
	padding-top: ${DEFAULT_SPACING}px;
	padding-left: ${(props: TextProps) => props.hasFacs ? DEFAULT_SPACING * 2.5 : 0}px;
	padding-bottom: 200px;
	position: relative;
`

function TextPanel(props: TextPanelProps) {
	const appContext = React.useContext(AppContext)
	const textWrapperRef = React.useRef<HTMLDivElement>()
	const activeAreaRef = React.useRef<HTMLDivElement>()
	const [docereTextViewReady, setDocereTextViewReady] = React.useState(false)
	const [highlightAreas, setHighlightAreas] = React.useState<number[]>([])
	const layer = props.entry.layers.filter(isTextLayer).find(tl => tl.id === props.layer.id)
	const components = useComponents(DocereComponentContainer.Layer, layer.id)

	const handleScroll = React.useCallback(() => {
		const resetActiveArea = debounce(() => {
			activeAreaRef.current.classList.remove('active')
		}, 1000)

		const { scrollTop, scrollHeight, clientHeight } = textWrapperRef.current

		if (scrollHeight / 10 > clientHeight) {
			const maxScrollTopActiveArea = (scrollHeight/10) - clientHeight + 32
			const maxScrollTopOriginal = scrollHeight - clientHeight
			const perc = scrollTop / maxScrollTopOriginal
			activeAreaRef.current.parentElement.scrollTop = maxScrollTopActiveArea * perc
		}

		activeAreaRef.current.classList.add('active')
		activeAreaRef.current.style.transform = `translateY(${(scrollTop / 10)}px)`

		resetActiveArea()
	}, [])

	const customProps: DocereComponentProps = {
		activeFacsimileAreas: props.activeFacsimileAreas,
		activeFacsimile: props.activeFacsimile,
		activeEntity: props.activeEntity,
		activeNote: props.activeNote,
		appDispatch: props.appDispatch,
		components,
		config: appContext.config,
		entry: props.entry,
		entryDispatch: props.entryDispatch,
		insideNote: false,
		layer: props.layer
	}

	if (components == null) return null

	return (
		<TopWrapper>
			<Wrapper
				layer={props.layer}
				onScroll={handleScroll}
				ref={textWrapperRef}
			>
				<Text 
					hasFacs={props.entry.facsimiles.length > 0}
					layer={props.layer}
				>
					<DocereTextView
						customProps={customProps}
						components={components}
						highlight={props.searchQuery}
						onLoad={setDocereTextViewReady}
						node={layer.element}
						setHighlightAreas={setHighlightAreas}
					/>
				</Text>
			</Wrapper>
			<Minimap
				activeAreaRef={activeAreaRef}
				highlightAreas={highlightAreas}
				isReady={docereTextViewReady}
				textWrapperRef={textWrapperRef}
			/>
		</TopWrapper>
	)
}

export default React.memo(TextPanel)
