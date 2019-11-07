<template>
    <div class="n4ja-node-overview">
        <component
            v-if="overviewComponent"
            :is="overviewComponent"
            :class="classes"

            :id="id"
            :context="context"
            :title="title"
            :titleTag="titleTag"
            :caption="caption"
            :picture="picture"
            :pictureDefault="pictureDefault"
            :bloomPhrase="bloomPhrase"
            :bloomText="bloomText"
            :viewRoute="viewRoute"
            :viewText="viewText"

            :node="node"
        >
            <n4ja-value-image
                v-if="picture || pictureDefault"
                :value="node"
                :src="picture"
                :defaultSrc="pictureDefault"
            />
            
            <component
                :is="titleTag"
            >
                <router-link v-if="to" :to="to" v-html="titleText" />
                <template v-else>
                    {{ titleText }}
                </template>
            </component>
            
            <n4ja-labels :labels="labels" />
            <n4ja-id :id="id" />
        </component>
        

        <div
            v-else
            :class="classes"
        >
            <n4ja-value-image
                v-if="picture || pictureDefault"
                :value="node"
                :src="picture"
                :defaultSrc="pictureDefault"
            />
            
            <component
                :is="titleTag"
            >
                <router-link v-if="to" :to="to" v-html="titleText" />
                <template v-else>
                    {{ titleText }}
                </template>
            </component>
            
            <n4ja-labels :labels="labels" />
            <n4ja-id :id="id" />
        </div>
    </div> 
</template>

<script>
import { v1 as neo4j } from 'neo4j-driver';

export default {
    name: 'N4jaNodeOverview',
    props: {
        id: {
            type: [ String, Number ],
            description: 'The Internal ID of the node',
        },
        context: {
            type: [ String, Array ],
            description: 'The context in which this node is being displaued',
        },
        title: {
            type: [ String, Function, Boolean ],
            description: 'The template string or function for generating the title text',
            default: '$name',
        },
        titleTag: {
            type: String,
            description: 'HTML element for the title tag',
            default: 'h3',
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
            type: [ String, Function, Boolean ],
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
        overviewComponent() {
            const base = 'n4ja-node-overview';
            const custom  = this.getContextComponent(base, this.castContext.concat(this.node.labels));

            return base !== custom ? custom : false;
        },
        classes() {
            const baseClass = 'n4ja-node-overview';

            return `${baseClass} ${this.picture || this.pictureDefault ? 'has-picture' : 'no-picture'} ${this.labels && this.labels.map(e => `${baseClass}-${e.toLowerCase()}`).join(' ')}`
        },
        titleText() {
            const formatted = this.format(this.title, this.node);
            return formatted && formatted != '' ? formatted : this.id;
        },
        labels() {
            return this.node.labels;
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
        to() {
            const params = { _id: this.id, };
            if ( this.viewRoute ) {
                return {
                    name: this.viewRoute,
                    params
                };
            }
            else if ( this.node.labels ) {
                let name = false;

                // TODO: Priorities
                this.node.labels.forEach(label => {
                    if ( this.$n4ja.options.labels[ label ] && this.$n4ja.options.labels[ label ].viewRoute ) {
                        name = this.$n4ja.options.labels[ label ].viewRoute
                    }
                });

                if ( name ) {
                    return {
                        name,
                        params,
                    };
                }
            }
            
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

<style lang="scss">
.n4ja-card .card-body {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .n4ja-node-overview {
        // display: flex;
        flex: 0 1 50%;
        justify-content: center;
        flex-direction: column;
        margin: 0 0 25px;

        .n4ja-node-overview {
            padding-right: 8px;
        }

        .n4ja-value-image {
            float: left;
            width: 64px;
            margin-right: 12px;

            img, svg {
                width: 64px;
            }
        }

        .n4ja-id {
            font-size: 12px;
        }
        .n4ja-labels {
            float: right;
        }

        // &:nth-child(odd) {
        //     clear: both;
        // }
    }

    .n4ja-pagination {
        width: 100%;
        clear: both;
        border-top: 1px solid rgba(34,36,38,.1);
        padding-top: 6px;
        text-align: right;

        .page {
            float: left;
            padding: 8px 0 0;
        }
    }
}
</style>

