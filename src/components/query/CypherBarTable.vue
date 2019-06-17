<template>
    <n4ja-card class="n4ja-table-card">
        <n4ja-card-header
            :header="header"
            :headerTag="headerTag"
        />
        <n4ja-card-body>
            <n4ja-loading v-if="loading" />

            <n4ja-bar-table
                v-if="!loading && records.length"
                :data="records"
                :countHeader="countHeader"
                :valueHeader="valueHeader"
                :countKey="countKey"
                :valueKey="valueKey"
            />

            <div class="no-results" v-else-if="!loading && records && records.length == 0">
                <div class="grid">
                    <div class="column col text-center">
                        {{ noResultsText }}
                    </div>
                </div>
            </div>
        </n4ja-card-body>
    </n4ja-card>
</template>


<script>
import { v1 as neo4j } from 'neo4j-driver';


export default {
    name: 'N4jaCypherBarTable',
    props: {
        header: {
            type: String,
            description: 'Text displayed in the header',
        },
        headerTag: {
            type: String,
            description: 'Tag to use in the header',
            default: 'strong',
        },
       
        noResultsText: {
            type: String,
            description: 'Message shown when no results are returned',
            default: 'No results',
        },
        
        query: {
            type: String,
            description: 'Cypher query to populate the table (Limit & Skip will be added later on)',
        },
        params: {
            type: Object,
            description: 'Parameters to pass to the query',
            default: () => {},
        },
        limit: {
            type: Number,
            description: 'Number of rows to display in the table',
            default: 10,
        },
        
        countHeader: {
            type: String,
            default: 'Count',
        },
        valueHeader: {
            type: String,
            default: 'Value',
        },
        countKey: {
            type: String,
            default: 'count',
        },
        valueKey: {
            type: String,
            default: 'value',
        },

    },
    created() {
        this.load();
    },
    data() {
        return {
            loading: false,
            records: [],
        }
    },
    methods: {
        load() {
            this.loading = true;

            const limit = this.limit;
            const skip = (this.page - 1) * limit;

            const query = `${this.query} LIMIT ${limit}`;

            return this.$neo4j.run(query, this.params)
                .then(res => {
                    this.result = res;
                    this.records = res.records.map(row => {
                        let output = {};

                        row.keys.forEach(key => {
                            let value = this.toInt( row.get(key) );

                            output[ key ] = value;
                        });

                        return output;
                    });
                })
                .then(() => this.loading = false);
        },
    },
    computed: {
       
    },
    watch: {
        query() {
            this.load();
        },
        params() {
            this.load();
        },
    },

}
</script>
