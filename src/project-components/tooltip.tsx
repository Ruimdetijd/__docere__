import * as React from "react"
import styled from '@emotion/styled'

// Map of polygons. The key is confusing, it is the orientation
// of the tooltip. When the orientation of the tooltip is `bottom`
// the tooltip is located at the top.
const tipBackgroundByOrientation = {
	bottom: <polygon points="15,12 0,30 30,30 15,12"/>,
	left: <polygon points="0,0 18,15 0,30 0,0"/>,
	right: <polygon points="30,0 30,30 12,15, 30,0"/>,
	top: <polygon points="0,0 30,0 15,18 0,0"/>
};

function tipBorderByOrientation(strokeColor: string) {
	return {
		bottom: <path d="M0,30 L15,12 L30,30" stroke={strokeColor} strokeWidth="3" />,
		left: <path d="M0,0 L18,15 L0,30" stroke={strokeColor} strokeWidth="3" />,
		right: <path d="M30,0 L12,15 L30,30" stroke={strokeColor} strokeWidth="3" />,
		top: <path d="M0,0 L15,18 L30,0" stroke={strokeColor} strokeWidth="3" />
	}
}

const Wrapper = styled.div`
	position: absolute;
	z-index: 999;
	left: calc(100vw - 24px);
`

function useSvgTopLeft(orientation: Orientation, wrapperEl: HTMLDivElement, svgEl: SVGElement) {
	React.useEffect(() => {
		if (wrapperEl == null || svgEl == null) return

		if (orientation === 'top' || orientation === 'bottom') {
			const svgRect = svgEl.getBoundingClientRect()
			const elRect = wrapperEl.getBoundingClientRect()
			if (svgRect.left < elRect.left) svgEl.style.left = '1px'
			if (svgRect.left + svgRect.width > elRect.left + elRect.width) {
				svgEl.style.left = (elRect.width - 21) + 'px'
			}
		}
		else if (orientation === 'left' || orientation === 'right') {
			const svgRect = svgEl.getBoundingClientRect()
			const elRect = wrapperEl.getBoundingClientRect()
			if (svgRect.top < elRect.top) svgEl.style.top = '1px'
			if (svgRect.top + svgRect.height > elRect.top + elRect.height) {
				svgEl.style.top = (elRect.height - 21) + 'px'
			}
		}

	}, [orientation, wrapperEl, svgEl])
}

function useTipStyle(orientation: Props['orientation'], shift: Props['shift']) {
	const [style, setStyle] = React.useState<React.CSSProperties>(null)

	React.useEffect(() => {
		if (orientation === 'bottom' || orientation === 'top') {
			const prop = (orientation === 'bottom') ? 'top' : 'bottom'
			setStyle({
				left: `calc(${100 * shift}% - 10px)`,
				position: 'absolute',
				[prop]: '-19px',
			})
		} else {
			const prop = (orientation === 'right') ? 'left' : 'right'
			setStyle({
				position: 'absolute',
				top: `calc(${100 * shift}% - 10px)`,
				[prop]: '-19px',
			})
		}

	}, [orientation, shift])

	return style
}

type Orientation = "top" | "right" | "bottom" | "left"
interface Props {
	bodyStyle?: React.CSSProperties
	children: React.ReactNode
	orientation?: Orientation
	shift?: number
	style?: React.CSSProperties
}
function Tooltip(props: Props) {		
	const svgRef: React.RefObject<SVGSVGElement> = React.useRef()
	const wrapperRef: React.RefObject<HTMLDivElement> = React.useRef()

	useSvgTopLeft(props.orientation, wrapperRef.current, svgRef.current)
	const tipStyle = useTipStyle(props.orientation, props.shift)

	const borderColor = props.bodyStyle.hasOwnProperty('borderColor') ?
		props.bodyStyle.borderColor :
		'#aaa'

	const backgroundColor = props.bodyStyle.hasOwnProperty('backgroundColor') ?
		props.bodyStyle.backgroundColor :
		'white'

	return (
		<Wrapper
			ref={wrapperRef}
			style={props.style}
		>
			<div
				style={{
					backgroundColor,
					borderColor,
					fontFamily: "'Roboto', sans-serif",
					fontWeight: 300,
					borderRadius: '2px',
					borderStyle: 'solid',
					borderWidth: '1px',
					color: '#666',
					height: '100%',
					padding: '1em',
					...props.bodyStyle,
				}}
			>
				{props.children}
			</div>
			<svg
				fill={backgroundColor}
				height="20px"
				ref={svgRef}
				style={tipStyle}
				viewBox="0 0 30 30"
				width="20px"
			>
				{tipBorderByOrientation(borderColor)[props.orientation]}
				{tipBackgroundByOrientation[props.orientation]}
			</svg>
		</Wrapper>
	);
}

Tooltip.defaultProps = {
	bodyStyle: {},
	orientation: "bottom",
	shift: .5,
	style: {},
	some: 'bull,',
} as Partial<Props>

export default React.memo(Tooltip)
