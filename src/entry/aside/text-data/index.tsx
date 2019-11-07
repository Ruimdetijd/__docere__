import * as React from 'react'
import styled from '@emotion/styled'
import ExtractedItems from "./extracted-items"
import { EntryState } from '../../index'
import { GRAY_DARK } from '../../../constants'

interface WProps { active: boolean }
const Wrapper = styled.div`
	background: ${GRAY_DARK};
	bottom: 0;
	height: 100%;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
	z-index: ${(p: WProps) => p.active ? 1 : -1};
`

interface Props extends WProps, Pick<DocereConfigData, 'config'> {
	activeId: string
	activeListId: string
	activePanels: EntryState['activePanels']
	doc: XMLDocument
	items: any
	onItemClick: SetActiveId
}
interface State {
	containerHeight: number
}
export default class TextDataAside extends React.PureComponent<Props, State> {
	private wrapperRef = React.createRef() as React.RefObject<HTMLDivElement>

	state: State = {
		containerHeight: null,
	}

	componentDidMount() {
		this.setState({
			containerHeight: this.wrapperRef.current.getBoundingClientRect().height,
		})
	}

	render() {
		const textData = (!Array.isArray(this.props.config.textdata) || this.props.items == null) ? [] : this.props.config.textdata

		const activeTextData =	textData.filter(td =>
			td.hasOwnProperty('textLayers') &&
			td.textLayers.some(tl => this.props.activePanels.findIndex(ap => ap.active && ap.id === tl) > -1)
		)

		// TODO if active text data is empty, show layers which contain data

		return (
			<Wrapper
				active={this.props.active}
				ref={this.wrapperRef}
			>
				{
					activeTextData
						.map((data, index) => {
							return (
								<ExtractedItems
									active={this.props.activeListId === data.id || (this.props.activeListId == null && index === 0)}
									activeItemId={this.props.activeId}
									config={this.props.config}
									data={data}
									containerHeight={this.state.containerHeight}
									items={this.props.items[data.id]}
									key={data.id}
									onItemClick={this.props.onItemClick}
									onListClick={() => this.props.onItemClick(null, data.id, null)}
								/>
							)
						})
				}
			</Wrapper>

		)
	}
}
