import * as React from 'react'
import DocereTextView from 'docere-text-view'
import styled from '@emotion/styled'
import { TEXT_PANEL_WIDTH, DEFAULT_SPACING } from '../../constants'
// @ts-ignore
import debounce from 'lodash.debounce'
import AppContext, { useComponents } from '../../app-context'

const TopWrapper = styled.div`
	position: relative;
	display: grid;

	& > div.minimap {
		bottom: 0;
		box-sizing: border-box;
		left: calc(100% - ((100% - 480px) / 2) + 32px);
		overflow: auto;
		padding-top: 32px;
		position: absolute;
		top: 0;
		width: 48px;
		scrollbar-width: none;
		pointer-events: none;

		&::-webkit-scrollbar {
			display: none;
		}

		& > div:nth-of-type(2) {
			box-sizing: border-box;
			transform: scaleX(.1) scaleY(.1);
			transform-origin: top left;
			width: 480px;
		}
	}
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

const MiniMap = React.memo(
	(props: any) => (
		<div
			className="minimap"
			onWheel={() => false}
		>
			<ActiveArea ref={props.activeAreaRef} />
			{props.text}
		</div>
	),
	() => true
)

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

const activeAreaRGB = '200, 200, 200'

const ActiveArea = styled.div`
	background: rgba(${activeAreaRGB}, 0);
	position: absolute;
	width: 100%;
	transition: background 600ms;
`

function TextPanel(props: TextPanelProps) {
	const appContext = React.useContext(AppContext)
	const textWrapperRef = React.useRef<HTMLDivElement>()
	const activeAreaRef = React.useRef<HTMLDivElement>()
	const textLayer = props.entry.textLayers.find(tl => tl.id === props.textLayerConfig.id)
	const components = useComponents(DocereComponentContainer.Layer, textLayer.id)

	const resetActiveArea = debounce(() => {
		activeAreaRef.current.style.background = `rgba(${activeAreaRGB}, 0)`
	}, 1000)

	const handleScroll = React.useCallback(() => {
		const { scrollTop, scrollHeight, clientHeight } = textWrapperRef.current

		if (scrollHeight / 10 > clientHeight) {
			const maxScrollTopActiveArea = (scrollHeight/10) - clientHeight + 32
			const maxScrollTopOriginal = scrollHeight - clientHeight
			const perc = scrollTop / maxScrollTopOriginal
			activeAreaRef.current.parentElement.scrollTop = maxScrollTopActiveArea * perc
		}

		if (activeAreaRef.current.style.height === '') {
			activeAreaRef.current.style.height = textWrapperRef.current.clientHeight / 10 + 'px'
		}
		activeAreaRef.current.style.background = `rgba(${activeAreaRGB}, 0.5)`
		activeAreaRef.current.style.transform = `translateY(${(scrollTop / 10)}px)`

		resetActiveArea()
	}, [])

	const customProps: DocereComponentProps = {
		activeFacsimileAreas: props.activeFacsimileAreas,
		activeFacsimilePath: props.activeFacsimilePath,
		activeEntity: props.activeEntity,
		activeNote: props.activeNote,
		config: appContext.config,
		dispatch: props.dispatch,
		facsimiles: props.entry.facsimiles,
		insideNote: false,
		textLayerId: props.textLayerConfig.id
	}

	const text = (
		<Text 
			hasFacs={props.entry.facsimiles.length > 0}
		>
			<DocereTextView
				customProps={customProps}
				components={components}
				node={textLayer.element}
			/>
		</Text>
	)

	return (
		<TopWrapper>
			<Wrapper
				ref={textWrapperRef}
				onScroll={handleScroll}
			>
				{text}
			</Wrapper>
			<MiniMap
				activeAreaRef={activeAreaRef}
				text={text}
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
