"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    abeltasman: function (xmlio) {
        const node = xmlio.select('div[facs]').export({ type: 'data', deep: false });
        return node.attributes.facs.slice(2);
    },
    gekaaptebrieven: function (xmlio) {
        xmlio;
        return '';
    }
};
