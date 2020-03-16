<template>
    <div class="n4ja-cypher-table">
        <n4ja-loading v-if="loading" />

        <div class="alert alert-error" v-if="error">
            {{ error }}
        </div>

        <n4ja-table
            v-if="result && result.records.length"
            :result="result"
            :columns="columns"
            :index="index"
            :noResults="noResults"
            :actions="actions"
        />

        <div class="no-results" v-if="result && !result.records.length" v-html="noResults" />
    </div>
</template>

<script>
import CypherMixins from './CypherMixins'

export default {
    name: 'n4ja-cypher-table',
    mixins: [ CypherMixins, ],
    props: {
        context: {
            type: [ String, Array, ],
            description: 'The context in which this table is being displayed',
            default: () => ['n4ja-table'],
        },

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

        actions: {
            type: [ Array, Function ],
            description: 'Actions to append to the end of a table row {to, text, onClick, icon, class}',
            default: () => [],
        },

        // TODO: Pagination?
    },
}
</script>