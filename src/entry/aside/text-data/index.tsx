import * as React from 'react'
import styled from '@emotion/styled'
import ExtractedItems from "./extracted-items"
import 'docere-config'
import { EntryState } from '../../index'
import { GRAY_DARK } from '../../../constants';

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

interface Props extends WProps, Pick<AppState, 'config' | 'extractTextData'> {
	activeId: string
	activeListId: string
	activePanels: EntryState['activePanels']
	doc: XMLDocument
	onItemClick: (activeListId: string, activeItemId: string) => void
}
interface State {
	containerHeight: number
	items: ExtractedTextData
}
export default class TextDataAside extends React.PureComponent<Props, State> {
	private wrapperRef = React.createRef() as React.RefObject<HTMLDivElement>

	state: State = {
		containerHeight: null,
		items: null,
	}

	componentDidMount() {
		this.setState({
			containerHeight: this.wrapperRef.current.getBoundingClientRect().height,
			items: this.props.extractTextData(this.props.doc, this.props.config)
		})
	}

	render() {
		const textData = (!Array.isArray(this.props.config.textdata) || this.state.items == null) ? [] : this.props.config.textdata

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
						.map((data) => {
							return (
								<ExtractedItems
									active={this.props.activeListId === data.id}
									activeItemId={this.props.activeId}
									config={this.props.config}
									data={data}
									containerHeight={this.state.containerHeight}
									items={this.state.items[data.id]}
									key={data.id}
									onItemClick={this.props.onItemClick}
									onListClick={() => this.props.onItemClick(data.id, null)}
								/>
							)
						})
				}
			</Wrapper>

		)
	}
}
