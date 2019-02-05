import * as React from 'react'
import { Props as EntryProps } from './index'

export default class Facsimile extends React.PureComponent<EntryProps, null> {
	private osd

	componentDidMount() {
		this.init(this.props)
	}

	componentWillUnmount() {
		if (this.osd) this.osd.destroy()
	}

	render() {
		return (
			<div className="facsimile">
				<div id="openseadragon" style={{ height: '100%' }}></div>
			</div>
		)
	}

	private async init(props: EntryProps) {
		const OpenSeaDragonImport = await import('openseadragon')
		const OpenSeaDragon = OpenSeaDragonImport.default
		if (this.osd == null) {
			this.osd = OpenSeaDragon({
				constrainDuringPan: true,
				id: "openseadragon",
				navigatorPosition: 'BOTTOM_LEFT',
				prefixUrl: "/node_modules/openseadragon/build/openseadragon/images/",
				showNavigationControl: false,
				showNavigator: true,
				visibilityRatio: 1.0,
			})
		}

		const path = props.project.facsimile_extractor(props.xmlio)
		this.osd.open(`/api/facsimile/${props.project.slug}/${path}.dzi`)
	}
}
