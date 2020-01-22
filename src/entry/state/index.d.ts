interface ESA_Entry_Changed extends Pick<EntryState, 'activeFacsimilePath' | 'entry' | 'layers'> {
	type: "ENTRY_CHANGED",
}

interface ESA_Toggle_Layer {
	type: 'TOGGLE_LAYER'
	id: string
}

interface ESA_Toggle_Aside_Tab extends Pick<EntryState, 'asideTab'> {
	type: 'TOGGLE_ASIDE_TAB'
}

interface ESA_Toggle_Footer_Tab extends Pick<EntryState, 'footerTab'> {
	type: 'TOGGLE_FOOTER_TAB'
}

interface ESA_Set_Entity_Id {
	type: 'SET_ENTITY'
	id: string
}

interface ESA_Set_Note_Id {
	type: 'SET_NOTE'
	id: string
}

interface ESA_Set_Active_Facsimile_Path {
	type: 'SET_ACTIVE_FACSIMILE_PATH'
	src: string
}

interface ESA_Set_Facsimile_Areas {
	type: 'SET_FACSIMILE_AREAS'
	ids: string[]
}

type EntryStateAction = 
	ESA_Entry_Changed |
	ESA_Set_Active_Facsimile_Path |
	ESA_Set_Entity_Id |
	ESA_Set_Facsimile_Areas |
	ESA_Set_Note_Id |
	ESA_Toggle_Aside_Tab |
	ESA_Toggle_Footer_Tab |
	ESA_Toggle_Layer
