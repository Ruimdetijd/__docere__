import * as React from 'react'
import { EntryState } from '../index'
import styled from '@emotion/styled';
import { FOOTER_HEIGHT, Viewport, TabPosition, FOOTER_HANDLE_HEIGHT, DEFAULT_SPACING } from '../../constants';
import Tabs from '../../ui/tabs';

const Wrapper = styled.footer`
	bottom: -${FOOTER_HEIGHT}px;
	display: grid;
	grid-template-rows: ${FOOTER_HANDLE_HEIGHT}px auto;
	height: ${FOOTER_HEIGHT + FOOTER_HANDLE_HEIGHT}px;
	left: 0;
	pointer-events: none;
	position: absolute;
	right: 0;
	z-index: 6001;

	& > * {
		pointer-events: all;
	}
`

const Body = styled.div`
	background-color: black;
	color: white;
	display: grid;
	grid-template-columns: 1fr 1fr;
	padding: ${DEFAULT_SPACING/2}px;
`
const PanelList = styled.ul`
`
const PanelItemWrapper = styled.li`
	color: ${(p: PIWProps) => p.active ? '#EEE' : '#444'};
	cursor: pointer;
    height: 100%;
    width: 100px;
    display: inline-block;
    margin-right: 1em;
	
	& > div:first-of-type {
		align-content: center;
		border-radius: 1rem;
		border: 4px ${(p: PIWProps) => p.active ? 'solid #EEE' : 'dashed #444'};
		box-sizing: border-box;
		display: grid;
		font-size: 2em;
		height: 70%;
		justify-content: center;
		width: 100%;
	}

	& > div:last-of-type {
		display: grid;
		height: 30%;
		justify-content: center;
		align-content: center;
	}
`

interface PIWProps {
	active: boolean
}
interface PIProps {
	textLayer: TextLayerConfig
	togglePanel: EntryState['togglePanel']
}
function PanelItem(props: PIProps) {
	return (
		<PanelItemWrapper
			active={props.textLayer.active}
			onClick={() => props.togglePanel(props.textLayer.id)}
		>
			<div>{props.textLayer.title.slice(0, 1)}</div>
			<div>{props.textLayer.title}</div>
		</PanelItemWrapper>
	)
}

type Props = AppState & EntryState
class Footer extends React.PureComponent<Props> {
	render() {
		return (
			<Wrapper>
				<Tabs
					position={TabPosition.Bottom}
					setAppState={this.props.setAppState}
					tabs={[Viewport.PanelSelector]}
					viewport={this.props.viewport}
				/>
				<Body>
					<PanelList>
						{
							this.props.activePanels.map(tl =>
								<PanelItem
									key={tl.id}
									textLayer={tl}
									togglePanel={this.props.togglePanel}
								/>
							)
						}
					</PanelList>
				</Body>
			</Wrapper>
		)
	}
}

export default Footer