import * as React from 'react'
import styled from '@emotion/styled';
import MetadataAside from './metadata'
import NotesAside from './notes'
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

function Aside(props: EntryAsideProps) {
	if (props.entry == null) return

	const hasMetadata = !isEmpty(props.entry.metadata)
	const hasEntities = props.entry.entities.length > 0
	const hasNotes = !isEmpty(props.entry.notes)

	const tabs = []
	if (hasMetadata) tabs.push(AsideTab.Metadata)
	if (hasEntities) tabs.push(AsideTab.TextData)
	if (hasNotes) tabs.push(AsideTab.Notes)

	return (
		<Wrapper>
			<Tabs
				onClick={(tab: AsideTab) => props.dispatch({ type: 'TOGGLE_ASIDE_TAB', asideTab: tab })}
				tab={props.asideTab}
				tabs={tabs}
			/>
			<Body>
				{
					hasMetadata &&
					<MetadataAside
						active={props.asideTab === AsideTab.Metadata}
						metadata={props.entry.metadata}
					/>
				}
				{
					hasEntities &&
					<TextDataAside
						active={props.asideTab === AsideTab.TextData}
						activeEntity={props.activeEntity}
						dispatch={props.dispatch}
						layers={props.layers}
						entities={props.entry.entities}
					/>
				}
				{
					hasNotes &&
					<NotesAside
						active={props.asideTab === AsideTab.Notes}
						activeNote={props.activeNote}
						dispatch={props.dispatch}
						layers={props.layers}
						notes={props.entry.notes}
						setEntry={props.setEntry}
					/>
				}
			</Body>
		</Wrapper>
	)
}

export default React.memo(Aside)
