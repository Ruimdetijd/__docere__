import * as React from 'react'
import NoteList from "./list"
import { useTextData, Wrapper } from '../list'

type Props =
	Pick<AppState, 'setEntry' | 'configData'> &
	Pick<EntryState,  'activeNote' | 'layers'> &
	{
		active: boolean
		dispatch: React.Dispatch<EntryStateAction>
		notes: Entry['notes']

	}

function NotesAside(props: Props) {
	const wrapperRef: React.RefObject<HTMLDivElement> = React.useRef()
	const [notesByType, types, activeType, setActiveType] = useTextData(props.notes, props.activeNote)

	return (
		<Wrapper
			active={props.active}
			ref={wrapperRef}
		>
			{
				types.map(type =>
					<NoteList
						active={activeType === type}
						activeNote={props.activeNote}
						components={props.configData.components}
						config={props.configData.config.notes.find(nc => nc.id === type)}
						containerHeight={wrapperRef.current.getBoundingClientRect().height}
						dispatch={props.dispatch}
						notesByType={notesByType}
						key={type}
						setActiveType={setActiveType}
						setEntry={props.setEntry}
						type={type}
					/>
				)
			}
		</Wrapper>

	)
}

export default React.memo(NotesAside)
