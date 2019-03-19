<template>
    <div class="n4ja-search">
        <n4ja-loading v-if="searching" />
        
        <!-- search form -->
        <n4ja-grid>
            <n4ja-column columns="6" sm="6">
                <component :is="headerTag">{{ header }}</component>
            </n4ja-column>
            <n4ja-column columns="6" sm="6">
                <form class="column ui form search-form" @submit.prevent="handleSearch">
                    <div class="ui input">
                        <input v-model="query" :placeholder="placeholderText">
                    </div>
                    <button class="ui primary button" type="submit">
                        {{ searchText }}
                    </button>
                </form>
            </n4ja-column>
        </n4ja-grid>

        <!-- results -->
        <n4ja-grid v-if="!results" slot="instructions">
            <n4ja-column>
                {{ instructions }}
            </n4ja-column>
        </n4ja-grid>

        <n4ja-grid v-else-if="results && results.length == 0 && page > 1" slot="noMoreResults">
            <n4ja-column>
                {{ noMoreResultsTest }}
            </n4ja-column>
        </n4ja-grid>

        <n4ja-grid v-else-if="results && results.length == 0" slot="noResults">
            <n4ja-column>
                {{ noResultsText }}
            </n4ja-column>
        </n4ja-grid>

        <n4ja-grid deck v-else-if="results && results.length">
            <n4ja-column
                columns="4" 
                sm="12" 
                md="6" 
                lg="4"
                v-for="id in results"
                :key="id"
            >
                <component 
                    :is="cardComponent"
                    
                    :id="id"    

                    :context="context"

                    :title="title"
                    :bloomPhrase="bloomPhrase"
                    :viewRoute="viewRoute"

                    :query="resultQuery"

                    :picture="picture"
                    :pictureDefault="pictureDefault"

                    :ignoreProperties="ignoreProperties"
                    :ignoreRelationships="ignoreRelationships"
                    :valueLimit="valueLimit"
                    :moreValuesText="moreValuesText"
                />
            </n4ja-column>
        </n4ja-grid>

        <n4ja-grid class="n4ja-pagination" v-if="results && results.length || page > 1">
            <n4ja-column>
                <button
                        class="btn btn-tertiary ui button tertiary"
                        v-if="page > 1"
                        @click.prevent="previous"
                    >
                        Previous
                    </button>
                    <button
                        class="btn btn-tertiary ui button tertiary"
                        v-if="results.length == limit"
                        @click.prevent="next"
                    >
                        Next
                    </button>
            </n4ja-column>
        </n4ja-grid>

    </div>
</template>

<script>
export default {
    name: 'n4ja-search',

    props: {
        
        context: {
            type: [ Array, String, ],
            description: 'Context (label, relationship etc)',
        },

        /**
         * Header
         */
        header: {
            type: String,
            description: 'Page Header',
            description: 'Search',
        },
        headerTag: {
            type: [ String, Object, ],
            description: 'Tag to use in header'
        },

        placeholderText: {
            type: String,
            description: 'Text to display as input placeholder',
        },
        searchText: {
            type: String,
            description: 'Text to display on search button',
            default: 'Search',
        },

        /**
         * Search
         */
        search: {
            // this.search(context = {
            //   operator,
            //   query,
            //   page,
            //   limit,
            //   skip
            // })
            type: Function,
            description: 'Function executed when the search button is clicked',
            default: c => {
                console.log('You must have forgotten to implement a search function...', c);
                return Promise.resolve([]);
            },
        },
        limit: {
            type: Number,
            description: 'Search',
            default: 6,
        },
        pagination: {
            type: Boolean,
            description: 'Should pagination buttons be shown?',
            default: false,
        },
        initialPopulation: {
            type: Boolean,
            description: 'Run the search on load?',
            default: false,
        },

        /**
         * Results
         */
        instructions: {
            type: String,
            description: 'Text to display before a search has been run',
        },

        noResultsText: {
            type: String,
            description: 'Text to display when there are no results',
            default: 'No Results',
        },
        noMoreResultsTest: {
            type: String,
            description: 'Text to display when the offset exceeds the total number of rows',
            default: 'No more results.  Try clicking the back button...',
        },
        resultQuery: {
            type: String,
            description: 'The query to run in the resulting NodeCards',
        },

        /**
         * Card
         */
        title: {
            type: [ String, Function, Boolean ],
            description: 'The template string or function for generating the title text',
            default: '$name',
        },
        caption: {
            type: [ String, Function, Boolean ],
            description: 'The template string or function for generating the title text',
        },
        picture: {
            type: [ String, Function, Boolean ],
            description: 'The template string or function for generating the title text',
        },
        pictureDefault: {
            // type: [ String, Function, Boolean ],
            description: 'Default picture to show if the image returns null',
        },

        bloomPhrase: {
            type: String,
            description: 'Phrase to open up in bloom',
        },
        bloomText: {
            type: String,
            description: 'Text to display in the Bloom link',
            default: 'Open in Bloom',
        },
        viewRoute: {
            type: String,
            description: 'vue-router Route for "View" link',
        },
        viewText: {
            type: String,
            description: 'Text to display in the View link',
        	default: 'View',
        },
        ignoreProperties: {
            type: Array,
            description: 'Nodes and properties to exclude from card',
            default: () => [],
        },
        ignoreRelationships: {
            type: Array,
            description: 'Nodes and properties to exclude from card',
            default: () => [],
        },
        valueLimit: {
            type: [ Number, String ],
            description: 'Number of relationship entities to show',
        },
        moreValuesText: {
            type: [ Function, Number, String ],
            description: 'Number of relationship entities to show',
            default: count => `+ ${count} More&hellip;`,
        },
    },
    data() {
        return {
            query: '',
            page: 1,
            searching: false,

            results: false,
        };
    },
    created() {
        if ( this.initialPopulation ) {
            this.handleSearch();
        }
    },
    computed: {
        cardComponent() {
            return this.getContextComponent('n4ja-node-card', this.context);
        },
        searchContext() {
            const skip = (this.page - 1) * this.limit;

            return {
                query: this.query,
                page: this.page,
                limit: this.limit,
                skip,
            };
        },
    },
    methods: {
        next() {
            this.page = this.page + 1;
            this.getResults();
        },
        previous() {
            this.page = this.page - 1;
            this.getResults();
        },
        // TODO: Error Handling
        handleSearch() {
            this.page = 1;

            this.getResults();
        },
        getResults() {
            this.searching = true;

            this.search(this.searchContext)
                .then(results => {
                    this.results = results;
                })
                .then(() => this.searching = false);
        },
    },
}
</script>

<style lang="scss">

.n4ja-search {
    .n4ja-grid .n4ja-column {
        flex: 1 0 auto;
    }

    h2 {
        margin-bottom: 12px;
    }

    .search-form {
        display: flex !important;
        flex-direction: row;
    }

    .search-form .input {
        flex: 1;
    }
    .search-form button {
        flex: 0;
    }

    .search-form input {
        border-right-width: 0;
        border-top-right-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
    }
    .search-form button {
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
    }
}
</style>
