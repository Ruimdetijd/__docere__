"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const xmlio_1 = require("xmlio");
function byteToHex(byte) {
    const hex = ('0' + byte.toString(16)).slice(-2);
    return hex;
}
function generateId(len = 10) {
    var arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    const tail = [].map.call(arr, byteToHex).join("");
    const head = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    return `${head}${tail}`;
}
exports.generateId = generateId;
function parseReceivedProject(nextProject) {
    if (nextProject.facsimile_extractor != null)
        nextProject.facsimile_extractor = new Function(`return ${nextProject.facsimile_extractor}`)();
    if (nextProject.metadata_extractor != null)
        nextProject.metadata_extractor = new Function(`return ${nextProject.metadata_extractor}`)();
    if (nextProject.extractors == null)
        nextProject.extractors = [];
    return nextProject;
}
exports.parseReceivedProject = parseReceivedProject;
function fetchPost(url, body) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url, {
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
        });
        if (response.headers.get("content-length") !== '0') {
            const data = yield response.json();
            return data;
        }
    });
}
exports.fetchPost = fetchPost;
function fetchPut(url, body) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url, {
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
            method: "PUT",
        });
        if (response.headers.get("content-length") !== '0') {
            const data = yield response.json();
            return data;
        }
    });
}
exports.fetchPut = fetchPut;
function debounce(func, wait) {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(func, wait);
    };
}
exports.debounce = debounce;
function formatBytes(a) {
    var c = 1024, e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], f = Math.floor(Math.log(a) / Math.log(c));
    const num = (a / Math.pow(c, f));
    const d = num < 10 ? 1 : 0;
    return parseFloat(num.toFixed(d)) + e[f];
}
function fetchXml(slug, filename) {
    return new Promise((resolve, _reject) => {
        var xhr = new XMLHttpRequest;
        xhr.open('GET', `/api/xml/${slug}/${filename}.xml`);
        xhr.responseType = 'document';
        xhr.overrideMimeType('text/xml');
        xhr.onload = function () {
            if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                const size = formatBytes(xhr.getResponseHeader('Content-length'));
                const xmlio = new xmlio_1.default(xhr.responseXML);
                resolve({ xmlio, size });
            }
        };
        xhr.send();
    });
}
exports.fetchXml = fetchXml;
