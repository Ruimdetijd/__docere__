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

function useHighlight(osd: any, facsimileAreas: Props['facsimileAreas'], OpenSeadragon: any) {
	React.useEffect(() => {
		if (osd == null) return

		for (const areaEl of osd.container.querySelectorAll('.facsimile-area')) {
			osd.removeOverlay(areaEl)
		}

		// console.log(props.facsimileHighlight, new OpenSeadragon.Rect(...props.facsimileHighlight))
		const { width: imgWidthRatio, height: imgHeightRatio } = osd.world.getHomeBounds()
		const aspectRatio = imgHeightRatio / imgWidthRatio

		// TODO check why this is necessary
		if (!Array.isArray(facsimileAreas)) return

		facsimileAreas.forEach(area => {
			let { x, y, w, h, unit } = area
			if (unit === 'px') {
				const { x: imgWidth, y: imgHeight } = osd.world._contentSize
				x = x / imgWidth
				y = y / imgHeight
				w = w / imgWidth
				h = h / imgHeight
			} 

			var element = document.createElement("div")
			element.classList.add('facsimile-area')
			element.style.border = '3px solid rgba(255, 0, 0, .6)'

			osd.addOverlay({
				element,
				location: new OpenSeadragon.Rect(x, y * aspectRatio, w, h * aspectRatio),
			});
		})
	}, [osd, facsimileAreas])
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
	Pick<PanelsState, 'facsimileAreas'> &
	{ projectId: DocereConfig['slug'] }

function FacsimilePanel(props: Props) {
	const [osd, OpenSeadragon] = useOpenSeaddragon()
	useFacsimilePath(osd, props.activeFacsimilePath, props.projectId)
	useHighlight(osd, props.facsimileAreas, OpenSeadragon)

	return (
		<Wrapper>
			<div id="openseadragon" style={{ height: '100%' }}></div>
		</Wrapper>
	)
}

export default React.memo(FacsimilePanel)
