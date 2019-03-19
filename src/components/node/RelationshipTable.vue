<template>
    <n4ja-cypher-table
        :header="headerText"
        :query="cleanedQuery"
        :params="params"
        :rowActions="actions"
        :noResultsText="noResultsText"
        :noMoreResultsText="noMoreResultsText"
        :limit="limit"
        :pagination="pagination"
    />
</template>

<script>
import { v1 as neo4j } from 'neo4j-driver';

const TYPE_PLACEHOLDER = '{{TYPE}}';

export default {
    name: 'N4jaRelationshipTable',
    props: {
        id: {
            type: [ String, Number ],
            description: 'ID of source Node',
        },
        context: {
            type: [ Array, String ],
            description: 'The context in which this component is being viewed',
        },
        header: String,
        type: {
            type: String,
            description: 'Relationship Type',
        },
        query: {
            type: String,
            description: 'Query to load, should return `type` and `nodes` - an array of nodes or ids',
            default: `
                MATCH (node)-[r:${TYPE_PLACEHOLDER}]-(end)
                WHERE id(node) = $id
                RETURN id(end) as id, end AS node
            `
        },
        limit: {
            type: Number,
            default: 12,
            description: 'Limit of records to show at any time',
        },

        bloomPhrase: {
            type: String,
            description: 'Search Phrase to open up bloom',
        },
        bloomText: {
            type: String,
            default: 'Open in Bloom',
            description: 'Text to display in Bloom link',
        },

        viewRoute: {
            type: String,
            description: 'Route name for View button',
        },
        viewText: {
            type: String,
            description: 'Text on link to the right of the list',
            default: 'View',
        },

        noResultsText: {
            type: String,
            description: 'Message shown when no results are returned',
            default: 'No results',
        },
        noMoreResultsText: {
            type: String,
            description: 'Message shown when Next has been clicked too many times',
            default: 'No more results.  Try clicking the Previous link',
        },
        pagination: {
            type: Boolean,
            description: 'Show previous and next links?',
            default: false,
        },
        previousText: {
            type: String,
            description: 'Text to use on the Previous button',
            default: 'Previous',
        },
        nextText: {
            type: String,
            description: 'Text to use on the Next button',
            default: 'Next',
        },
    },
    computed: {
        headerText() {
            return this.header || this.type;
        },
        cleanedQuery() {
            if ( this.query.includes(TYPE_PLACEHOLDER) ) {
                return this.query.replace(TYPE_PLACEHOLDER, this.type);
            }

            return this.query;
        },
        params() {
            return this.idParams();
        },
        actions() {
            const output = [];

            if ( this.bloomPhrase ) {
                output.push({
                    variant: 'warning',
                    class: 'btn btn-pagination float-right secondary',
                    text: this.bloomText,
                    onClick: row => this.openBloomPhrase(this.bloomPhrase, row),
                });
            }

            if ( this.viewRoute ) {
                output.push({
                    variant: 'info',
                    class: 'btn btn-pagination primary',
                    route: this.viewRoute,
                    text: this.viewText,
                });
            }

            return output;
        },
    },
}
</script>
