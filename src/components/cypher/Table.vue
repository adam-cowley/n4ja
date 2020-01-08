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
        />

        <div class="no-results" v-if="result && !result.records.length" v-html="noResults" />
    </div>
</template>

<script>
export default {
    name: 'n4ja-cypher-table',

    props: {
        context: {
            type: [ String, Array, ],
            description: 'The context in which this table is being displayed',
            default: () => ['n4ja-table'],
        },

        cypher: String,
        
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