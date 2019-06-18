import styled from '@emotion/styled';

export const div = styled.div`
`

export const p = styled.div`
	margin-bottom: 1em;
`

export const add = styled.span`
	color: green;
`

export const del = styled.span`
	color: red;
	text-decoration: line-through;
`

type WWProps = Pick<any, 'wordwrap'>
export const lb = styled.span`
	display: ${(props: WWProps) => props.wordwrap ? 'block' : 'inline' };

	${(props: WWProps) =>
		(props.wordwrap) ?
			`&:before {
				box-sizing: border-box;
				color: #666;
				content: counter(linenumber);
				counter-increment: linenumber;
				font-size: .8em;
				position: absolute;
				text-align: right;
				width: 42px;
				margin-left: -42px;
				padding-right: 8px;
			}` :
			''
	}
`

export const damage = styled.span``
// 	&:before {
// 		content: '✸';
// 		color: ${(props: RsProps) => props.activeId === props[ID_ATTRIBUTE_NAME] ? props[COLOR_ATTRIBUTE_NAME] : '#444'};
// 	}
// `

interface HiProps {
	rend: string
}
export const hi = styled.span`
	${(props: HiProps) => {
		if (!props.hasOwnProperty('rend')) return ''
		const has = (rendStyle: string) => props.rend.indexOf(rendStyle) > -1
		const rules = []
		if (has('underline')) rules.push('text-decoration: underline;')
		if (has('super')) rules.push('font-style: italic;')
		if (has('italic')) rules.push('font-style: italic;')
		return rules.join('')
	}}
`

	// add,
	// damage,
	// del,
	// div,
	// geo: rs,
	// head: styled.strong``,
	// hi,
	// lb,
	// p,
	// rs,
const components: any = {
}

export default components
