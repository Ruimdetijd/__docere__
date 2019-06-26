import * as React from 'react'
import styled from '@emotion/styled';
import { EntryState } from '../index'
import MetadataAside from './metadata'
import Notes from './notes'
import TextDataAside from './text-data'
import { ASIDE_HANDLE_WIDTH, GRAY_DARK, ASIDE_WIDTH, TOP_OFFSET, Viewport } from '../../constants'
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

interface AsideProps {
	setActiveId: (activeListId: string, activeItemId: string) => void
}
type Props = AppState & EntryState & AsideProps
export default class Aside extends React.Component<Props> {
	render() {
		const notes: ExtractedNotes = this.props.extractNotes(this.props.doc)
		return (
			<Wrapper>
				<Tabs
					tabs={[Viewport.Metadata, Viewport.TextData, Viewport.Notes]}
					viewport={this.props.viewport}
					setAppState={this.props.setAppState}
				/>
				<Body>
					<MetadataAside
						active={this.props.viewport === Viewport.Metadata}
						config={this.props.config}
						metadata={this.props.metadata}
					/>
					<TextDataAside
						active={this.props.viewport === Viewport.TextData}
						activeId={this.props.activeId}
						activeListId={this.props.activeListId}
						activePanels={this.props.activePanels}
						config={this.props.config}
						doc={this.props.doc}
						extractTextData={this.props.extractTextData}
						onItemClick={this.props.setActiveId}
					/>
					<Notes
						active={this.props.viewport === Viewport.Notes}
						activeId={this.props.activeId}
						activeListId={this.props.activeListId}
						activePanels={this.props.activePanels}
						config={this.props.config}
						doc={this.props.doc}
						items={notes}
						itemsConfig={this.props.config.notes}
						onItemClick={this.props.setActiveId}
					/>
				</Body>
			</Wrapper>
		)
	}
}
