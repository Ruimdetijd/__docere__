"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const settings_1 = require("./components/settings");
const splitter_1 = require("./components/splitter");
const metadata_extractor_1 = require("./components/metadata-extractor");
const facsimile_extractor_form_1 = require("./facsimile-extractor-form");
const list_xml_documents_1 = require("./components/list-xml-documents");
const extractors_1 = require("./components/extractors");
const metadata_1 = require("./components/metadata");
const menuData = [
    {
        component: settings_1.default,
        slug: 'settings',
        title: 'Settings'
    },
    {
        component: splitter_1.default,
        slug: 'splitter',
        title: 'Split XML'
    },
    {
        component: facsimile_extractor_form_1.default,
        slug: 'facsimile-extractor',
        title: 'Extract facsimiles'
    },
    {
        component: extractors_1.default,
        slug: 'extractors',
        title: 'Extract data from text'
    },
    {
        component: metadata_extractor_1.default,
        slug: 'metadata-extractor',
        title: 'Extract metadata'
    },
    {
        component: metadata_1.default,
        slug: 'metadata',
        title: 'Metadata'
    },
    {
        component: list_xml_documents_1.default,
        slug: 'list-xml-documents',
        title: 'List XML documents'
    },
];
exports.default = menuData;
