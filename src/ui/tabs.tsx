import styled from "@emotion/styled";
import { ASIDE_HANDLE_HEIGHT, GRAY_LIGHT } from "../constants";


interface TabsProps { right?: boolean }
export const Tabs = styled.ul`
	align-self: center;
 	border-top-left-radius: 4px;
	border-bottom-left-radius: 4px;
	color: #BBB;
	cursor: pointer;
	line-height: ${ASIDE_HANDLE_HEIGHT}px;
	text-align: center;
	user-select: none;

	${(props: TabsProps) => {
		if (props.right) {
			return `
				& > li {
					border-bottom-left-radius: 0;
					border-bottom-right-radius: 8px;
					border-top-left-radius: 0;
					border-top-right-radius: 8px;
				}
			`
		}
	}}
`

interface TabProps { active: boolean }
export const Tab = styled.li`
	background-color: #EEE;
 	border-top-left-radius: 8px;
	border-bottom-left-radius: 8px;


	${(props: TabProps) => props.active ?
		`background-color: ${GRAY_LIGHT};
		color: #EEE;` :
		`&:hover {
			color: #444;
		}`
	}
`
