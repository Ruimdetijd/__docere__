import * as React from 'react'
import styled from '@emotion/styled'
import ActiveArea, { activeAreaRGB } from './active-area'

const Wrapper = styled.div`
	bottom: 0;
	box-sizing: border-box;
	left: calc(100% - ((100% - 480px) / 2) + 32px);
	overflow: auto;
	padding-top: 32px;
	position: absolute;
	top: 0;
	width: 48px;
	scrollbar-width: none;

	&::-webkit-scrollbar {
		display: none;
	}

	& div.container {
		box-sizing: border-box;
		transform: scaleX(.1) scaleY(.1);
		transform-origin: top left;
		width: 480px;
	}

	&:hover .active-area {
		background: rgba(${activeAreaRGB}, .5);
	}
`

const Blocker = styled.div`
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	pointer-events: all;
	top: 0;
	z-index: 1;
`

const Bar = styled.div`
	position: absolute;
	top: ${(props: any) => props.top}px;
	height: .3em;
	background-color: rgba(255, 255, 0, 1);
	margin-top: -.07em;
	width: 100%;
`

interface Props {
	activeAreaRef: React.RefObject<HTMLDivElement>
	highlightAreas: number[]
	textWrapperRef: React.RefObject<HTMLDivElement>
}
function Minimap(props: Props) {
	const miniMapRef = React.useRef<HTMLDivElement>()

	React.useEffect(() => {
		// Handle the mouse wheel: scroll the text wrapper
		function handleWheel(ev: any) {
			ev.preventDefault()
			props.textWrapperRef.current.scrollTo({
				top: props.textWrapperRef.current.scrollTop += ev.deltaY,
				behavior: 'smooth'
			})
			return false
		}

		miniMapRef.current.querySelector('.blocker').addEventListener('wheel', handleWheel)
		miniMapRef.current.querySelector('.active-area').addEventListener('wheel', handleWheel)

		const observer = new MutationObserver((_ml, _ob) => {
			props.textWrapperRef.current.scrollTop = 0
			const current = miniMapRef.current.querySelector('.container')
			if (current) current.innerHTML = ''
			current.appendChild(props.textWrapperRef.current.firstChild.cloneNode(true))
		})

		observer.observe(props.textWrapperRef.current, {
			attributes: false, childList: true, subtree: true, characterData: false 
		})

		return () => observer.disconnect()
	}, [])

	return (
		<Wrapper
			className="minimap"
			onWheel={() => false}
			ref={miniMapRef}
		>
			<ActiveArea
				activeAreaRef={props.activeAreaRef}
				textWrapperRef={props.textWrapperRef}
			/>
			<Blocker className="blocker" />
			<div style={{ position: 'relative' }}>
				{props.highlightAreas.map((ha: number) => {
					return <Bar key={ha} top={(ha - 64)/10} />
				})}
			</div>
			<div className="container" />
		</Wrapper>
	)
}

export default React.memo(Minimap)
