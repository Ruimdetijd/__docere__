import * as React from 'react'
import styled from '@emotion/styled'
import TextDataList from "./list"
import { GRAY_DARK } from '../../../constants'

// TODO if active text data is empty, show layers which contain data

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
	activeId: EntryState['activeId']
	activeListId: EntryState['activeListId']
	dispatch: React.Dispatch<EntryStateAction>
	layers: EntryState['layers']
	textData: ExtractedTextData
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
		const listIds = Array.from(this.props.textData.keys())

		return (
			<Wrapper
				active={this.props.active}
				ref={this.wrapperRef}
			>
				{
					listIds
						.map((listId, index) => {
							return (
								<TextDataList
									active={this.props.activeListId === listId || (this.props.activeListId == null && index === 0)}
									activeItemId={this.props.activeId}
									config={this.props.config.textData.find(td => td.id === listId)}
									containerHeight={this.state.containerHeight}
									dispatch={this.props.dispatch}
									items={this.props.textData.get(listId)}
									key={listId}
									listCount={listIds.length}
									listId={listId}
								/>
							)
						})
				}
			</Wrapper>

		)
	}
}
