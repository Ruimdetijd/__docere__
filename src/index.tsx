import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import Entry from './entry'
import Projects from './projects'
import Project from './project'
import { Project as ProjectModel } from './models'
import XMLio from 'xmlio';
import { Main, Menu, H1 } from './entry/index.components'
import Admin from './admin'
import { Switch } from 'react-router'
import { parseReceivedProject, fetchXml } from './utils'

export interface State {
	projects: ProjectModel[]
	project: ProjectModel
	searchQuery: string
	setEntry: (slug: string, xmlId: string, entryId: string) => void
	setProject: (slug: string) => void
	setProjects: () => void
	setSearchQuery: (query: string) => void
	setXml: (slug: string, filename: string) => void
	updateProject: (props: Partial<ProjectModel>) => void
	xmlio: XMLio
}
class App extends React.Component<{}, State> {
	state: State = {
		project: null,
		projects: [],
		searchQuery: null,
		setProjects: async () => {
			const nextState = await this.ensureProjects()
			this.setState(() => nextState)
		},
		setProject: async (slug: string) => {
			const nextState = await this.ensureProject(slug) as State
			this.setState(() => nextState)

		},
		setSearchQuery: (searchQuery: string) => {
			this.setState({ searchQuery })
		},
		setXml: async (slug: string, filename: string) => {
			const nextState = await this.ensureXml(slug, filename) as State
			this.setState(() => nextState)
		},
		setEntry: async (slug: string, filename: string) => {
			const nextState = await this.ensureXml(slug, filename) as State
			// if (entryId != null) {
			// 	const project = nextState.hasOwnProperty('project') ? nextState.project : this.state.project
			// 	nextState.xmlio = project.entries[filename][parseInt(entryId, 10)]
			// }
			this.setState(() => nextState)
		},
		updateProject: (nextProject: Partial<ProjectModel>) => {
			this.setState(() => this.nextProjectState(nextProject))
		},
		xmlio: null
	}

	render() {
		const title = this.state.project != null ?
			<H1>
				<Link to={`/projects/${this.state.project.slug}`}>
					{this.state.project.title || this.state.project.slug}
				</Link>
			</H1> :
			<H1><div>DOCERE<small>Digital Scholarly Editions</small></div></H1>

		return (
			<BrowserRouter>
				<Main>
					<Menu>
						{/* <Link to="/projects">Projects</Link>
						&nbsp;
						{
							this.state.project != null &&
							<>
								<Link to={`/projects/${this.state.project.slug}`}>{this.state.project.title}</Link>
								&nbsp; - &nbsp;
								<Link to={`/admin/project/${this.state.project.slug}`}>admin</Link>
							</>
						} */}
						<div></div>
						<Route
							path="/projects/:projectSlug/xml/:xmlId"
							render={() =>
								<div>
									<input
										onKeyUp={ev => {
											if (ev.keyCode === 13) {
												this.state.setSearchQuery((ev.target as HTMLInputElement).value)
											}
										}}
									/>
									<div>
										<svg viewBox="0 0 250.313 250.313">
											<path d="M244.186,214.604l-54.379-54.378c-0.289-0.289-0.628-0.491-0.93-0.76 c10.7-16.231,16.945-35.66,16.945-56.554C205.822,46.075,159.747,0,102.911,0S0,46.075,0,102.911 c0,56.835,46.074,102.911,102.91,102.911c20.895,0,40.323-6.245,56.554-16.945c0.269,0.301,0.47,0.64,0.759,0.929l54.38,54.38 c8.169,8.168,21.413,8.168,29.583,0C252.354,236.017,252.354,222.773,244.186,214.604z M102.911,170.146 c-37.134,0-67.236-30.102-67.236-67.235c0-37.134,30.103-67.236,67.236-67.236c37.132,0,67.235,30.103,67.235,67.236 C170.146,140.044,140.043,170.146,102.911,170.146z" />
										</svg>
									</div>
								</div>

							}
						/>
					</Menu>
					{title}
					<Switch>
						<Route
							path="/admin"
							render={(props) => <Admin {...props} {...this.state} />}
						/>
						<Route
							path="/"
							render={() =>
								<>
									<div>
										<Route path="/projects" exact render={() =>
											<Projects
												{...this.state}
											/>
										} />
										<Route path="/projects/:slug" exact render={props =>
											<Project
												{...props}
												{...this.state}
											/>
										} />
										<Route
											exact
											path="/projects/:projectSlug/xml/:xmlId"
											render={this.renderEntry}
										/>
										<Route
											path="/projects/:projectSlug/xml/:xmlId/entries/:entryId"
											render={this.renderEntry}
										/>
									</div>
								</>
							}
						/>
					</Switch>
				</Main>
			</BrowserRouter>
		)
	}

