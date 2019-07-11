import * as React from 'react'
import styled from '@emotion/styled';
import { EntryState } from '../index'
import MetadataAside from './metadata'
import Notes from './notes'
import TextDataAside from './text-data'
import { ASIDE_HANDLE_WIDTH, GRAY_DARK, ASIDE_WIDTH, TOP_OFFSET, AsideTab } from '../../constants'
import Tabs from '../../ui/tabs';

const Wrapper = styled.aside`
	bottom: 0;
	display: grid;
	grid-template-columns: ${ASIDE_HANDLE_WIDTH}px auto;
	height: calc(100vh - ${TOP_OFFSET}px);
	pointer-events: none;
	position: absolute;
	top: 0;
	right: -${ASIDE_WIDTH}px;
	width: ${ASIDE_WIDTH + ASIDE_HANDLE_WIDTH}px;
	z-index: 6000;

	& > * {
		pointer-events: all;
	}
`

const Body = styled.div`
	background-color: ${GRAY_DARK};
	box-sizing: border-box;
	color: #EEE;
	position: relative;
`

function isEmpty(obj: Object) {
	return Object.keys(obj).length === 0
}

interface AsideProps {
	setActiveId: SetActiveId
}
type Props = AppState & EntryState & AsideProps
export default class Aside extends React.PureComponent<Props> {
	render() {
		const hasMetadata = !isEmpty(this.props.metadata)
		const hasTextData = !isEmpty(this.props.textData)
		const hasNotes = !isEmpty(this.props.notes)

		const tabs = []
		if (hasMetadata) tabs.push(AsideTab.Metadata)
		if (hasTextData) tabs.push(AsideTab.TextData)
		if (hasNotes) tabs.push(AsideTab.Notes)

		return (
			<Wrapper>
				<Tabs
					onClick={(tab: AsideTab) => this.props.setAsideTab(tab)}
					tab={this.props.asideTab}
					tabs={tabs}
				/>
				<Body>
					{
						hasMetadata &&
						<MetadataAside
							active={this.props.asideTab === AsideTab.Metadata}
							config={this.props.config}
							metadata={this.props.metadata}
						/>
					}
					{
						hasTextData &&
						<TextDataAside
							active={this.props.asideTab === AsideTab.TextData}
							activeId={this.props.activeId}
							activeListId={this.props.activeListId}
							activePanels={this.props.activePanels}
							config={this.props.config}
							doc={this.props.doc}
							items={this.props.textData}
							onItemClick={this.props.setActiveId}
						/>
					}
					{
						hasNotes &&
						<Notes
							active={this.props.asideTab === AsideTab.Notes}
							activeId={this.props.activeId}
							activeListId={this.props.activeListId}
							activePanels={this.props.activePanels}
							config={this.props.config}
							doc={this.props.doc}
							items={this.props.notes}
							itemsConfig={this.props.config.notes}
							onItemClick={this.props.setActiveId}
						/>
					}
				</Body>
			</Wrapper>
		)
	}
}
