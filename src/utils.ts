import { Project } from './models';

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