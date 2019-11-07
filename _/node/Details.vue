<template>
    <div class="node-details">
        <component
            :is="headerComponent"
            :id="id"
            :context="context"
            :node="node"
            :picture="picture"
            :pictureDefault="pictureDefault"
            :title="title"
        />

        <div class="card-body n4ja-card-body">
            <n4ja-property-list
                :id="id"
                :context="context"
                :node="node"
                :details="details"

                :ignoreProperties="ignoreProperties"
                :ignoreRelationships="ignoreRelationships"
                :valueLimit="valueLimit"
                :moreValuesText="moreValuesText"
            />

            <slot name="body" />
        </div>
    </div>
</template>

<script>
import { v1 as neo4j } from 'neo4j-driver';

export default {
    name: 'N4jaNodeDetails',
    props: {
        id: {
            type: [ String, Number ],
            description: 'The Internal ID of the node',
        },
        context: {
            type: [ Array, String, ],
            description: 'The context in which this card is being displayed',
        },
        
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
            type: [ String, Function, Boolean, Object ],
            description: 'The template string or function for generating the title text',
        },
        pictureDefault: {
            type: [ String, Function, Boolean, Object ],
            description: 'Default picture to show if the image returns null',
        },
        query: {
            type: String,
            description: 'Query for loading data',
            default: `
                MATCH (n) WHERE id(n) = {id}
                OPTIONAL MATCH (n)-[r]-(o)
                WITH n, type(r) AS type, collect(o) AS nodes
                WITH n, collect({key: type, value: nodes, type: 'relationship'}) AS relationships
                UNWIND keys(n) AS key
                RETURN n, collect({key: key, value: n[ key ], type: 'property'}) + relationships as details
            `,
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

        bloomPhrase: {
            type: String,
            description: 'Phrase to open Node in Bloom',
        },
        bloomText: {
            type: String,
            description: 'Text to display on the Bloom link',
            default: 'Open in Bloom',
        },

        viewRoute: {
            type: String,
            description: 'Route to send user to to view this user',
        },
        viewText: {
            type: String,
            description: 'Text to display on the View link',
            default: 'View',
        },

    },
    data() {
        return {
            loading: true,
            node: {},
            details: [],
        };
    },
    computed: {
        headerComponent() {

            return this.getContextComponent('n4ja-node-card-header', this.context);
        },

        titleText() {
            const formatted = this.format(this.title, this.node);
            return formatted && formatted != '' ? formatted : this.id;
        },
        footerActions() {
            const output = [];

            if ( this.bloomPhrase ) {
                output.push({
                    variant: 'warning',
                    class: 'btn btn-pagination float-right secondary',
                    text: this.bloomText,
                    onClick: this.openBloomPhrase,
                });
            }

            if ( this.viewRoute ) {
                output.push({
                    variant: 'info',
                    class: 'btn btn-pagination primary',
                    route: this.viewRoute,
                    text: this.viewText,
                });
            }

            return output;
        },
    },
    created() {
        this.$neo4j.run(this.query, {
            id: neo4j.int(this.id),
        })
            .then(res => {
                const record = res.records[0];

                this.loading = false;
                this.node = record.get('n');

                this.details = !record.keys.includes('details') 
                    ? []
                    : record.get('details')
                        .filter(a => {
                            return a.type == 'property' ? !this.ignoreProperties.includes( a.key ) : !this.ignoreRelationships.includes( a.key )
                        })
                        .sort((a, b) => a.key || a.type < b.key || a.type ? -1 : 1);
            });
    },
    methods: {
        handleViewClick() {
            const params = Object.assign({}, { _id: this.id, }, this.node.properties);

            this.$router.push({
                name: this.viewRoute,
                params,
            });
        },
    },
}
</script>

