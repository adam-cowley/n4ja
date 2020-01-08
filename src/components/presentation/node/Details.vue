<template>
    <component :is="getContextComponent()" class="n4ja-node-details" :data-id="node.identity.toNumber()">
        <n4ja-node-overview
            :context="context"
            :node="node"
            :relationships="relationships"
            
            :nameTag="nameTag"
            :captionTag="captionTag"
       />

       <div class="n4ja-details-container n4ja-node-details-container">
            <n4ja-detail
                v-for="(config, i) in mapping.details" 
                :key="detailKey(config, i)" 
                :config="config"
                :context="context"

                :node="node"
                :relationships="relationships"
            />
       </div>
    </component>
</template>

<script>
/**
 * The Node Details component will display everything from the node overview, plus a mapping of 
 * properties and relationships from the n4ja config
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
    name: 'n4ja-node-details',
    mixins: [ EntityComponent, ContextComponent ],
    props: {
        context: {
            type: [ Array, String, ],
            description: 'The context in which this node is being displayed',
        },
        // data: {
        //     type: Object,
        //     description: 'Data passed through from smart component',
        // },

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
            type: [ Object, Boolean, ],
            description: 'Eagerly loaded relationships to use in the details',
            default: () => ({}),
        },
    },

    created() {
        this.setDataFromNode()
    },

    data() {
        return {
            mapping: this.$n4ja.getNodeConfig(this.node),

            ...defaults,
        }
    },

    methods: {
        detailKey(config, idx) {
            return [ typeof config === 'object' ? config.key : config, idx ].join('--')
        },
        setDataFromNode() {
            this.setData(this.mapping, this.node.properties)
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
