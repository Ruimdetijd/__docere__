import { Project, XMLData } from './models'
import XMLio from 'xmlio'

// str byteToHex(uint8 byte)
//   converts a single byte to a hex string 
function byteToHex(byte: number) {
	const hex = ('0' + byte.toString(16)).slice(-2);
	return hex
}

// str generateId(int len);
//   len - must be an even number (default: 10)
export function generateId(len: number = 10) {
	var arr = new Uint8Array((len || 40) / 2);
	window.crypto.getRandomValues(arr);
	const tail = [].map.call(arr, byteToHex).join("");
	const head = String.fromCharCode(97 + Math.floor(Math.random() * 26))
	return `${head}${tail}`
}

export function parseReceivedProject(nextProject: Project): Project {
	if (nextProject.facsimile_extractor != null) nextProject.facsimile_extractor = new Function(`return ${nextProject.facsimile_extractor}`)()
	if (nextProject.metadata_extractor != null) nextProject.metadata_extractor = new Function(`return ${nextProject.metadata_extractor}`)()
	if (nextProject.extractors == null) nextProject.extractors = []
	return nextProject
}

export async function fetchPut(url: string, body: any) {
	const response = await fetch(url, {
		body: JSON.stringify(body),
		headers: { 'Content-Type': 'application/json' },
		method: "PUT",
	})

	if (response.headers.get("content-length") !== '0')	{
		const data = await response.json()
		return data
	}
}

export function debounce(func: Function, wait: number) {
	let timeout: number
	return function () {
		clearTimeout(timeout)
		timeout = setTimeout(func, wait)
	}
}

function formatBytes(a: any) {
	var c=1024,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));
	const num = (a/Math.pow(c,f))
	const d = num < 10 ? 1 : 0
	return parseFloat(num.toFixed(d))+e[f]
}

export function fetchXml(slug: string, filename: string): Promise<XMLData> {
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