interface DCP_Entry_Changed {
	type: 'ENTRY_CHANGED',
	activeFacsimilePath: string
}
interface ESA_Set_Active_Facsimile_Path {
	type: 'SET_ACTIVE_FACSIMILE_PATH'
	src: string
}

interface ESA_Set_Active_Id {
	type: 'SET_ACTIVE_ID'
	id: string
	listId: string
}

interface ESA_Set_Active_List_Id {
	type: 'SET_ACTIVE_LIST_ID'
	id: string
}

type DocereComponentStateAction = 
	DCP_Entry_Changed |
	ESA_Set_Active_Facsimile_Path |
	ESA_Set_Active_Id |
	ESA_Set_Active_List_Id
