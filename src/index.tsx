import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import Entry from './entry'
import Projects from './projects'
import Project from './project'
import { Project as ProjectModel, XMLData } from './models'
import XMLio from 'xmlio';
import splitters from './project/splitters'
import { Main, Menu, H1 } from './entry/index.components'
import Admin from './admin'
import { Switch } from 'react-router'
import { parseReceivedProject } from './utils'
import Toggle from './ui/toggle';

function formatBytes(a: any) {
	var c=1024,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));
	const num = (a/Math.pow(c,f))
	const d = num < 10 ? 1 : 0
	return parseFloat(num.toFixed(d))+e[f]
}

function fetchXml(slug: string, filename: string): Promise<XMLData> {
	return new Promise((resolve, _reject) => {
		var xhr = new XMLHttpRequest
		xhr.open('GET', `/api/xml/${slug}/${filename}.xml`)
		xhr.responseType = 'document'
		xhr.overrideMimeType('text/xml')

		xhr.onload = function() {
			if (xhr.readyState === xhr.DONE && xhr.status === 200) {
				const size = formatBytes(xhr.getResponseHeader('Content-length'))
				const xmlio = new XMLio(xhr.responseXML)
				resolve({ xmlio, size })
			}
		}

		xhr.send()
	})
}

export interface State {
	projects: ProjectModel[]
	project: ProjectModel
	setEntry: (slug: string, xmlId: string, entryId: string) => void
	setProject: (slug: string) => void
	setProjects: () => void
	setXml: (slug: string, filename: string) => void
	updateProject: (props: Partial<ProjectModel>) => void
	xmlio: XMLio
}
class App extends React.Component<{}, State> {
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

		let entries = {}
		if (splitters.hasOwnProperty(project.slug)) {
			// TODO fix this. new XMLio expects an XML Document
			// const splitted = splitters[project.slug](xmlData.xmlio) as Element[]
			// entries = { ...project.entries, [filename]: splitted.map(s => new XMLio(s)) }
		}

		const partialState = this.nextProjectState({ xml, entries }, project, nextState.projects)
		return { ...partialState, xmlio: xmlData.xmlio }
	}

	state: State = {
		project: null,
		projects: [],
		setProjects: async () => {
			const nextState = await this.ensureProjects()
			this.setState(() => nextState)
		},
		setProject: async (slug: string) => {
			const nextState = await this.ensureProject(slug) as State
			this.setState(() => nextState)

		},
		setXml: async (slug: string, filename: string) => {
			const nextState = await this.ensureXml(slug, filename) as State
			this.setState(() => nextState)
		},
		setEntry: async (slug: string, filename: string, entryId: string) => {
			const nextState = await this.ensureXml(slug, filename) as State
			if (entryId != null) {
				const project = nextState.hasOwnProperty('project') ? nextState.project : this.state.project
				nextState.xmlio = project.entries[filename][parseInt(entryId, 10)]
			}
			this.setState(() => nextState)
		},
		updateProject: (nextProject: Partial<ProjectModel>) => {
			this.setState(() => this.nextProjectState(nextProject))
		},
		xmlio: null
	}

	render() {
		const title = this.state.project != null ?
			<H1>{this.state.project.title || this.state.project.slug}</H1> :
			<H1><div>DOCERE<small>Digital Scholarly Editions</small></div></H1>

		return (
			<BrowserRouter>
				<Main>
					{title}
					<Switch>
						<Route path="/tmp" render={() =>
							<>
								<div></div>
								<div>
									<div style={{ width: '20px', height: '10px' }}>
										<Toggle change={() => true} value={true} />
									</div>
									<div style={{ width: '200px', height: '100px' }}>
										<Toggle change={() => true} value={false} />
									</div>
									<div style={{ width: '600px', height: '100px' }}>
										<Toggle change={() => true} value={true} />
									</div>
									<div style={{ width: '600px', height: '600px' }}>
										<Toggle change={() => true} value={true} />
									</div>

								</div>
							</>
						} />
						<Route
							path="/admin"
							render={(props) => <Admin {...props} {...this.state} />}
						/>
						<Route
							path="/"
							render={() =>
								<>
									<Menu>
										<Link to="/projects">Projects</Link>
										&nbsp;
										{
											this.state.project != null &&
											<>
												<Link to={`/projects/${this.state.project.slug}`}>{this.state.project.title}</Link>
												&nbsp; - &nbsp;
												<Link to={`/admin/project/${this.state.project.slug}`}>admin</Link>
											</>
										}
									</Menu>
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
}

document.addEventListener('DOMContentLoaded', () => {
	const container = document.getElementById('container')
	ReactDOM.render(<App />, container)
});