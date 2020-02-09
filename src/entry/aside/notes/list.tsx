import * as React from 'react'
import AsideList from '../list'
import Note from './note'

interface Props {
	active: boolean
	activeNote: EntryState['activeNote']
	components: DocereComponents
	config: NotesConfig
	containerHeight: number
	entryDispatch: React.Dispatch<EntryStateAction>
	notesByType: Map<string, Note[]>
	setActiveType: (type: string) => void
	type: string
}
function NotesList(props: Props) {
	const notes = props.notesByType.get(props.type)

	return (
		<AsideList
			active={props.active}
			config={props.config}
			containerHeight={props.containerHeight}
			itemCount={notes.length}
			setActiveType={props.setActiveType}
			type={props.type}
			typeCount={props.notesByType.size}
		>
			{
				notes.map(note =>
					<Note
						active={note.id === props.activeNote?.id}
						components={props.components}
						entryDispatch={props.entryDispatch}
						item={note}
						key={note.id}
						listId={props.type}
					/>
				)
			}
		</AsideList>
	)
}

export default React.memo(NotesList)
