"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mondrian(xmlio) {
    const idnos = xmlio
        .select('idno')
        .export({ type: 'data' }) || [];
    return idnos.map(idno => [idno.attributes.type, idno.children[0]]);
}
function blauweschuit(xmlio) {
    const idnos = xmlio
        .select('msidentifier > *')
        .export({ type: 'data' });
    return Array.isArray(idnos) ? idnos.map(idno => [idno.name, idno.children[0]]) : [];
}
function annefrank(xmlio) {
    const idnos = xmlio
        .select('titleStmt > *')
        .export({ type: 'data' });
    return Array.isArray(idnos) ? idnos.map(idno => [idno.name, idno.children[0]]) : [];
}
function gekaaptebrieven(xmlio) {
    let meta = xmlio
        .select('meta')
        .export(({ type: 'data', deep: false }));
    if (meta == null)
        return [];
    if (!Array.isArray(meta))
        meta = [meta];
    return meta.map(m => [m.attributes.type, m.attributes.value]);
}
exports.default = {
    abeltasman: function () { return []; },
    vangogh: annefrank,
    mondrian,
    annefrank,
    blauweschuit,
    gekaaptebrieven,
    serrure: function () { return []; },
    walewein: function () { return []; },
    bartholomeus: function () { return []; },
    clusius: function () { return []; },
    deystroom: function () { return []; },
    'menschen-en-bergen': function () { return []; },
    'correspondenten-1900': function (xmlio) {
        const meta = xmlio.select('interpGrp > interp').export({ type: 'data', deep: false });
        return meta.map(m => [m.attributes.type, m.attributes.value]);
    }
};
