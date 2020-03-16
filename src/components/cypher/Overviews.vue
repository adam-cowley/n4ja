<template>
    <n4ja-grid deck class="n4ja-cypher-overviews">
        <n4ja-loading v-if="loading" />

        <n4ja-column v-if="error" columns="12">
            <div class="alert alert-error" v-if="error">
                {{ error }}
            </div>
        </n4ja-column>

        <n4ja-column v-if="result && !result.records.length" columns="12">
            <div class="no-results" v-html="noResults" />
        </n4ja-column>

        <template v-if="result && result.records.length">
            <n4ja-column
                v-for="(row, id) in result.records"
                :key="id"
                :columns="columns"
            >
                <component :is="outerComponent">
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
            </n4ja-column>
        </template>
    </n4ja-grid>
</template>

<script>
import CypherMixins from './CypherMixins'

export default {
    name: 'n4ja-cypher-overviews',
    mixins: [ CypherMixins, ],
    props: {
        context: {
            type: [ String, Array, ],
            description: 'The context in which this table is being displayed',
            default: () => ['n4ja-cypher-overviews'],
        },

        columns: {
            type: Number,
            description: 'The number of columns for each result to take up',
            default: 12,
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