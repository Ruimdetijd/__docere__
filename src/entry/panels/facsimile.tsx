import * as React from 'react'
import styled from '@emotion/styled'

// TODO change facsimile when user scroll past a <pb />

const Wrapper = styled.div`
	background: white;
	position: sticky;
	top: 0;
	height: 100%;
	z-index: 1;
`

function useOpenSeaddragon(): [any, any] {
	const [OpenSeadragon, setOpenSeadragon] = React.useState([null, null] as [any, any])

	React.useEffect(() => {
		import('openseadragon')
			.then(OpenSeadragon => {
				const osdInstance = OpenSeadragon.default({
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
				setOpenSeadragon([osdInstance, OpenSeadragon])
			})
	}, [])

	return OpenSeadragon
}

function useHighlight(osd: any, facsimileHighlight: Props['facsimileHighlight'], OpenSeadragon: any) {
	React.useEffect(() => {
		if (osd == null) return

		osd.removeOverlay('runtime-overlay')

		var element = document.createElement("div")
		element.id = 'runtime-overlay'
		// element.style.boxShadow = 'rgba(255, 0, 0, 0.8) 0px 0px 4px, rgba(255, 0, 0, 0.8) 0px 0px 16px, rgba(255, 0, 0, 0.8) 0px 0px 64px'
		element.style.border = '3px solid rgba(255, 0, 0, .6)'

		// console.log(props.facsimileHighlight, new OpenSeadragon.Rect(...props.facsimileHighlight))
		const { width: imgWidthRatio, height: imgHeightRatio } = osd.world.getHomeBounds()
		const aspectRatio = imgHeightRatio / imgWidthRatio

		// TODO check why this is necessary
		if (facsimileHighlight == null) return

		let { x, y, w, h, unit } = facsimileHighlight
		if (unit === 'px') {
			const { x: imgWidth, y: imgHeight } = osd.world._contentSize
			x = x / imgWidth
			y = y / imgHeight
			w = w / imgWidth
			h = h / imgHeight
		} 

		osd.addOverlay({
			element,
			location: new OpenSeadragon.Rect(x, y * aspectRatio, w, h * aspectRatio),
		});
	}, [osd, facsimileHighlight])
}

function useFacsimilePath(osd: any, activeFacsimilePath: Props['activeFacsimilePath'], projectId: Props['projectId']) {
	React.useEffect(() => {
		if (osd == null) return
		// const facsimile = this.props.facsimiles.find(f => f.id === this.props.activeFacsimilePath)
		// TODO acativeFacsimilePath should be activeFacsimileID
		// TODO find the paths in this.props.facsimiles with activeFacsimileID
		let path = activeFacsimilePath as any
		
		if (projectId === 'vangogh') {
			path = { tileSource: { type: 'image', url: path.slice(0, -5).concat('f.png'), buildPyramid: false } }
		}
		
		osd.open(path)
	}, [osd, activeFacsimilePath])

}

type Props =
	Pick<EntryState, 'activeFacsimilePath' | 'orientation'> &
	Pick<Entry,  'facsimiles'> &
	Pick<PanelsState, 'facsimileHighlight'> &
	{ projectId: DocereConfig['slug'] }

function FacsimilePanel(props: Props) {
	const [osd, OpenSeadragon] = useOpenSeaddragon()
	useFacsimilePath(osd, props.activeFacsimilePath, props.projectId)
	useHighlight(osd, props.facsimileHighlight, OpenSeadragon)

	return (
		<Wrapper>
			<div id="openseadragon" style={{ height: '100%' }}></div>
		</Wrapper>
	)
}

export default React.memo(FacsimilePanel)
