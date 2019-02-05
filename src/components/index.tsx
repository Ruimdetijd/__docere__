import styled from '@emotion/styled';
import { ID_ATTRIBUTE_NAME, COLOR_ATTRIBUTE_NAME } from 'dispilio'

const div = styled.div`
`

const p = styled.div`
	margin-bottom: 1em;
`

const add = styled.span`
	color: green;
`

const del = styled.span`
	color: red;
	text-decoration: line-through;
`

type WWProps = Pick<LbProps, 'wordwrap'>
const lb = styled.span`
	display: ${(props: WWProps) => props.wordwrap ? 'block' : 'inline' };

	${(props: WWProps) =>
		(props.wordwrap) ?
			`&:before {
				box-sizing: border-box;
				color: #444;
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

interface RsProps {
	activeId: string
	type: string
}
const rs = styled.span`
	border-bottom: 2px;
	border-bottom-style: solid;
	border-bottom-color: ${(props: RsProps) => props[COLOR_ATTRIBUTE_NAME]};
	background-color: ${(props: RsProps) =>
		props.activeId === props[ID_ATTRIBUTE_NAME] ? props[COLOR_ATTRIBUTE_NAME] : 'initial'
	};
	color: ${(props: RsProps) =>
		props.activeId === props[ID_ATTRIBUTE_NAME] ? 'white' : 'initial'
	};
	cursor: pointer;
	padding: .05em .1em;
`

const damage = styled.span`
	&:before {
		content: '✸';
		color: ${(props: RsProps) => props.activeId === props[ID_ATTRIBUTE_NAME] ? props[COLOR_ATTRIBUTE_NAME] : '#444'};
	}
`

interface HiProps {
	rend: string
}
const hi = styled.span`
	${(props: HiProps) => {
		if (!props.hasOwnProperty('rend')) return ''
		const has = (rendStyle: string) => props.rend.indexOf(rendStyle) > -1
		const rules = []
		if (has('underline')) rules.push('text-decoration: underline;')
		if (has('super')) rules.push('font-style: italic;')
		return rules.join('')
	}}
`

const components: DispilioComponents = {
	add,
	damage,
	del,
	div,
	geo: rs,
	head: styled.strong``,
	hi,
	lb,
	p,
	rs,
}

export default components