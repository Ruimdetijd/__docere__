import * as React from 'react'
import styled from '@emotion/styled'
import { EntryState } from '../index'
import { PanelsState } from './index'
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

type Props =
	Pick<EntryState, 'activeFacsimilePath' | 'orientation'> &
	Pick<Entry,  'facsimiles'> &
	Pick<PanelsState, 'facsimileHighlight'> &
	{ projectId: DocereConfig['slug'] }

export default class Facsimile extends React.PureComponent<Props> {
	private osd: any
	private OpenSeadragon: any

	componentDidMount() {
		this.init()
	}

	componentDidUpdate(prevProps: Props) {
		if (prevProps.activeFacsimilePath !== this.props.activeFacsimilePath) {
			this.init()
		}

		if (prevProps.facsimileHighlight != this.props.facsimileHighlight) {
			this.highlight()
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
		const osdImport = await import('openseadragon')
		this.OpenSeadragon = osdImport.default != null ? osdImport.default : osdImport

		if (this.osd == null) {
			this.osd = this.OpenSeadragon({
				constrainDuringPan: true,
				controlsFadeDelay: 0,
				controlsFadeLength: 300,
				id: "openseadragon",
				navigatorPosition: 'BOTTOM_LEFT',
				// TODO only for Electron, remove before commit
				// prefixUrl: "/home/gijs/Projects/docere/node_modules/openseadragon/build/openseadragon/images/",
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
		
		if (this.props.projectId === 'vangogh') {
			path = { tileSource: { type: 'image', url: path.slice(0, -5).concat('f.png'), buildPyramid: false } }
		}
		
		this.osd.open(path)
	}

	private highlight() {
		this.osd.removeOverlay('runtime-overlay')

		var element = document.createElement("div")
        element.id = 'runtime-overlay'
		element.style.boxShadow = 'rgba(255, 255, 0, 0.8) 0px 0px 4px, rgba(255, 255, 0, 0.8) 0px 0px 16px, rgba(255, 255, 0, 0.8) 0px 0px 64px'
		// element.style.border = '2px solid rgba(255, 255, 0, .6)'

		// console.log(this.props.facsimileHighlight, new this.OpenSeadragon.Rect(...this.props.facsimileHighlight))
		const { width: imgWidthRatio, height: imgHeightRatio } = this.osd.world.getHomeBounds()
		const aspectRatio = imgHeightRatio / imgWidthRatio


		let { x, y, w, h, unit } = this.props.facsimileHighlight
		if (unit === 'px') {
			const { x: imgWidth, y: imgHeight } = this.osd.world._contentSize
			x = x / imgWidth
			y = y / imgHeight
			w = w / imgWidth
			h = h / imgHeight
		} 

        this.osd.addOverlay({
            element,
			location: new this.OpenSeadragon.Rect(x, y * aspectRatio, w, h * aspectRatio),
        });
	}
}
