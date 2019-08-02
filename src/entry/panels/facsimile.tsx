import * as React from 'react'
import styled from '@emotion/styled'
import { EntryState } from '../index'
// import { TOP_OFFSET } from '../../constants'

// TODO change facsimile when user scroll past a <pb />


const Wrapper = styled.div`
	background: white;
	position: sticky;
	${(props: Props) => {
		if (props.orientation === Orientation.Horizontal) {
			return `
				top: 0;
			`
		}

		return `
			box-shadow: 0px -16px 24px white;
			height: 50%;
			top: 50%;
		`
	}}
	height: 100%;
	z-index: 1;
`
	// grid-column: 1;
	// grid-row: ${(props: Props) => props.orientation === Orientation.Horizontal ? 1 : 2};

type Props = Pick<EntryState, 'activeFacsimilePath' | 'orientation' | 'facsimiles'>
export default class Facsimile extends React.PureComponent<Props> {
	private osd: any

	componentDidMount() {
		this.init()
	}

	componentDidUpdate(prevProps: Props) {
		if (prevProps.activeFacsimilePath !== this.props.activeFacsimilePath) {
		// 	if (this.osd) this.osd.open(this.props.activeFacsimilePath)
			this.init()
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
		const { default: OpenSeaDragon } = await import('openseadragon')
		if (this.osd == null) {
			this.osd = OpenSeaDragon({
				constrainDuringPan: true,
				controlsFadeDelay: 0,
				controlsFadeLength: 300,
				id: "openseadragon",
				navigatorPosition: 'BOTTOM_LEFT',
				prefixUrl: "/node_modules/openseadragon/build/openseadragon/images/",
				sequenceMode: true,
				showHomeControl: false,
				showReferenceStrip: true,
				showRotationControl: true,
				showZoomControl: false,
				showNavigator: true,
				visibilityRatio: 1.0,
			})
		}

		// const facsimile = this.props.facsimiles.find(f => f.id === this.props.activeFacsimilePath)
		// TODO acativeFacsimilePath should be activeFacsimileID
		// TODO find the paths in this.props.facsimiles with activeFacsimileID
		let path = this.props.activeFacsimilePath as any
		
		const [,projectSlug] = document.location.pathname.split('/')
		if (projectSlug === 'vangogh') {
			path = { tileSource: { type: 'image', url: path.slice(0, -5).concat('f.png'), buildPyramid: false } }
		}
		
		this.osd.open(path)
	}
}
