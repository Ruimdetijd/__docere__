import * as React from 'react'
import DocereTextView from 'docere-text-view'
import { Text } from '../index.components'
import { PanelsProps, PanelsState } from './index'
import styled from '@emotion/styled'
import { TEXT_PANEL_WIDTH } from '../../constants'

const Wrapper = styled.div`
	grid-template-rows: auto 50px;
	height: 100%;
`

// TODO merge with TextWrapper from index.components.tsx?
const TextWrapper = styled.div`
	display: grid;
	grid-template-columns: auto ${TEXT_PANEL_WIDTH}px auto;
	height: calc(100% - 50px);
	overflow-y: auto;
`

const Controls = styled.div`
	background: black;
	color: white;
	height: 50px;
`

const Markers = styled.ul`
	display: grid;
	grid-template-columns: ${(props: { count: number }) => `repeat(${props.count + 1}, 1fr);`}
`

const Marker = styled.li`
	background: ${(props: any) => props.active ? 'white' : 'gray'};
	cursor: pointer;
	display: inline-block;
	height: 25px;
	justify-self: right;
	margin-top: 4px;
	width: ${(props: any) => props.active ? 12 : 4}px;
`

interface Props extends PanelsProps, PanelsState {
	customProps: DocereComponentProps
	textLayerConfig: TextLayerConfig
}
interface State {
	textLayer: TextLayerConfig
	prevTextLayer: TextLayerConfig
	textLayers: TextLayerConfig[]
}
export default class WitnessAnimationPanel extends React.PureComponent<Props, State> {
	private textRef: React.RefObject<HTMLDivElement>
	private interval: any

	// TODO move to constructor
	state: State = {
		prevTextLayer: null,
		textLayer: this.props.entry.textLayers.filter(tl => tl.type === TextLayerType.TextLayer)[0],
		textLayers: this.props.entry.textLayers.filter(tl => tl.type === TextLayerType.TextLayer)
	}

	componentDidMount() {
		let i = 0
		this.interval = setInterval(() => {
			if (i < this.state.textLayers.length) {
				this.setActiveTextLayer(this.state.textLayers[i].id)
			} else {
				clearInterval(this.interval)
			}
			i++
		}, 4000)
	}

	render() {
		// const textLayer = this.props.entry.textLayers.find(tl => tl.id === this.props.textLayerConfig.id)
		// if (textLayer == null) return null

		return (
			<Wrapper>
				<TextWrapper>
					<Text 
						hasLb={this.props.configData.components.hasOwnProperty('lb')}
						hasFacs={this.props.configData.extractFacsimiles != null}
						hasScroll={this.props.hasScroll}
						ref={this.textRef}
						wordwrap={this.props.wordwrap}
					>
						<DocereTextView
							customProps={{
								...this.props.customProps,
								prevTextLayer: this.state.prevTextLayer?.id,
								textLayer: this.state.textLayer.id
							}}
							components={this.props.configData.components}
							node={this.props.entry.textLayers[3].element}
							highlight={this.props.highlight}
						/>
					</Text>
				</TextWrapper>
				<Controls>
					<Markers count={this.state.textLayers.length}>
						{
							this.state.textLayers.map((tl, index) => 
								<Marker
									active={this.state.textLayer.id === tl.id}
									key={index}
									onClick={() => {
										this.setActiveTextLayer(tl.id)
									}}
								/>
							)
						}
					</Markers>
				</Controls>
			</Wrapper>
		)
	}

	private setActiveTextLayer(textLayerId: string) {
		const index = this.state.textLayers.findIndex(tl => tl.id === textLayerId)
		const textLayer = this.state.textLayers[index]
		const firstFacs = this.props.entry.facsimiles.find(f => f.id === `${textLayer.id}-1`.toLowerCase())
		if (firstFacs) this.props.setActiveFacsimile(firstFacs.path[0])
		this.setState({
			prevTextLayer: this.state.textLayers[index - 1],
			textLayer
		})
	}
}


				// <Menu>
				// 	<div>
						
				// 	</div>
				// 	<div>
				// 		<a
				// 			download="test.xml"
				// 			href={getEntryXmlPath(this.props.config.slug, this.props.entryId)}
				// 		>
				// 			<img src="https://tei-c.org/Vault/Logos/TEIlogo.svg" width="32px" />
				// 		</a>
				// 		{
				// 			this.props.components.hasOwnProperty('lb') &&
				// 			<WordWrapButton
				// 				onClick={this.props.toggleWordWrap}
				// 				wordwrap={this.props.wordwrap}
				// 			/>
				// 		}
				// 		<OrientationButton
				// 			onClick={this.props.togglePanelOrientation}
				// 			orientation={this.props.orientation}
				// 		/>
				// 	</div>
				// </Menu>