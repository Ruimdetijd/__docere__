"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = require("react");
const huc_faceted_search_1 = require("huc-faceted-search");
const huc_ui_components_1 = require("huc-ui-components");
const result_body_1 = require("./result-body");
const styled_1 = require("@emotion/styled");
const utils_1 = require("../utils");
const Wrapper = styled_1.default.div `
	display: grid;
    grid-template-columns: 320px auto;
    grid-column-gap: 64px;
    padding: 64px;
	
	h2 {
		grid-column: 1 / span 2;
	}
`;
class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            request: null,
            searchResults: {
                hits: [],
                total: 0
            }
        };
        this.handleChange = (req, searchResults, query) => {
            if (query.length)
                this.props.setSearchQuery(query);
            this.setState({ request: req, searchResults });
        };
        this.onScroll = () => {
            const { documentElement: doc } = document;
            if (doc.scrollHeight - (doc.scrollTop + doc.clientHeight) < doc.scrollHeight * .1) {
                this.searchRef.current.getNext();
            }
        };
        this.onScrollDebounced = utils_1.debounce(this.onScroll, 100);
        this.searchRef = React.createRef();
    }
    componentDidMount() {
        this.props.setProject(this.props.match.params.slug);
        document.addEventListener('scroll', this.onScrollDebounced);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return (this.state !== nextState ||
            this.props.project == null && nextProps.project != null ||
            this.props.project.slug !== nextProps.project.slug);
    }
    componentWillUnmount() {
        document.removeEventListener('scroll', this.onScrollDebounced);
    }
    render() {
        if (this.props.project == null)
            return null;
        return (React.createElement(Wrapper, null,
            React.createElement(huc_faceted_search_1.default, { backend: "elasticsearch", onChange: this.handleChange, ref: this.searchRef, url: `/search/${this.props.project.slug}/_search` },
                React.createElement(huc_faceted_search_1.FullTextSearch, { autoSuggest: () => tslib_1.__awaiter(this, void 0, void 0, function* () { return []; }) }),
                React.createElement(huc_faceted_search_1.Reset, null),
                React.createElement(huc_faceted_search_1.Facets, null, this.props.project.metadata_fields
                    .filter(field => field.es_data_type !== 'null')
                    .sort((f1, f2) => f1.sortorder - f2.sortorder)
                    .map(field => field.es_data_type === 'boolean' ?
                    React.createElement(huc_faceted_search_1.BooleanFacet, { field: field.slug, key: field.slug, labels: ["Nee", "Ja"], title: field.title }) :
                    field.es_data_type === 'date' ?
                        React.createElement(huc_faceted_search_1.RangeFacet, { field: field.slug, key: field.slug, title: field.title, type: "timestamp" }) :
                        React.createElement(huc_faceted_search_1.ListFacet, { field: field.slug, key: field.slug, title: field.title })))),
            React.createElement(huc_ui_components_1.HucSearchResults, { resultBodyComponent: result_body_1.default(this.props.project.slug), searchResults: this.state.searchResults })));
    }
}
exports.default = Project;
