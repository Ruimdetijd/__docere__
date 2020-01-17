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
	const hasTextData = props.entry.textData.size > 0
	const hasNotes = !isEmpty(props.entry.notes)

	const tabs = []
	if (hasMetadata) tabs.push(AsideTab.Metadata)
	if (hasTextData) tabs.push(AsideTab.TextData)
	if (hasNotes) tabs.push(AsideTab.Notes)

	return (
		<Wrapper>
			<Tabs
				onClick={(tab: AsideTab) => props.entryStateDispatch({ type: 'SET_ASIDE_TAB', asideTab: tab })}
				tab={props.asideTab}
				tabs={tabs}
			/>
			<Body>
				{
					hasMetadata &&
					<MetadataAside
						active={props.asideTab === AsideTab.Metadata}
						config={props.configData.config}
						metadata={props.entry.metadata}
					/>
				}
				{
					hasTextData &&
					<TextDataAside
						active={props.asideTab === AsideTab.TextData}
						activeId={props.activeId}
						activeListId={props.activeListId}
						dispatch={props.entryStateDispatch}
						layers={props.layers}
						config={props.configData.config}
						textData={props.entry.textData}
					/>
				}
				{
					hasNotes &&
					<NotesAside
						active={props.asideTab === AsideTab.Notes}
						activeId={props.activeId}
						activeListId={props.activeListId}
						dispatch={props.entryStateDispatch}
						layers={props.layers}
						configData={props.configData}
						items={props.entry.notes}
						setEntry={props.setEntry}
					/>
				}
			</Body>
		</Wrapper>
	)
}

export default React.memo(Aside)
