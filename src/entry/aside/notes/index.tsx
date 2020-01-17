import * as React from 'react'
import styled from '@emotion/styled'
import Notes from "./notes"
import { GRAY_DARK } from '../../../constants'

const Wrapper = styled.div`
	background: ${GRAY_DARK};
	bottom: 0;
	height: 100%;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
	z-index: ${(p: Pick<Props, 'active'>) => p.active ? 1 : -1};
`

type Props =
	Pick<AppState, 'setEntry' | 'configData'> &
	Pick<EntryState,  'activeId' | 'activeListId' | 'layers'> &
	{
		active: boolean
		dispatch: React.Dispatch<EntryStateAction>
		items: Entry['notes']

	}

interface State {
	containerHeight: number
}
// TODO remove class
export default class NotesAside extends React.PureComponent<Props, State> {
	private wrapperRef = React.createRef() as React.RefObject<HTMLDivElement>

	state: State = {
		containerHeight: null,
	}

	async componentDidMount() {
		this.setState({
			containerHeight: this.wrapperRef.current.getBoundingClientRect().height,
		})
	}

	render() {
		return (
			<Wrapper
				active={this.props.active}
				ref={this.wrapperRef}
			>
				{
					this.props.configData.config.notes
						.map((itemConfig, index) => {
							return (
								<Notes
									active={this.props.activeListId === itemConfig.id || (this.props.activeListId == null && index === 0)}
									activeItemId={this.props.activeId}
									components={this.props.configData.components}
									config={this.props.configData.config}
									containerHeight={this.state.containerHeight}
									dispatch={this.props.dispatch}
									itemConfig={itemConfig}
									items={this.props.items}
									itemsConfig={this.props.configData.config.notes}
									key={itemConfig.id}
									setEntry={this.props.setEntry}
								/>
							)
						})
				}
			</Wrapper>

		)
	}
}
