import * as React from 'react'
import styled from '@emotion/styled'
import { State as EntryState } from './index'
import { TOP_OFFSET } from '../constants'

// TODO change facsimile when user scroll past a <pb />


const Wrapper = styled.div`
	background: white;
	position: sticky;
	${(props: Props) => {
		if (props.orientation === Orientation.Horizontal) {
			return `
				height: calc(100vh - ${TOP_OFFSET}px);
				top: 0;
			`
		}

		return `
			box-shadow: 0px -16px 24px white;
			height: calc((100vh - ${TOP_OFFSET}px) / 2);
			top: calc((100vh - ${TOP_OFFSET}px) / 2);
		`
	}}
	grid-column: 1;
	grid-row: ${(props: Props) => props.orientation === Orientation.Horizontal ? 1 : 2};
	z-index: 1;
`

type Props = Pick<EntryState, 'activeFacsimilePath' | 'orientation'>
export default class Facsimile extends React.PureComponent<Props> {
	private osd: any

	componentDidMount() {
		this.init()
	}

	componentDidUpdate(prevProps: Props) {
		if (prevProps.activeFacsimilePath !== this.props.activeFacsimilePath) {
			if (this.osd) this.osd.open(this.props.activeFacsimilePath)
			else this.init()
		}
	}

	componentWillUnmount() {
		if (this.osd) this.osd.destroy()
	}

	render() {
		return (
			<Wrapper {...this.props}>
				<div id="openseadragon" style={{ height: '100%' }}></div>
			</Wrapper>
		)
	}

	private async init() {
		const OpenSeaDragon = await import('openseadragon' as any)
		if (this.osd == null) {
			this.osd = OpenSeaDragon({
				constrainDuringPan: true,
				controlsFadeDelay: 0,
				controlsFadeLength: 300,
				id: "openseadragon",
				navigatorPosition: 'BOTTOM_LEFT',
				prefixUrl: "/node_modules/openseadragon/build/openseadragon/images/",
				showHomeControl: false,
				showRotationControl: true,
				showZoomControl: false,
				showNavigator: true,
				visibilityRatio: 1.0,
			})
		}

		this.osd.open(this.props.activeFacsimilePath)
	}
}
