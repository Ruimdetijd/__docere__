function getProjectDir(projectId: string) {
	return `/node_modules/docere-projects/src/${projectId}`
} 

export function analyzeWindowLocation() {
	const [, projectId, documentType, ...path] = window.location.pathname.split('/')

	return {
		projectId,
		documentType,
		documentPath: path.slice(0, -1).join('/'),
		documentId: path[path.length - 1]
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

export function getEntryXmlPath(projectSlug: string, path: string, id: string) {
	return `${getProjectDir(projectSlug)}/xml/${path}/${id}.xml`
}

export function getPageXmlPath(projectSlug: string, page: PageConfig) {
	return `${getProjectDir(projectSlug)}/pages/${page.path}`
}

export function fetchEntryXml(projectSlug: string, path: string, id: string) {
	return fetchXml(getEntryXmlPath(projectSlug, path, id))
}

export function fetchXml(url: string): Promise<XMLDocument> {
	return new Promise((resolve, _reject) => {
		var xhr = new XMLHttpRequest
		xhr.open('GET', url)
		xhr.responseType = 'document'
		xhr.overrideMimeType('text/xml')

		xhr.onload = function() {
			if (xhr.readyState === xhr.DONE && xhr.status === 200) {
				resolve(xhr.responseXML)
			}
		}

		xhr.send()
	})
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


