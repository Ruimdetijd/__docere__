import * as React from 'react'
import EntityList from "./list"
import { useTextData, Wrapper } from '../list'

type Props =
	Pick<DocereConfigData, 'config'> &
	Pick<EntryState, 'activeEntity' | 'layers'> &
	{
		active: boolean
		dispatch: React.Dispatch<EntryStateAction>
		entities: Entity[]
	}

function EntitiesAside(props: Props) {
	const wrapperRef: React.RefObject<HTMLDivElement> = React.useRef()
	const [entitiesByType, types, activeType, setActiveType] = useTextData(props.entities, props.activeEntity)

	return (
		<Wrapper
			active={props.active}
			ref={wrapperRef}
		>
			{
				types.map((type) =>
					<EntityList
						active={activeType === type}
						activeEntity={props.activeEntity}
						config={props.config.textData.find(td => td.id === type)}
						containerHeight={wrapperRef.current.getBoundingClientRect().height}
						dispatch={props.dispatch}
						entitiesByType={entitiesByType}
						key={type}
						setActiveType={setActiveType}
						type={type}
					/>
				)
			}
		</Wrapper>

	)
}

export default React.memo(EntitiesAside)
