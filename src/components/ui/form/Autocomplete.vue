<template>
    <div class="field n4ja-autocomplete" :class="{'loading-suggestions':loading, 'has-suggestions': suggestions.length}">
        <input
            v-if="!value"
            v-model="input"
            @keyup="search"
        />

        <div class="selected" v-else>
            <n4ja-node-overview
                :node="value"
                :context="['Search']"
            />
            <button class="remove" @click.prevent="handleRemove">
                <svg width="24px" height="24px" viewBox="0 0 24 24">
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                        <g id="Interface-Essential-/-Delete-/-delete-1" stroke="#000000" stroke-width="1.5">
                            <g id="Group">
                                <g id="delete-1">
                                    <circle id="Oval" cx="11.998" cy="12" r="11.25"></circle>
                                    <path d="M7.498,16.5 L16.497,7.5" id="Shape"></path>
                                    <path d="M16.498,16.5 L7.497,7.5" id="Shape"></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            </button>
        </div>

        <ul class="suggestions" v-if="filteredSuggestions.length">
            <li
                v-for="suggestion in filteredSuggestions" 
                :key="suggestion.identity.toNumber()"
                @click.prevent="handleSelect(suggestion)"
            >
                <n4ja-node-overview :node="suggestion" :context="['Search']" />
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'n4ja-autocomplete',
    props: {
        label: {
            type: String,
            description: 'The label to search on',
        },
        property: {
            type: String,
            description: 'The (indexed) property to search on',
            default: 'name',
        },
        condition: {
            type: String,
            description: 'What condition to search the regular index on - STARTS WITH, ENDS WITH, CONTAINS',
            default: 'CONTAINS',
        },
        fulltextIndex: {
            type: String,
            description: 'Name of the fulltext index to search on',
        },
        
        template: {
            type: [ String, Function ],
            description: 'Template for displaying results - either the property name as a string or a function that returns a string',
            // default: node => Object.values(node.properties).join(', '),
        },
        exclude: {
            type: [ Array, ],
            description: 'Options to exclude',
            default: () => [],
        },

        value: null,

        onChange: Function,
    },

    data: () => ({
        loading: false,

        input: '',
        suggestions: [],
    }),

    computed: {
        filteredSuggestions() {
            const exclude = this.exclude.map(n => n.identity.toNumber());
            
            return this.suggestions.filter(n => !exclude.includes( n.identity.toNumber() ) )
        },
    },
    methods: {
        search() {
            if ( !this.input || this.input.length == 0 ) {
                this.suggestions = []
                return
            }

            const query = this.fulltextIndex !== undefined ?
                `
                    CALL db.index.fulltext.queryNodes($index, $query) YIELD node, score
                    RETURN node AS n
                    ORDER BY score DESC
                ` : `
                    MATCH (n:\`${this.label}\`) WHERE n.\`${this.property}\` ${this.condition} $input
                    RETURN n ORDER BY n.\`${this.property}\` LIMIT 10
                `;

            const params = { input: this.input }

            this.loading = true;

            this.$neo4j.run(query, params)
                .then(res => {
                    this.suggestions = res.records.map(row => row.get('n'))

                    this.loading = false;
                })
        },
        handleSelect(node) {
            this.input = []
            this.suggestions = []
            this.onChange(node)
        },
        handleRemove() {
            this.suggestions = []
            this.handleSelect()
        },
    },
    watch: {
        value() {
            this.suggestions = []
        },
    },
}
</script>
