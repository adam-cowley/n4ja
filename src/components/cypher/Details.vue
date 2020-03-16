<template>
    <n4ja-grid deck class="n4ja-cypher-overviews">
        <n4ja-loading v-if="loading" />

        <n4ja-column v-if="error" columns="12">
            <div class="alert alert-error" v-if="error">
                {{ error }}
            </div>
        </n4ja-column>

        <n4ja-column v-if="result && !result.records.length" columns="12">
            <n4ja-card>
                <n4ja-card-body class="no-results" v-html="noResults" />
            </n4ja-card>
        </n4ja-column>

        <template v-if="result && result.records.length">
            <n4ja-column
                v-for="(row, id) in result.records"
                :key="id"
                :columns="columns"
            >
                <component :is="outerComponent">
                    <component :is="innerComponent">
                        <n4ja-node-details
                            v-if="row.has(node)"
                            :context="context"
                            :node="row.get(node)"
                            :relationships="relationships && row.has(relationships) ? row.get(relationships) : null"
                        />
                    </component>
                </component>
            </n4ja-column>
        </template>
    </n4ja-grid>
</template>

<script>
import CypherMixins from './CypherMixins'

export default {
    name: 'n4ja-cypher-details',
    mixins: [ CypherMixins, ],
    props: {
        context: {
            type: [ String, Array, ],
            description: 'The context in which this table is being displayed',
            default: () => ['n4ja-cypher-overviews'],
        },

        cypher: String,
        params: {
            type: Object,
            default: () => ({}),
        },

        columns: {
            type: Number,
            description: 'The number of columns for each result to take up',
            default: 12,
        },
        relationships: {
            type: String,
            description: 'result key that holds the relationships',
        },
        index: {
            type: Boolean,
            description: 'Show an index column at the start of the row',
        },

        node: {
            type: [ String, Boolean, ],
            description: 'The result key to use to find the node to display an overview for',
            default: false,
        },

        relationships: {
            type: [ String, Boolean, ],
            description: 'The result key to use to find the map of relationships to use in the details presentation',
            default: false,
        },

        cards: {
            type: Boolean,
            description: 'Show the overviews inside a card?',
            default: false,
        },

        // TODO: Pagination?
    },
    computed: {
        outerComponent() {
            return this.cards ? 'n4ja-card' : 'div'
        },
        innerComponent() {
            return this.cards ? 'n4ja-card-body' : 'template'
        },
    },
}
</script>