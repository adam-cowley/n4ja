<template>
    <div class="n4ja-search">
        <n4ja-grid class="section-header">
            <n4ja-column columns="6">
                <h2 v-html="title" />
            </n4ja-column>
            <n4ja-column columns="6" class="ui form">
                <input
                    type="text"
                    v-model="search" 
                    :placeholder="searchPlaceholder"
                />
            </n4ja-column>
        </n4ja-grid>

        <n4ja-cypher-details
            :context="context"
            :cypher="query"
            :params="params"
            node="n"
            relationships="relationships"
            :noResults="noResults"
            :cards="true"
            :columns="gridColumns"
        />
    </div>
</template>

<script>
// TODO: Pagination
import ContextComponent from '../ContextComponent';

export default {
    name: 'n4ja-search',
    mixins: [
        ContextComponent,
    ],

    props: {
        title: {
            type: String,
            description: 'Title to display in top left',
            default: 'Search',
        },

        searchPlaceholder: {
            type: String,
            description: 'Text to display as search placeholder',
            default: 'Search',
        },
        limit: {
            type: Number,
            description: 'The limit of results to display on the page',
            default: 6,
        },
        columns: {
            type: Number,
            description: 'The number of columns to display',
            default: 3,
        },
        noResults: {
            type: String,
            description: 'Message to display if there are no results',
            default: 'There are no results for this query',
        },
        

        fulltextIndex: {
            type: String,
            description: 'Fulltext index to run the search on',
        },
        label: {
            type: String,
            description: 'Label to search on',
        },
        property: {
            type: String,
            description: 'Property to search on',
        },
        condition: {
            type: String,
            description: 'What condition to search the regular index on - STARTS WITH, ENDS WITH, CONTAINS',
            default: 'CONTAINS',
        },
        
    },

    data: () => ({
        search: '',

        page: 1,
    }),

    computed: {
        gridColumns() {
            return 12 / this.columns;
        },
        query() {
            if ( this.fulltextIndex ) {
                return `
                    CALL db.index.fulltext.queryNodes($index, $search) YIELD node, score
                    RETURN node AS n
                    ORDER BY score DESC
                    SKIP $skip LIMIT $limit
                `;
            }

            const where = this.search != '' ? `WHERE n.\`${this.property}\` ${this.condition} $search` : ''

            return `
                    MATCH (n:\`${this.label}\`)
                    ${where}
                    RETURN n
                    ORDER BY n.\`${this.property}\`
                    SKIP $skip LIMIT $limit
                `;
        },
        skip() {
            return (this.page - 1) * this.limit;
        },
        params() {
            return {
                label: this.label,
                property: this.property,
                search: this.search,
                limit: this.limit,
                skip: this.skip,
            }
        },
    },

}
</script>
