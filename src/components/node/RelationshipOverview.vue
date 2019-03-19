<template>
    <n4ja-card v-if="pages >= 1 || noResultsText">
        <n4ja-card-header
            :header="headerText"
            :count="count"
        />

        <n4ja-card-body>
            <component
                :is="overviewComponent"
                v-for="id in currentNodes"
                :key="id" 
                :id="id"
                :title="nodeTitle"
                :titleTag="nodeTitleTag"
                :caption="nodeCaption"
                :context="[ context, type ]"
                :picture="nodePicture"
                :pictureDefault="nodePictureDefault"
                :ignoreProperties="ignoreProperties"
                :ignoreRelationships="ignoreRelationships"
                :bloomPhrase="bloomPhrase"
                :viewRoute="viewRoute"
                :query="nodeQuery"
            />

            <div class="no-results" v-if="pages == 0">
                {{ noResultsText }}
            </div>

            <div class="n4ja-pagination" v-if="pages > 1">
                <div class="ui grid">
                    <div class="column">
                        <span class="page">
                            Page {{ page }}
                        </span>
                        
                        <button
                            class="btn btn-tertiary ui button tertiary"
                            v-if="page > 1"
                            @click.prevent="previous"
                        >
                            Previous
                        </button>
                        <button
                            class="btn btn-tertiary ui button tertiary"
                            v-if="page < pages"
                            @click.prevent="next"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </n4ja-card-body>
    </n4ja-card>
</template>


<script>
import { v1 as neo4j } from 'neo4j-driver';

const TYPE_PLACEHOLDER = '{{TYPE}}';

export default {
    name: 'N4jaRelationshipOverview',
    props: {
        id: {
            type: [ String, Number ],
            description: 'ID of source Node',
        },
        header: {
            type: [ String, Function, Boolean ],
            description: 'The template string or function for generating the title text',
        },
        context: [ String, Array ],
        type: {
            type: String,
            description: 'Relationship Type',
        },
        query: {
            type: String,
            description: 'Query to load, should return `type` and `nodes` - an array of nodes or ids',
            default: `
                MATCH (node)-[r:${TYPE_PLACEHOLDER}]-(end)
                WHERE id(node) = $id
                RETURN type(r) AS type, collect( id(end) ) AS nodes
            `
        },
        limit: {
            type: Number,
            default: 3, //2,
            description: 'Limit of records to show at any time',
        },

        bloomPhrase: {
            type: String,
            description: 'Search Phrase to open up bloom',
        },
        viewRoute: {
            type: String,
            description: 'Route name for View button',
        },

        nodeQuery: {
            type: String,
            description: 'Query for loading node data from relationship',
            default: `
                MATCH (n) WHERE id(n) = {id}
                OPTIONAL MATCH (n)-[r]-(o)
                WITH n, type(r) AS type, collect(o) AS nodes
                WITH n, collect({key: type, value: nodes, type: 'relationship'}) AS relationships
                UNWIND keys(n) AS key
                RETURN n, collect({key: key, value: n[ key ], type: 'property'}) + relationships as details
            `,
        },
        nodeTitle: {
            type: [ String, Function, Boolean ],
            description: 'The template string or function for generating the node card title text',
            default: '$name',
        },
        nodeTitleTag: {
            type: String,
            description: 'The tag to use for the node title',
            default: 'h3',
        },
        nodeCaption: {
            type: [ String, Function, Boolean ],
            description: 'The template string or function for generating the node card caption text',
        },
        nodePicture: {
            type: [ String, Function, Boolean ],
            description: 'The template string or function for generating the title text',
        },
        nodePictureDefault: {
            type: [ String, Function, Boolean ],
            description: 'Default picture to show if the image returns null',
        },

        ignoreProperties: {
            type: Array,
            description: 'Properties to ignore in card',
        },
        ignoreRelationships: {
            type: Array,
            description: 'Relationships to ignore in card',
        },

        noResultsText: {
            type: String,
            description: 'Text to display when there are no results.  If this is omitted, the entire component will be hidden',
        },
    },

    data() {
        return {
            page: 1,
            loading: true,

            nodes: [],
        };
    },
    created() {
        this.load();
    },

    computed: {
        overviewComponent() {
            return this.getContextComponent('n4ja-node-overview', [ this.context, this.type ]);
            
        },
        headerText() {
            // TODO: What if this.title is a function?
            return this.header || this.type;
        },
        cleanedQuery() {
            if ( this.query.includes(TYPE_PLACEHOLDER) ) {
                return this.query.replace(TYPE_PLACEHOLDER, this.type);
            }

            return this.query;
        },
        currentNodes() {
            const floor = ( this.page - 1 ) * this.limit;
            const ceiling = floor + this.limit;
            return this.nodes.slice(floor, ceiling);
        },
        pages() {
            return Math.ceil(this.nodes.length / this.limit);
        },
        count() {
            return this.nodes.length;
        }
    },

    methods: {
        load() {
            const params = { id: neo4j.int(this.id) };

            this.$neo4j.run(this.cleanedQuery, params)
                .then(res => {
                    this.loading = false;

                    if ( res.records.length ) {
                        this.nodes = res.records[0].get('nodes')
                            .map(id => neo4j.isInt(id) ? id.toNumber() : id);
                    }
                });
        },
        next() {
            if ( this.page < this.pages ) {
                this.page++;
            }
        },
        previous() {
            if ( this.page > 1 ) {
                this.page--;
            }
        },
    },
    watch: {
        id() {
            this.load();
        },
        type() {
            this.load();
        },
        query() {
            this.load();
        },
    },
}
</script>
