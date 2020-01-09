function getProjectDir(projectId: string) {
	return `/node_modules/docere-projects/src/${projectId}`
} 

export function analyzeWindowLocation() {
	const [, projectId, documentType, ...documentId] = window.location.pathname.split('/')

	return {
		projectId,
		documentType,
		documentId: documentId.join('/'),
	}
}

export async function fetchPost(url: string, body: any) {
	const response = await fetch(url, {
		body: JSON.stringify(body),
		headers: { 'Content-Type': 'application/json' },
		method: "POST",
	})

	if (response.headers.get("content-length") !== '0')	{
		const data = await response.json()
		return data
	}
}

export function getEntryXmlPath(projectSlug: string, documentId: string) {
	return `${getProjectDir(projectSlug)}/xml/${documentId}.xml`
}

export function getPageXmlPath(projectSlug: string, page: PageConfig) {
	return `${getProjectDir(projectSlug)}/pages/${page.path}`
}

export async function fetchEntryXml(projectSlug: string, documentId: string) {
	let doc: XMLDocument

	try {
		// doc = await fetchEntryXml(this.props.configData.config.slug, documentId)
		doc = await fetchXml(getEntryXmlPath(projectSlug, documentId))
	} catch (err) {
		doc = null			
	}

	return doc
}

export function fetchXml(url: string): Promise<XMLDocument> {
	return new Promise((resolve, reject) => {
		var xhr = new XMLHttpRequest
		xhr.open('GET', url)
		xhr.responseType = 'document'
		xhr.overrideMimeType('text/xml')

		xhr.onload = function() {
			if (xhr.readyState === xhr.DONE && xhr.status === 200) {
				resolve(xhr.responseXML)
			} else {
				reject()
			}
		}

		xhr.send()
	})
}

export async function fetchJson(url: string) {
	const result = await fetch(url)
	return await result.json()
}

// function byteToHex(byte: number) {
// 	const hex = ('0' + byte.toString(16)).slice(-2);
// 	return hex
// }

// export function generateId(len = 10) {
// 	var arr = new Uint8Array((len || 40) / 2);
// 	window.crypto.getRandomValues(arr);
// 	const tail = [].map.call(arr, byteToHex).join("");
// 	const head = String.fromCharCode(97 + Math.floor(Math.random() * 26))
// 	return `${head}${tail}`
// }


