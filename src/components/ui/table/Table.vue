<template>
    <table class="ui table">
        <thead>
            <tr>
                <th v-if="index">#</th>
                <th v-for="key in columns" :key="key">
                    <n4ja-key tag="span" :context="context" :config="{ key }" />
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, idx) in rows" :key="idx">
                <td v-if="index">{{ idx + 1 }} </td>

                <n4ja-value tag="td" v-for="key in columns" :key="key" :value="row[ key ]" :context="context" />
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'n4ja-table',

    props: {
        result: {
            type: null,
            description: 'Neo4j Driver Result',
        },
        context: {
            type: [ String, Array, ],
            description: 'The context in which this table is being displayed',
            default: () => ['n4ja-table'],
        },

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
    },

    computed: {
        rows() {
            return this.result.records.map(row => {
                return Object.fromEntries( this.columns.map(column => [ column, row.has(column) ? row.get(column) : null ])  );
            })
        },
    },
}
</script>