"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = require("react");
const components_1 = require("../components");
const dispilio_1 = require("dispilio");
const utils_1 = require("../utils");
class Entry extends React.Component {
    constructor() {
        super(...arguments);
        this.components = components_1.default;
        this.state = {
            highlight: []
        };
    }
    componentDidMount() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { projectSlug, xmlId, entryId } = this.props.match.params;
            yield this.props.setEntry(projectSlug, xmlId, entryId);
            yield Promise.resolve().then(() => require(`../components/${projectSlug}`)).then(components => {
                this.components = Object.assign({}, this.components, components.default);
                this.forceUpdate();
            });
            if (this.props.searchQuery != null)
                this.setHighlight();
        });
    }
    componentDidUpdate(prevProps) {
        if (prevProps.searchQuery !== this.props.searchQuery) {
            this.setHighlight();
        }
    }
    render() {
        if (this.props.project == null || this.props.xmlio == null)
            return null;
        const extractedMetadata = this.props.project.hasOwnProperty('metadata_extractor') && this.props.project.metadata_extractor != null ?
            this.props.project.metadata_extractor(this.props.xmlio) :
            [];
        const metadata = this.props.project.metadata_fields
            .filter(field => field.type === 'meta' && field.aside)
            .sort((f1, f2) => f1.sortorder - f2.sortorder)
            .map(field => {
            const metadata = extractedMetadata.find(([key]) => `m_${key}` === field.slug);
            return metadata == null ? null : [field.title, metadata[1]];
        })
            .filter(m => m != null);
        const extractors = this.props.project.metadata_fields
            .filter(field => field.type === 'text' && field.aside)
            .sort((f1, f2) => f1.sortorder - f2.sortorder)
            .map(field => {
            const extractor = this.props.project.extractors.find(ex => ex.id === field.slug);
            if (extractor == null)
                return null;
            extractor.title = field.title;
            return extractor;
        })
            .filter(m => m != null);
        return (React.createElement(dispilio_1.default, { components: this.components, extractors: extractors, facsimileExtractor: this.props.project.facsimile_extractor, metadata: metadata, highlight: this.state.highlight, xmlio: this.props.xmlio }));
    }
    setHighlight() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const response = yield utils_1.fetchPost(`/search/${this.props.project.slug}/_search`, {
                _source: false,
                query: {
                    bool: {
                        must: [
                            {
                                query_string: {
                                    query: this.props.searchQuery
                                }
                            },
                            {
                                match: {
                                    id: this.props.match.params.xmlId
                                }
                            }
                        ]
                    }
                },
                highlight: {
                    fields: {
                        text: {}
                    },
                    require_field_match: false,
                    fragment_size: 0,
                    number_of_fragments: 1000
                }
            });
            let hits = [];
            if (!response.hasOwnProperty('error') && response.hits.hits.length) {
                hits = response.hits.hits[0].highlight.text.reduce((set, hit) => {
                    hit = hit.slice(hit.indexOf('<em>') + 4, hit.indexOf('</em>'));
                    set.add(hit);
                    return set;
                }, new Set());
            }
            this.setState({ highlight: [...hits] });
        });
    }
}
exports.default = Entry;
