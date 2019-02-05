"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function abeltasman(xmlio) {
    return xmlio
        .select('div[type="section"]')
        .export({ type: 'dom' });
}
function annefrank(xmlio) {
    return xmlio
        .select('div[n]:not([rend="external"])')
        .export({ type: 'dom' });
}
function blauweschuit(xmlio) {
    return xmlio
        .select('text')
        .export({ type: 'dom' });
}
function serrure(xmlio) {
    return xmlio
        .select('group')
        .export({ type: 'dom' });
}
function bartholomeus(xmlio) {
    return xmlio
        .select('group > text')
        .export({ type: 'dom' });
}
exports.default = {
    abeltasman,
    annefrank,
    blauweschuit,
    serrure,
    bartholomeus,
    'correspondenten-1900': bartholomeus,
};
