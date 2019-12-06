<template>
    <div class="n4ja-cypher-overviews">
        <n4ja-loading v-if="loading" />

        <div class="alert alert-error" v-if="error">
            {{ error }}
        </div>

        <div class="no-results" v-if="result && !result.records.length" v-html="noResults" />


        <template v-if="result && result.records.length">
            <component 
                :is="outerComponent"
                v-for="(row, id) in result.records"
                :key="id"
            >
                <component :is="innerComponent">
                    <n4ja-node-overview
                        v-if="node && row.has(node)"
                        :context="context"
                        :node="row.get(node)"
                    />

                    <n4ja-relationship-overview
                        v-if="relationship && row.has(relationship)"
                        :context="context"
                        :relationship="row.get(relationship)"
                        :start="row.get(start)"
                        :end="row.get(end)"
                    />

                </component>
            </component>
        </template>
    </div>
</template>

<script>
export default {
    name: 'n4ja-cypher-overviews',

    props: {
        context: {
            type: [ String, Array, ],
            description: 'The context in which this table is being displayed',
            default: () => ['n4ja-cypher-overviews'],
        },

        cypher: String,

        // TODO: Move to Table Component
        columns: {
            type: Array,
            description: 'Columns to pull from each row and display in result',
        },
        index: {
            type: Boolean,
            description: 'Show an index column at the start of the row',
        },
        noResults: {
            type: String,
            description: 'Message to display if there are no results',
            default: 'There are no results for this query',
        },

        node: {
            type: [ String, Boolean, ],
            description: 'The result key to use to find the node to display an overview for',
            default: false,
        },

        relationship: {
            type: [ String, Boolean, ],
            description: 'The result key to use to find the node to display an overview for',
            default: false,
        },
        start: {
            type: [ String, Boolean, ],
            description: 'The result key to use to find the start node of the relationship',
            default: false,
        },
        end: {
            type: [ String, Boolean, ],
            description: 'The result key to use to find the end node of the relationship',
            default: false,
        },

        cards: {
            type: Boolean,
            description: 'Show the overviews inside a card?',
            default: false,
        },

        // TODO: Pagination?
    },

    data: () => ({
        error: false,
        loading: true,
        result: false,
    }),

    created() {
        this.load();
    },
    computed: {
        outerComponent() {
            return this.cards ? 'n4ja-card' : 'div'
        },
        innerComponent() {
            return this.cards ? 'n4ja-card-body' : 'template'
        },
    },

    methods: {
        load() {
            this.result = false;
            this.error = false;
            this.loading = true;

            this.$neo4j.run(this.cypher)
                .then(res => this.result = res)
                .catch(e => this.error = e)
                .finally(() => this.loading = false)
        },
    },

    watch: {
        query() {
            this.load();
        },
    },
}
</script>