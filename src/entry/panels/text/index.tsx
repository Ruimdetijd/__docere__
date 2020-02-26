import * as React from 'react'
import DocereTextView from 'docere-text-view'
import styled from '@emotion/styled'
import { TEXT_PANEL_WIDTH, DEFAULT_SPACING } from '../../../constants'
// @ts-ignore
import debounce from 'lodash.debounce'
import AppContext, { useComponents } from '../../../app/context'
import Minimap from './minimap'

const TopWrapper = styled.div`
	position: relative;
	display: grid;
`
const Wrapper = styled.div`
	display: grid;
	grid-template-columns: auto ${TEXT_PANEL_WIDTH}px auto;
	height: 100%;
	overflow-y: auto;
	will-change: transform;

	& > div:first-of-type {
		grid-column: 2;
	}
`

interface TextProps {
	hasFacs: boolean
}
export const Text = styled.div`
	color: #222;
	counter-reset: linenumber notenumber;
	font-family: serif;
	font-size: 1.25rem;
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
	const [highlightAreas, setHighlightAreas] = React.useState<number[]>([])
	const textLayer = props.entry.layers.find(tl => tl.id === props.textLayerConfig.id)
	const components = useComponents(DocereComponentContainer.Layer, textLayer.id)

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
		config: appContext.config,
		entryDispatch: props.entryDispatch,
		facsimiles: props.entry.facsimiles,
		insideNote: false,
		textLayerId: props.textLayerConfig.id
	}

	if (components == null) return null

	return (
		<TopWrapper>
			<Wrapper
				ref={textWrapperRef}
				onScroll={handleScroll}
			>
				<Text 
					hasFacs={props.entry.facsimiles.length > 0}
				>
					<DocereTextView
						customProps={customProps}
						components={components}
						highlight={props.searchQuery}
						node={textLayer.element}
						setHighlightAreas={setHighlightAreas}
					/>
				</Text>
			</Wrapper>
			<Minimap
				activeAreaRef={activeAreaRef}
				highlightAreas={highlightAreas}
				textWrapperRef={textWrapperRef}
			/>
		</TopWrapper>
	)
}

export default React.memo(TextPanel)

// class TextPanel extends React.PureComponent<TextPanelProps> {
	// async componentDidMount() {
	// 	if (this.props.searchQuery != null) this.setHighlight()
	// }

	// componentDidUpdate(prevProps: TextPanelProps) {
	// 	if (prevProps.highlight.length && !this.props.highlight.length) {
	// 		for (const el of this.textRef.current.querySelectorAll('mark')) {
	// 			el.replaceWith(...el.childNodes)
	// 		} 
	// 	}
	// 	if (prevProps.searchQuery !== this.props.searchQuery) this.setHighlight()
	// }

	// private async setHighlight() {
	// 	const response = await fetchPost(`/search/${this.props.configData.config.slug}/_search`, {
	// 		_source: false,
	// 		query: {
	// 			bool: {
	// 				must: [
	// 					{
	// 						query_string: {
	// 							query: this.props.searchQuery
	// 						}
	// 					},
	// 					{
	// 						match: {
	// 							id: this.props.entry.id
	// 						}
	// 					}
	// 				]
	// 			}
	// 		},
	// 		highlight: {
	// 			fields: {
	// 				text: {}
	// 			},
	// 			require_field_match: false,
	// 			fragment_size: 0,
	// 			number_of_fragments: 1000
	// 		}
	// 	})

	// 	let hits = []
	// 	if (!response.hasOwnProperty('error') && response.hits.hits.length) {
	// 		hits = response.hits.hits[0].highlight.text.reduce((set: Set<string>, hit: string) => {
	// 			hit = hit.slice(hit.indexOf('<em>') + 4, hit.indexOf('</em>'))
	// 			set.add(hit)
	// 			return set
	// 		}, new Set())
	// 	}

	// 	this.setState({ highlight: [...hits] })
	// }
// }

// export default TextPanel
