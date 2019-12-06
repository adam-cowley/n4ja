<template>
     <component :is="getContextComponent()" class="n4ja-node-overview" :class="getClasses()">
        <n4ja-entity-header
            :context="context"

            :name="name"
            :caption="caption"
            :picture="picture"

            :nameTag="nameTag"
            :captionTag="captionTag"
        />
    </component>
</template>

<script>
import ContextComponent from '../../ContextComponent'
import EntityComponent from '../../EntityComponent'

const defaults = {
    labels: false,
    name: false,
    caption: false,
    picture: false,
    cover: false,
};

export default {
    name: 'n4ja-relationship-overview',
    mixins: [ ContextComponent, EntityComponent, ],

    props: {
        context: {
            type: [ Array, String, ],
            description: 'The context in which this node is being displayed',
        },

        nameTag: {
            type: String,
            description: 'HTML element for the type',
            default: 'h3',
        },
        captionTag: {
            type: String,
            description: 'The HTML element for the caption',
            default: 'p',
        },

        relationship: {
            type: Object,
            description: 'The relationship',
        },
        start: {
            type: Object,
            description: 'Start Node',
        },
        end: {
            type: Object,
            description: 'End Node',
        },
    },

    mounted() {
        this.setDataFromRelationship()
    },
    data() {
        return {
            mapping: this.$n4ja.getRelationshipConfig(this.relationship),

            ...defaults,
        }
    },
    methods: {
        setDataFromRelationship() {
            this.name = this.mapping.name || this.relationship.type

            this.setData(this.mapping, this.relationship.properties)
        },
        getClasses() {
            return [
                `n4ja-relationship-overview-${this.context.join('-').toLowerCase()}`,
                `n4ja-relationship-overview-${this.relationship.type.toLowerCase()}`,
                `n4ja-relationship-overview-${this.relationship.type.toLowerCase()}-start-${this.start.labels.join('-')}`,
                `n4ja-relationship-overview-${this.relationship.type.toLowerCase()}-end-${this.end.labels.join('-')}`,
            ]
        }
    },
    watch: {
        context() {
            this.setDataFromRelationship()
        },
        relationship() {
            this.setDataFromRelationship()
        },
        start() {
            this.setDataFromRelationship()
        },
        end() {
            this.setDataFromRelationship()
        },
    },

}
</script>