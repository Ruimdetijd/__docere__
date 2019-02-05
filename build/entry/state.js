"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xml_1 = require("../xml");
const defaultState = {
    activeId: null,
    dataNodeTree: null,
    extractors: [],
    input: xml_1.default,
    metadata: [],
    orientation: 0
};
exports.default = defaultState;
