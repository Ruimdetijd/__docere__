import * as React from 'react'
import styled from '@emotion/styled';

interface PProps {
	buttonCount: number
}
const Paginator = styled('ul')`
	background: white;
	border-radius: 1em;
	display: grid;
	grid-template-columns: repeat(${(props: PProps) => props.buttonCount}, 1fr);
	user-select: none;
`

const Li = styled('li')`
	color: #444;
	display: grid;
	width: 100%;
	height: 100%;
	line-height: 100%;

	& + li {
		border-left: 1px solid #EEE;
	}

	& > span {
		align-self: center;
		justify-self: center;
	}
`

const PartNumber = styled(Li)`
	cursor: pointer;

	& > span {
		border-bottom: ${(props: { active?: boolean }) => props.active ? '1px solid black;' : 'none' }
	}
`

const Spread = styled(Li)`
	color: lightgray;
`

interface Props {
	activePart: number
	change: (activePart: number) => void
	partCount: number
}
export default function PartNavigator(props: Props) {
	const buttonCount = (props.activePart === 0 || props.activePart === props.partCount - 1) ? 4 : 7

	return (
		<Paginator buttonCount={buttonCount}>
			{
				props.activePart !== 0 &&
				<>
				<PartNumber
					active={props.activePart === 0}
					onClick={() => props.change(0)}
				>
					<span>1</span>
				</PartNumber>
				<PartNumber onClick={() => props.change(props.activePart - 1)}><span>&lt;</span></PartNumber>
				<Spread><span>…</span></Spread>
				</>
			}
			<PartNumber
				active={props.activePart === props.activePart}
			>
				<span>{props.activePart + 1}</span>
			</PartNumber>
			{
				props.activePart !== props.partCount - 1 &&
				<>
					<Spread><span>…</span></Spread>
					<PartNumber onClick={() => props.change(props.activePart + 1)}><span>&gt;</span></PartNumber>
					<PartNumber
						active={props.activePart === props.partCount - 1}
						onClick={() => props.change(props.partCount - 1)}
					>
						<span>{props.partCount}</span>
					</PartNumber>
				</>
			}
		</Paginator>
	)
}