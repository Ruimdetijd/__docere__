import * as React from 'react'
import styled from '@emotion/styled'
import { FOOTER_HEIGHT, TabPosition, FOOTER_HANDLE_HEIGHT, DEFAULT_SPACING, FooterTab } from '../../constants'
import Tabs from '../../ui/tabs'

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
	justify-content: center;
	padding: ${DEFAULT_SPACING/2}px;
`

const PanelList = styled.ul``

const PanelItemWrapper = styled.li`
	color: ${(p: PIWProps) => p.active ? '#EEE' : '#444'};
	cursor: pointer;
	margin-right: 1em;
	white-space: nowrap;
    display: inline-block;
    height: 100%;
    width: 100px;
	
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
	textLayer: LayerConfig
	togglePanel: (ev: React.MouseEvent<HTMLLIElement>) => void
}
function PanelItem(props: PIProps) {
	return (
		<PanelItemWrapper
			active={props.textLayer.active}
			onClick={props.togglePanel}
		>
			<div>{props.textLayer.title.slice(0, 1)}</div>
			<div>{props.textLayer.title}</div>
		</PanelItemWrapper>
	)
}

interface Props {
	footerTab: EntryState['footerTab']
	layers: EntryState['layers']
	dispatch: React.Dispatch<EntryStateAction>
}
function Footer(props: Props) {
	const handleTabClick = React.useCallback(footerTab => {
		props.dispatch({ type: 'SET_FOOTER_TAB', footerTab })			
	}, [])

	const togglePanel = React.useCallback(ev => {
		props.dispatch({ type: 'TOGGLE_LAYER' , id: ev.currentTarget.dataset.id })			
	}, [])

	return (
		<Wrapper>
			<Tabs
				data-tab={props.footerTab}
				onClick={handleTabClick}
				position={TabPosition.Bottom}
				tab={props.footerTab}
				tabs={[FooterTab.PanelSelector]}
			/>
			<Body>
				<PanelList>
					{
						props.layers.map(tl =>
							<PanelItem
								data-id={tl.id}
								key={tl.id}
								textLayer={tl}
								togglePanel={togglePanel}
							/>
						)
					}
				</PanelList>
			</Body>
		</Wrapper>
	)
}

export default React.memo(Footer)
