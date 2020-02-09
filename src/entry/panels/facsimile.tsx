import * as React from 'react'
import styled from '@emotion/styled'
import AppContext from '../../app/context'
import { Colors } from '../../constants'

// TODO change facsimile when user scroll past a <pb />

const Wrapper = styled.div`
	background: white;
	position: sticky;
	top: 0;
	height: 100%;
	z-index: 1;

	.facsimile-area {
		border-width: 3px;
		border-style: solid;
		cursor: pointer;
		opacity: 0;
		pointer-events: none;
		transition: opacity 600ms;

		&.active {
			opacity: 1;
		}

		&.show {
			pointer-events: all;

			&:hover {
				opacity: .3;
			}

		}
	}
`

function useOpenSeadragon(): [any, any] {
	const [OpenSeadragon, setOpenSeadragon] = React.useState([null, null] as [any, any])

	React.useEffect(() => {
		import('openseadragon')
			.then(OpenSeadragon => {
				const osdInstance = OpenSeadragon.default({
					constrainDuringPan: true,
					controlsFadeDelay: 0,
					controlsFadeLength: 300,
					gestureSettingsMouse: {
						clickToZoom: false,
						dblClickToZoom: true,
					},
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

function renderFacsimileAreas(osd: any, facsimileAreas: FacsimileArea[], OpenSeadragon: any, dispatch: React.Dispatch<EntryStateAction>) {
	const { width: imgWidthRatio, height: imgHeightRatio } = osd.world.getHomeBounds()
	const aspectRatio = imgHeightRatio / imgWidthRatio

	const { x: imgWidth, y: imgHeight } = osd.world._contentSize

	facsimileAreas?.forEach(area => {
		let { x, y, w, h, unit } = area
		if (unit === 'px') {
			x = x / imgWidth
			y = y / imgHeight
			w = w / imgWidth
			h = h / imgHeight
		} 

		var element = document.createElement("div")
		element.classList.add('facsimile-area')
		element.dataset.id = area.id
		element.style.borderColor = area.target?.color != null ? area.target.color : Colors.Red
		if (area.showOnHover) {
			element.classList.add('show')
			element.addEventListener('click', () => {
				area.target != null ?
					dispatch({ type: 'SET_ENTITY', id: area.target.id }) :
					dispatch({ type: 'SET_ACTIVE_FACSIMILE_AREAS', ids: [area.id] })
			})
		}

		y = y * aspectRatio
		h = h * aspectRatio

		osd.addOverlay({
			element,
			location: new OpenSeadragon.Rect(x, y, w, h),
		})
	})
}

function getAreaCenter(area: FacsimileArea, osd: any, OpenSeadragon: any) {
	let { x, y, w, h, unit } = area
	if (unit === 'px') {
		const { x: imgWidth, y: imgHeight } = osd.world._contentSize
		x = x / imgWidth
		y = y / imgHeight
		w = w / imgWidth
		h = h / imgHeight
	}
	return new OpenSeadragon.Point(x + w/2, y + h/2)
}

function useActiveFacsimileAreas(osd: any, activeFacsimileAreas: FacsimileArea[], OpenSeadragon: any) {
	React.useEffect(() => {
		if (osd == null || activeFacsimileAreas == null) return

		for (const areaEl of osd.container.querySelectorAll('.facsimile-area.active')) {
			areaEl.classList.remove('active')
		}

		activeFacsimileAreas.forEach(area => {
			const element = osd.container.querySelector(`[data-id="${area.id}"]`)
			if (element != null) {
				element.classList.add('active')
				osd.viewport.panTo(getAreaCenter(area, osd, OpenSeadragon))
			}
		})
	}, [osd, activeFacsimileAreas])
}

function useActiveFacsimile(
	osd: any,
	activeFacsimile: Props['activeFacsimile'],
	projectId: DocereConfig['slug'],
	OpenSeadragon: any,
	entryDispatch: Props['entryDispatch']
) {
	React.useEffect(() => {
		if (osd == null || activeFacsimile == null) return
		// const facsimile = this.props.facsimiles.find(f => f.id === this.props.activeFacsimilePath)
		// TODO acativeFacsimilePath should be activeFacsimileID
		// TODO find the paths in this.props.facsimiles with activeFacsimileID
		let path = activeFacsimile.versions[0].path as any
		
		// TODO Move logic to vangogh facsimileExtractor (path should be a string of a tileSource)
		if (projectId === 'vangogh') {
			path = { tileSource: { type: 'image', url: path.slice(0, -5).concat('f.png'), buildPyramid: false } }
		}

		function openHandler() {
			renderFacsimileAreas(osd, activeFacsimile.versions[0].areas, OpenSeadragon, entryDispatch)
			osd.removeHandler('open', openHandler)
		}

		osd.addHandler('open', openHandler)
		
		osd.open(path)
	}, [osd, activeFacsimile])

}

type Props =
	Pick<EntryState, 'activeFacsimile' | 'activeFacsimileAreas'> & {
		entryDispatch: React.Dispatch<EntryStateAction>
	}

function FacsimilePanel(props: Props) {
	const appContext = React.useContext(AppContext)
	const [osd, OpenSeadragon] = useOpenSeadragon()
	useActiveFacsimile(osd, props.activeFacsimile, appContext.config.slug, OpenSeadragon, props.entryDispatch)
	useActiveFacsimileAreas(osd, props.activeFacsimileAreas, OpenSeadragon)

	return (
		<Wrapper>
			<div id="openseadragon" style={{ height: '100%' }}></div>
		</Wrapper>
	)
}

export default React.memo(FacsimilePanel)
