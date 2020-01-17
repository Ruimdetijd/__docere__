interface ESA_Entry_Changed {
	type: "ENTRY_CHANGED",
	activeFacsimilePath: string
	layers: EntryState['layers']
}

interface ESA_Toggle_Layer {
	type: 'TOGGLE_LAYER'
	id: string
}

interface ESA_Set_Aside_Tab {
	type: 'SET_ASIDE_TAB'
	asideTab: EntryState['asideTab']
}

interface ESA_Set_Footer_Tab {
	type: 'SET_FOOTER_TAB'
	footerTab: EntryState['footerTab']
}

interface ESA_Set_Text_Data_Id {
	type: 'SET_TEXT_DATA_ID'
	id: string
	listId: string
}

interface ESA_Set_Note_Id {
	type: 'SET_NOTE_ID'
	id: string
	listId?: string
}

interface ESA_Set_Active_List_Id {
	type: 'SET_ACTIVE_LIST_ID'
	id: string
}

interface ESA_Set_Active_Facsimile_Path {
	type: 'SET_ACTIVE_FACSIMILE_PATH'
	src: string
}

interface ESA_Set_Facsimile_Areas {
	type: 'SET_FACSIMILE_AREAS'
	facsimileAreas: FacsimileArea[]
}

type EntryStateAction = 
	ESA_Entry_Changed |
	ESA_Set_Active_Facsimile_Path |
	ESA_Set_Active_List_Id |
	ESA_Set_Aside_Tab |
	ESA_Set_Facsimile_Areas |
	ESA_Set_Footer_Tab |
	ESA_Set_Note_Id |
	ESA_Set_Text_Data_Id |
	ESA_Toggle_Layer
