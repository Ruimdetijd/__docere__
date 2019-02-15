import * as React from 'react'
import { Props } from '../main'
import styled from '@emotion/styled'

const Section = styled.section`
	display: grid;
	grid-template-columns: 1fr 2fr;
	grid-template-rows: 3em repeat(3, 1fr);
	height: 100%;

	h3 {
		margin: 0;
		grid-column: 1 / span 2;
	}

	ul {
		overflow: auto;
		grid-row: 2 / span 3;
	}
`

const Metadata = styled.div`
	li {
		margin-bottom: 1em;
	}

`

export default class ListXMLDocuments extends React.PureComponent<Props> {
	render() {
		return (
			<Section>
				<h3>XML documents</h3>
				<ul>
					{
						this.props.project.files.map(filename =>
							<li
								key={filename}
								onClick={() => this.props.setXml(this.props.project.slug, filename)}
								style={{ textAlign: 'right' }}
							>
								{filename}
							</li>
						)
					}
				</ul>
				<Metadata>
					<h3>Metadata</h3>
					{
						this.props.xmlio != null &&
						this.props.project.metadata_extractor != null &&
						<ul>
							{
								this.props.project.metadata_extractor(this.props.xmlio).map(([key, value]) =>
									<li key={key}>
										<div>{key}</div>
										<div>{value}</div>
									</li>
								)

							}
						</ul>
					}
				</Metadata>
				<Metadata>
					<h3>Facsimiles</h3>
					{
						this.props.xmlio != null &&
						this.props.project.facsimile_extractor != null &&
						<ul>
							{
								this.props.project.facsimile_extractor(this.props.xmlio).facsimiles
									.filter(facsimile => facsimile != null)
									.map((facsimile, index) =>
										<li key={index}>
											{
												facsimile.id != null &&
												<div>{facsimile.id}</div>
											}
											{
												facsimile.path != null &&
												<div>{facsimile.path}</div>
											}
										</li>
									)
							}
						</ul>
					}
				</Metadata>
				<div>Data</div>
			</Section>
		)
	}
}
