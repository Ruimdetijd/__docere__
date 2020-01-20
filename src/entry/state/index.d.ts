interface ESA_Entry_Changed extends Pick<EntryState, 'activeFacsimilePath' | 'entry' | 'layers'> {
	type: "ENTRY_CHANGED",
}

interface ESA_Toggle_Layer {
	type: 'TOGGLE_LAYER'
	id: string
}

interface ESA_Set_Aside_Tab extends Pick<EntryState, 'asideTab'> {
	type: 'SET_ASIDE_TAB'
}

interface ESA_Set_Footer_Tab extends Pick<EntryState, 'footerTab'> {
	type: 'SET_FOOTER_TAB'
}

interface ESA_Set_Active_Id extends Pick<EntryState, 'activeId' | 'activeListId' | 'asideTab'> {
	type: 'SET_ACTIVE_ID'
}

interface ESA_Set_Text_Data_Id extends Pick<EntryState, 'activeId' | 'activeListId'> {
	type: 'SET_TEXT_DATA_ID'
}

interface ESA_Set_Note_Id extends Pick<EntryState, 'activeId' | 'activeListId'> {
	type: 'SET_NOTE_ID'
}

interface ESA_Set_Active_List_Id extends Pick<EntryState, 'activeListId'> {
	type: 'SET_ACTIVE_LIST_ID'
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
	ESA_Set_Active_Id |
	ESA_Set_Active_List_Id |
	ESA_Set_Aside_Tab |
	ESA_Set_Facsimile_Areas |
	ESA_Set_Footer_Tab |
	ESA_Set_Note_Id |
	ESA_Set_Text_Data_Id |
	ESA_Toggle_Layer
