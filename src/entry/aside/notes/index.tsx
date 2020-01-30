import * as React from 'react'
import NoteList from "./list"
import { useTextData, Wrapper } from '../list'
import AppContext, { useComponents } from '../../../app-context'

type Props =
	Pick<AppState, 'setEntry'> &
	Pick<EntryState,  'activeNote' | 'layers'> &
	{
		active: boolean
		dispatch: React.Dispatch<EntryStateAction>
		notes: Entry['notes']

	}

function NotesAside(props: Props) {
	const appContext = React.useContext(AppContext)
	const wrapperRef: React.RefObject<HTMLDivElement> = React.useRef()
	const [notesByType, noteTypes, activeNoteType, setActiveType] = useTextData(props.notes, props.activeNote)
	const components = useComponents(DocereComponentContainer.Notes)

	return (
		<Wrapper
			active={props.active}
			ref={wrapperRef}
		>
			{
				noteTypes.map(noteType =>
					<NoteList
						active={activeNoteType === noteType}
						activeNote={props.activeNote}
						components={components}
						config={appContext.config.notes.find(nc => nc.id === noteType)}
						containerHeight={wrapperRef.current.getBoundingClientRect().height}
						dispatch={props.dispatch}
						notesByType={notesByType}
						key={noteType}
						setActiveType={setActiveType}
						setEntry={props.setEntry}
						type={noteType}
					/>
				)
			}
		</Wrapper>

	)
}

export default React.memo(NotesAside)
