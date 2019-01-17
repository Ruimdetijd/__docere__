export const defaultEditorOptions = {
	lineNumbers: 'off' as 'off',
	readOnly: true,
	scrollBeyondLastLine: false,
	wordWrap: 'on' as 'on'
}

export default {
	xml: {
		...defaultEditorOptions,
		language: 'xml',
	},
	data: {
		...defaultEditorOptions,
		language: 'json',
		wordWrap: 'off' as 'off'
	},

	text: {
		...defaultEditorOptions,
		language: 'plaintext',
	}
}