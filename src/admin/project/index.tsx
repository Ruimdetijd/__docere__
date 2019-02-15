import * as React from 'react'
import { State as AppState } from '../../index'
import { RouteComponentProps } from 'react-router'
import Menu from './menu'
import Main from './main'
import { parseReceivedProject } from '../../utils'
import { Project, MetadataField } from '../../models'
import { Link } from 'react-router-dom'

function getPropValue(project: Project, prop: keyof Project, initValue: any = null) {
	if (project == null || project[prop] == null) return initValue
	return project[prop]
}

export interface MatchParams {
	slug: string
	menuitem: string
}
interface Props extends AppState, RouteComponentProps<MatchParams> {
}
export interface State {
	extractors: Extractor[]
	facsimile_extractor: string
	metadata_extractor: string
	metadata_fields: MetadataField[]
	splitter: string
	title: string
}
export default class ProjectAdmin extends React.Component<Props, State> {
	state: State = {
		extractors: getPropValue(this.props.project, 'extractors'),
		facsimile_extractor: getPropValue(this.props.project, 'facsimile_extractor'),
		metadata_extractor: getPropValue(this.props.project, 'metadata_extractor'),
		metadata_fields: getPropValue(this.props.project, 'metadata_fields'),
		splitter: getPropValue(this.props.project, 'splitter'),
		title: getPropValue(this.props.project, 'title', ''),
	}

	async componentDidMount() {
		this.props.setProject(this.props.match.params.slug)
	}

	componentDidUpdate() { 
		const nextState: Partial<State> = {}
		if (this.state.facsimile_extractor == null && this.props.project.facsimile_extractor != null) {
			nextState.facsimile_extractor = this.props.project.facsimile_extractor.toString()
		}
		if (this.state.metadata_extractor == null && this.props.project.metadata_extractor != null) {
			nextState.metadata_extractor = this.props.project.metadata_extractor.toString()
		}
		if (this.state.splitter == null && this.props.project.splitter != null) {
			nextState.splitter = this.props.project.splitter.toString()
		}
		if (this.state.title == '' && this.props.project.title != null && this.props.project.title.length) {
			nextState.title = this.props.project.title
		}
		if (this.state.extractors == null && this.props.project.extractors != null && this.props.project.extractors.length) {
			nextState.extractors = this.props.project.extractors
		}
		if (Object.keys(nextState).length) this.setState(nextState as State)
	}

	render() {
		if (this.props.project == null) return null

		return (
			<>
				<h2 style={{ margin: 0 }}>
					{`${this.props.project.title || this.props.project.slug}`} - <Link to={`/projects/${this.props.project.slug}`}>site</Link>
					<button
						onClick={async () => {
							const body = { ...this.state }

							// Metadata_fields is not part of the project table
							delete body.metadata_fields

							if (Array.isArray(body.extractors)) {
								body.extractors = body.extractors.map(e => {
									if (e.idAttribute != null && !e.idAttribute.length) e.idAttribute = null
									return e
								})
							}
							const response = await fetch(`/api/projects/${this.props.project.slug}`, {
								body: JSON.stringify(body),
								headers: { 'Content-Type': 'application/json' },
								method: "PUT",
							})	
							let project = await response.json() as Project
							project = parseReceivedProject(project as Project)
							this.props.updateProject(project)
						}}
					>
						Save
					</button>
				</h2>
				<div style={{
					display: 'grid',
					gridTemplateColumns: '1fr 3fr',
					gridTemplateRows: '100%',
					gridColumnGap: '8%'
				}}>
					<Menu slug={this.props.project.slug} />
					<Main
						{...this.props}
						change={(key: keyof State, value: any) => {
							this.setState({ [key]: value } as Pick<State, keyof State>)
						}}
					/>
				</div>
			</>
		)
	}
}
