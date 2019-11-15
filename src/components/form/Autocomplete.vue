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
                <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
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


        <ul class="suggestions" v-if="suggestions.length">
            <li
                v-for="suggestion in suggestions" 
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

        template: {
            type: [ String, Function ],
            description: 'Template for displaying results - either the property name as a string or a function that returns a string',
            // default: node => Object.values(node.properties).join(', '),
        },


        value: null,

        onChange: Function,

    },

    data: () => ({
        loading: false,

        input: '',
        suggestions: [],
    }),

    methods: {
        search() {
            if ( !this.input || this.input.length == 0 ) {
                this.suggestions = []
                return
            }

            const query = `
                MATCH (n:\`${this.label}\`) WHERE n.\`${this.property}\` STARTS WITH $input
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

<style lang="scss">
.n4ja-autocomplete {
    position: relative;

    &.has-suggestions input {
        border-bottom-left-radius: 0px !important;
        border-bottom-right-radius: 0px !important;
    }

    ul {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        margin: -1px 0 0;
        padding: 0;

        background: #fff;
        border: 1px solid rgba(34,36,38,.15);
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;

        li {
            padding: 12px;
            margin: 0;
            list-style-type: none;
            border-bottom: 1px solid rgba(34,36,38,.07);

            &:hover {
                background: #f2f2f2;
            }
        }
    }

    .selected {
        display: flex;
        justify-content: space-between;

        .n4ja-node-overview {
            flex: 0 1 auto;
        }

        .remove {
            flex: 0;
            width: 24px !important;
            padding: 0;
            border: 0px none;
            background: transparent;
        }
    }

   
}
</style>