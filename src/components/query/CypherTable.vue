<template>
    <n4ja-card>
        <n4ja-card-header
            :header="header"
            :headerTag="headerTag"
        />
        <n4ja-card-body>
            <n4ja-loading v-if="loading" />

            <n4ja-table v-if="!loading && records.length">
                <thead slot="header">
                    <tr>
                        <n4ja-key
                            v-for="header in allHeaders"
                            :key="header.name"
                            :name="header.name"
                            :class="header.class"
                            tag="th"
                        />
                    </tr>
                </thead>
                <tr slot="body" v-for="(row, index) in records" :key="index">
                    <td 
                        v-for="header in headers" 
                        :key="header.name + index"
                        :class="header.name"
                    >
                        <n4ja-value
                            :type="type"
                            :name="name"
                            :value="row[ header.name ]"
                        />
                    </td>
                    <td
                        class="action"
                        v-for="action in rowActions"
                        :key="index + action.text"
                    >
                        <Action
                            :action="action"
                            :value="row"
                            :id="row._id"
                        />
                    </td>
                </tr>
            </n4ja-table>
            <div class="no-more-results" v-else-if="!loading && records && records.length == 0 && page > 1">
                <div class="grid">
                    <div class="column col text-center">
                        {{ noMoreResultsText }}
                    </div>
                </div>
            </div>
            <div class="no-results" v-else-if="!loading && records && records.length == 0">
                <div class="grid">
                    <div class="column col text-center">
                        {{ noResultsText }}
                    </div>
                </div>
            </div>
            
        </n4ja-card-body>
        <n4ja-card-footer
            v-if="allFooterActions.length"
            :actions="allFooterActions"
        />
    </n4ja-card>
</template>


<script>
import { v1 as neo4j } from 'neo4j-driver';

import Action from '../ui/Action.vue';


// import { v1 as neo4j } from 'neo4j-driver';

const IDENTIFIER = '_id';

export default {
    name: 'N4jaCypherTable',
    components: {
        Action,
    },
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
        // viewRoute: {
        //     type: String,
        //     description: 'Vue Router Link',
        // },

        context: {
            type: [ Array, String ],
        },

        type: {
            type: String, 
            description: 'Type of data in the table (node, relationship)',
        },
        name: {
            type: String,
            description: 'The name of the node or relationship',
        },


        /**
         * {
         *   route: "",             // vue-router link name
         *   onClick: fn,           // OR... action for click
         *   text: "Click me",      // Text for button - text or function
         *   variant: "primary",    // Button variant
         *   class: "btn-primary"   // Button class - text or function
         * }
         */
        rowActions: {
            type: Array,
            description: 'Action columns',
            default: () => [],
        },

        /**
         * {
         *   route: "",             // vue-router link name
         *   onClick: fn,           // OR... action for click
         *   text: "Click me",      // Text for button - text or function
         *   variant: "primary",    // Button variant
         *   class: "btn-primary"   // Button class - text or function
         * }
         */
        footerActions: {
            type: Array,
            description: 'Action columns',
            default: () => [],
        },

        callToActionRoute: {
            type: String,
            description: 'Named route for the Call to Action',
        },
        callToActionText: {
            type: String,
            default: 'Go',
            description: 'text in call to action',
        },
        viewText: {
            type: String,
            description: 'Text on link to the right of the list',
            default: 'View',
        },
        bloomText: {
            type: String,
            default: 'Open in Bloom',
            description: 'Text to display in Bloom link',
        },
        bloomPhrase: {
            type: String,
            description: 'Phrase to open in Bloom',
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
    created() {
        this.load();
    },
    data() {
        return {
            loading: false,
            records: [],
            headers: [],

            skip: 0,

            page: 1,
        }
    },
    methods: {
        openBloom(row) {
            this.openBloomWithPhrase(this.generateBloomPhrase(row));
        },
        generateBloomPhrase(row) {
            // TODO: Refactor this into display.js version
            return Object.keys(row).reduce((phrase, key) => {
                return phrase.replace(`$${key}`, row[ key ]);
            }, this.bloomPhrase);
        },
        generateFields(keys) {
            const fields = keys.filter(k => k != IDENTIFIER)
                .map(key => {
                    return { key, label: key, class: key };
                });

            // Add View Link?
            if ( this.viewRoute ) {
                fields.push({
                    key: 'view',
                    label: '',
                    class: 'view',
                });
            }

            // Link to Bloom?
            if ( this.bloomPhrase ) {
                fields.push({
                    key: 'bloom',
                    label: '',
                    class: 'bloom',
                });
            }

            return fields;
        },
        load() {
            this.loading = true;

            const limit = this.limit;
            const skip = (this.page - 1) * limit;

            const query = `${this.query} SKIP ${skip} LIMIT ${limit}`;

            return this.$neo4j.run(query, this.params)
                .then(res => {
                    this.result = res;
                    this.records = res.records.map(row => {
                        let output = {};

                        row.keys.forEach(key => {
                            let value = row.get(key);

                            if ( neo4j.isInt(value) ) {
                                value = value.toNumber();
                            }

                            output[ key ] = value;
                        });

                        return output;
                    });
                    this.setHeaders();
                })
                .then(() => this.loading = false);
        },
        // This was originally a computed property but for some reason it wouldn't reload
        setHeaders() {
            this.headers = this.result.records[0].keys.filter(a => a !== IDENTIFIER)
                .map(name => {
                    return { name };
                });
        },
        previous() {
            if ( this.page > 1 ) {
                this.page--;
            }
        },
        next() {
            this.page++;
        },
    },
    computed: {
        // headers() {
        //     console.log('headers done')
        //     // if ( this.result && this.result.records.length ) {
        //         return this.result.records[0].keys.filter(a => a !== IDENTIFIER)
        //             .map(name => {
        //                 return { name };
        //             });
        //     // }

        //     // return [];
        // },
        actionHeaders() {
            return this.rowActions.map(() => {
                return { class: 'action' };
            });
        },
        allHeaders() {
            return this.headers.concat(this.actionHeaders);
        },
        allFooterActions() {
            const output = this.footerActions.slice();

            if ( this.pagination && this.page > 1 ) {
                output.push({
                    variant: 'secondary',
                    class: 'btn btn-pagination btn-previous btn-no-flex',
                    text: this.previousText,
                    onClick: this.previous,
                });
            }

            if ( this.pagination && this.records.length == this.limit ) {
                output.push({
                    variant: 'secondary',
                    class: 'btn btn-pagination btn-no-flex',
                    text: this.nextText,
                    onClick: this.next,
                });
            }

            return output;
        }
    },
    watch: {
        query() {
            this.load();
        },
        params() {
            this.load();
        },
        page() {
            this.load();
        },
    },

}
</script>
