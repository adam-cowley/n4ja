<template>
    <n4ja-card>
        <n4ja-card-header
            :header="header"
            :headerTag="headerTag"
        />
        <n4ja-card-body>
            <n4ja-loading v-if="loading" />
            <n4ja-comparison-bar-table
                v-if="!loading && records.length"
                :data="records" 
                :valueHeader="valueHeader"
                :countHeader="countHeader"
                :leftHeader="leftHeader"
                :rightHeader="rightHeader"
                :percentageLeftHeader="percentageLeftHeader"
                :percentageRightHeader="percentageRightHeader"
                :countsKey="countsKey"
                :countKey="countKey"
                :valueKey="valueKey"
                :groupKey="groupKey"
                :leftGroup="leftGroup"
                :rightGroup="rightGroup"
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
    name: 'n4ja-cypher-comparison-bar-table',

    props: {
        query: String,
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
       
        noResultsText: {
            type: String,
            description: 'Message shown when no results are returned',
            default: 'No results',
        },

        valueHeader: {
            type: String,
            default: 'Value',
        },
        countHeader: {
            type: String,
            default: 'Count',
        },
        leftHeader: {
            type: String,
            default: 'Left',
        },
        rightHeader: {
            type: String,
            default: 'Right',
        },

        percentageLeftHeader: {
            type: String,
            default: '%',
        },
        percentageRightHeader: {
            type: String,
            default: '%',
        },

        countsKey: {
            type: String,
            default: 'counts',
        },
        countKey: {
            type: String,
            default: 'count',
        },
        valueKey: {
            type: String,
            default: 'value',
        },
        groupKey: {
            type: String,
            default: 'group',
        },
        leftGroup: {
            type: String,
            default: 'left',
        },
        rightGroup: {
            type: String,
            default: 'right',
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

            return this.$neo4j.run(this.query, this.params)
                .then(res => {
                    this.result = res;
                    this.records = res.records.map(row => {
                        let output = {};

                        row.keys.forEach(key => {
                            let value = this.toInt(row.get(key));

                            value = this.toInt(value);

                            

                            console.log(value);

                            output[ key ] = value;
                        });

                        return output;
                    });
                })
                .then(() => this.loading = false);
        },
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



