import * as React from 'react'
import styled from '@emotion/styled'
import { State as EntryState } from './index'
import { TOP_OFFSET } from '../constants'

// TODO change facsimile when user scroll past a <pb />


const Wrapper = styled.div`
	background: white;
	position: sticky;
	top: ${(props: Props) =>
		props.orientation === Orientation.Horizontal ?
			TOP_OFFSET :
			`calc((((100vh - ${TOP_OFFSET}) / 2) + ${TOP_OFFSET}))`
	};
	height: ${(props: Props) =>
		props.orientation === Orientation.Horizontal ?
			`calc(100vh - ${TOP_OFFSET})` :
			`calc((100vh - ${TOP_OFFSET}) / 2)`
	};
	grid-column: 1;
	grid-row: ${(props: Props) => props.orientation === Orientation.Horizontal ? 1 : 2};
	z-index: 1;
`

type Props = Pick<EntryState, 'facsimiles' | 'orientation'>
export default class Facsimile extends React.PureComponent<Props> {
	private osd: any

	componentDidMount() {
		this.init()
	}

	componentDidUpdate(prevProps: Props) {
		if (prevProps.facsimiles !== this.props.facsimiles) {
			if (this.osd) this.osd.open(this.props.facsimiles.map(f => f.path))
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
		if (!this.props.facsimiles.length) return

		const OpenSeaDragon = await import('openseadragon')
		if (this.osd == null) {
			this.osd = OpenSeaDragon({
				constrainDuringPan: true,
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

		const facs = this.props.facsimiles.map(f => f.path)
		this.osd.open(facs[0])
	}
}
