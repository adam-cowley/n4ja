<template>
    <component :is="getContextComponent()" class="n4ja-node-overview" :class="getClasses()">
        <n4ja-entity-header
            :context="context"

            :name="name"
            :caption="caption"
            :picture="picture"

            :nameTag="nameTag"
            :captionTag="captionTag"

            :onClick="handleClick"
        />
    </component>
</template>

<script>
/**
 * The Node Overview will display top line information about a node based on global config.
 * Where possible, it will attempt to find a component based on the context
 * - n4ja-node-overview-{context} eg:
 *   - n4ja-node-overview-actor-acted-in-movie => Custom display for a Movie listed on an Actor's profile
 *   - n4ja-node-overview-movie => Custom display for a Movie
 * 
 * - Node Header
 *   - Picture/Icon
 *   - Name
 *   - Caption
 * 
 */

import EntityComponent from '../../EntityComponent'
import ContextComponent from '../../ContextComponent'

const defaults = {
    labels: false,
    name: false,
    caption: false,
    picture: false,
    cover: false,
};

export default {    
    name: 'n4ja-node-overview',
    mixins: [ EntityComponent, ContextComponent, ],

    props: {
        context: {
            type: [ Array, String, ],
            description: 'The context in which this node is being displayed',
        },

        nameTag: {
            type: String,
            description: 'HTML element for the name',
            default: 'h3',
        },
        captionTag: {
            type: String,
            description: 'The HTML element for the caption',
            default: 'p',
        },

        node: {
            type: Object,
            description: 'Node to display in this component',
        },
        relationships: {
            type: Object,
            description: 'Eagerly loaded relationships to use in the details',
        },
    },

    mounted() {
        this.setDataFromNode()
    },

    data() {
        return {
            mapping: this.$n4ja.getNodeConfig(this.node),

            ...defaults,
        }
    },

    methods: {
        setDataFromNode() {
            this.setData(this.mapping, this.node.properties)
        },
        getClasses() {
            return [
                `n4ja-node-overview-${this.context.join('-').toLowerCase()}`,
                `n4ja-node-overview-${this.node.labels.join('-').toLowerCase()}`,
                ...this.node.labels.map(label => `n4ja-node-overview-${label.toLowerCase()}` )
            ]
        },
        handleClick() {
            if ( this.mapping.route ) {
                this.$router.push({
                    name: this.mapping.route,
                    params: { _id: this.node.identity.toNumber(), },
                })
            }
        },
    },

    watch: {
        context() {
            this.setDataFromNode()
        },
        node() {
            this.setDataFromNode()
        },
    },
}
</script>