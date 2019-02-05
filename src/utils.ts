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