	private renderEntry = (props) => {
		return (
			<Entry
				{...props}
				{...this.state}
			/>
		)
	}

	private nextProjectState = (
		props: Partial<ProjectModel>,
		project?: ProjectModel,
		projects?: ProjectModel[]
	): Pick<State, 'project' | 'projects'> => {
		// Extend the project with next props
		if (project == null) project = this.state.project
		project = { ...project, ...props }	

		// Replace the old project in state.projects
		if (projects == null) projects = this.state.projects
		projects = projects
			.filter(p => p.id !== project.id)
			.concat(project)

		return { project, projects }
	}


	private async ensureProjects(): Promise<Pick<State, 'projects'>> {
		const nextState = {} as Pick<State, 'projects'>

		if (!this.state.projects.length) {
			const response = await fetch(`/api/projects`)
			const projects = await response.json()
			nextState.projects = projects
		}

		return nextState
	}

	private async fetchProject(slug: string): Promise<ProjectModel> {
		const response = await fetch(`/api/projects/${slug}`)
		let nextProject: ProjectModel = await response.json()
		nextProject = parseReceivedProject(nextProject)

		// TODO entries and xml should be copied from current project
		return {
			...nextProject,
			entries: {},
			xml: {}
		}
	}

	private async ensureProject(slug: string): Promise<Partial<State>> {
		if (this.state.project != null && this.state.project.slug === slug) return {}

		if (!this.state.projects.length) {
			const nextState: Partial<State> = {}

			// If projects was not downloaded yet, the project to ensure must be new as well
			nextState.project = await this.fetchProject(slug)

			const { projects } = await this.ensureProjects()

			// Assign projects to nextState and replace the project
			// in projects with the full, fetched project
			nextState.projects = projects
				.filter(p => p.id !== nextState.project.id)
				.concat(nextState.project)

			return nextState
		}

		// const projects = nextState.hasOwnProperty('projects') ? nextState.projects : this.state.projects
		const project = this.state.projects.find(p => p.slug === slug)

		if (project.xml == null) {
			const nextProject = await this.fetchProject(slug)
			return this.nextProjectState(nextProject)	
		}

		return {}
	}

	private async ensureXml(slug: string, filename: string): Promise<Partial<State>> {
		const nextState = await this.ensureProject(slug)
		const project = nextState.hasOwnProperty('project') ? nextState.project : this.state.project

		if (project.xml.hasOwnProperty(filename)) {
			const { xmlio } = project.xml[filename]
			return (xmlio !== this.state.xmlio) ? { xmlio } : {}
		}

		const xmlData = await fetchXml(project.slug, filename)	
		const xml = { ...project.xml, [filename]: xmlData }	

		// TODO fix this. new XMLio expects an XML Document
		// let entries = {}
		// if (splitters.hasOwnProperty(project.slug)) {
		// 	const splitted = splitters[project.slug](xmlData.xmlio) as Element[]
		// 	entries = { ...project.entries, [filename]: splitted.map(s => new XMLio(s)) }
		// }

		const partialState = this.nextProjectState({ xml }, project, nextState.projects)
		return { ...partialState, xmlio: xmlData.xmlio }
	}
}

document.addEventListener('DOMContentLoaded', function() {
	const container = document.getElementById('container')
	ReactDOM.render(<App />, container)
})
