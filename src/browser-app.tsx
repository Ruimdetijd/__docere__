import App from './app'
import { fetchEntryXml, fetchXml, getPageXmlPath } from './utils'

export default class BrowserApp extends App {
	afterComponentDidMount() {
		window.addEventListener('popstate', () => {
			const [, ,entryId, pageId] = document.location.pathname.split('/')
			if (entryId == null && this.state.entry.id != null) this.setEntry(null, false)
			else if (entryId === 'pages' && pageId != null) this.setPage(pageId, false)
			else if (entryId != null) this.setEntry(entryId, false)
		})
	}

	protected async getEntryDoc(documentId: string) {
		// const { documentId, documentPath } = analyzeWindowLocation()
		return await fetchEntryXml(this.props.configData.config.slug, documentId)
	}

	protected async getPageDoc(page: Page) {
		return await fetchXml(getPageXmlPath(this.props.configData.config.slug, page))
	}

	protected afterSetEntry(entryId: string, push: boolean) {
		let url = `/${this.props.configData.config.slug}`
		let title = this.props.configData.config.title
		if (entryId != null) {
			url += `/entries/${entryId}`
			title = `${title} - ${entryId}`
		}
		if (push) history.pushState({}, title, url)
		document.title = title
	}

	protected afterSetPage(page: PageConfig, push: boolean) {
		if (push) history.pushState({}, page.title, `/${this.props.configData.config.slug}/pages/${page.id}`)
	}
}
