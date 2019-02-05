import * as React from 'react'
import { State as AppState } from '../../index'
import { RouteComponentProps } from 'react-router'
import Editor from '../editor'
import HireInput from 'hire-forms-input'
import FacsimileExtractorForm from './facsimile-extractor-form'

const defaultMetadataExtractorValue = `/**
function(xmlio) {
	const selector = ""
	let meta = xmlio
		.select(selector)
		.export(({ type: 'data', deep: false }))
	if (meta == null) return []
	if (!Array.isArray(meta)) meta = [meta]
	return meta.map(m => [m.attributes.type, m.attributes.value])
}
*/`

const defaultSplitter = `/**
function(xmlio) {
	const selector = ""
	return xmlio
		.select(selector)
		.export({ type: 'dom' })
}
*/`

interface MatchParams {
	slug: string
}
interface Props extends AppState, RouteComponentProps<MatchParams> {
}
interface State {
	facsimile_extractor: string
	metadata_extractor: string
	splitter: string
	title: string
}
export default class ProjectAdmin extends React.Component<Props, State> {
	state: State = {
		facsimile_extractor: (this.props.project != null) ? JSON.stringify(this.props.project.facsimile_extractor) : null,
		metadata_extractor: (this.props.project != null) ? this.props.project.metadata_extractor.toString() : null,
		splitter: (this.props.project != null) ? this.props.project.splitter.toString() : null,
		title: (this.props.project != null) ? this.props.project.title : '',
	}

	async componentDidMount() {
		this.props.setProject(this.props.match.params.slug)
	}

	componentDidUpdate(prevProps: Props) {
		if (prevProps.project !== this.props.project) {
			let { facsimile_extractor, metadata_extractor, splitter, title } = this.props.project

			this.setState({
				facsimile_extractor: facsimile_extractor == null ? null : JSON.stringify(facsimile_extractor),
				metadata_extractor: metadata_extractor == null ? defaultMetadataExtractorValue : metadata_extractor.toString(),
				splitter: splitter == null ? defaultSplitter : splitter.toString(),
				title: title == null ? '' : title
			})
		}
	}

	render() {
		if (this.props.project == null) return null

		return (
			<>
				<h2 style={{ margin: 0 }}>
					{`Project: ${this.props.project.title || this.props.project.slug}`}
					<button
						onClick={async () => {
							const body = { ...this.state }
							if (body.metadata_extractor === defaultMetadataExtractorValue) body.metadata_extractor = null
							if (body.splitter === defaultSplitter) body.splitter = null

							await fetch(`/api/projects/${this.props.project.slug}`, {
								body: JSON.stringify(body),
								headers: {
									'Content-Type': 'application/json'
								},
								method: "PUT",
							})	
						}}
					>
						Save
					</button>
				</h2>
				<div style={{
					display: 'grid',
					gridTemplateRows: 'repeat(3, 1fr)',
					gridTemplateColumns: '1fr 3fr'
				}}>
					<section style={{ overflow: 'auto', gridRow: '1 / span 4' }}>
						<h3>XML documents</h3>
						<ul>
							{
								this.props.project.files.map(filename =>
									<li
										key={filename}
										style={{ textAlign: 'right' }}
									>
										{filename}
									</li>
								)
							}
						</ul>
					</section>
					<section>
						<h3>Title</h3>
						<HireInput
							onChange={title => this.setState({ title })}
							value={this.state.title}
						/>
					</section>
					{
						this.state.splitter != null &&
						<section>
							<h3>Splitter</h3>
							<Editor
								change={(splitter) =>
									this.setState({ splitter })
								}
								initValue={this.state.splitter}
							/>
						</section>
					}
					<FacsimileExtractorForm
						facsimileExtractor={this.props.project.facsimile_extractor}
						onChange={facsimile_extractor => this.setState({ facsimile_extractor })}
						slug={this.props.project.slug}
					/>
					{
						this.state.metadata_extractor != null &&
						<section>
							<h3>Metadata Extractor</h3>
							<Editor
								change={(metadata_extractor) =>
									this.setState({ metadata_extractor })
								}
								initValue={this.state.metadata_extractor}
							/>
						</section>
					}
				</div>
			</>
		)
	}
}