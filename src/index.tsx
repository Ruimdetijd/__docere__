import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import Entry from './entry'
import Projects from './projects'
import Project from './project'
import { Project as ProjectModel, XMLData } from './models'
import extractors from './entry/extractors'
import XMLio from 'xmlio';
import splitters from './project/splitters'
import { Main, Menu, H1 } from './entry/index.components'
// import metadataBySlug from './entry/metadata'
// import facsimilePathExtractor from './entry/facsimile-path-extractor';
import Admin from './admin'
import { Switch } from 'react-router';

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
				const xmlio = new XMLio(xhr.responseXML.documentElement, { namespaces: ['af', 'md']})
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
	xmlio: XMLio
}
class App extends React.Component<{}, State> {
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
		const nextProject: ProjectModel = await response.json()
		if (nextProject.facsimile_extractor != null) nextProject.facsimile_extractor = JSON.parse(nextProject.facsimile_extractor as any)
		return {
			...nextProject,
			entries: {},
			extractors: extractors[slug],
			splitter: splitters[slug],
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
			return this.updateProject(nextProject)	
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
			const splitted = splitters[project.slug](xmlData.xmlio) as Element[]
			entries = { ...project.entries, [filename]: splitted.map(s => new XMLio(s)) }
		}

		const partialState = this.updateProject({ xml, entries }, project, nextState.projects)
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
		xmlio: null
	}

	private updateProject(
		props: Partial<ProjectModel>,
		project?: ProjectModel,
		projects?: ProjectModel[]
	): Pick<State, 'project' | 'projects'> {
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

	render() {
		return (
			<BrowserRouter>
				<Main>
					<H1>DOCERE<small>Digital Scholarly Editions</small></H1>
					<Switch>
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
											<Link to={`/projects/${this.state.project.slug}`}>{this.state.project.title}</Link>
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