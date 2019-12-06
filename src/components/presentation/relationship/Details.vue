<template>
    <component :is="getContextComponent()" class="n4ja-relationship-details">
        <n4ja-relationship-overview
            :context="context"
            :relationship="relationship"
            :start="start"
            :end="end"
            
            :nameTag="nameTag"
            :captionTag="captionTag"

       />

       <div class="n4ja-details-container n4ja-relationship-details-container">
            <n4ja-profile-detail
                v-for="(config, i) in mapping.details" 
                :key="detailKey(config, i)" 
                :config="config"
                :context="context"

                :node="relationship"
                :start="start"
                :end="end"
            />
       </div>
    </component>
</template>

<script>
/**
 * The Relationship Details component will display everything from the relationship overview, plus a mapping of 
 * properties and relationships from the n4ja config
 * 
 */
const defaults = {
    type: false,
    name: false,
    caption: false,
    picture: false,
    cover: false,
};

export default {
    name: 'n4ja-relationship-details',

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

    created() {
        this.setDataFromRelationship()
    },

    data() {
        return {
            mapping: this.$n4ja.getRelationshipConfig(this.relationship),

            ...defaults,
        }
    },

    methods: {
        detailKey(config, idx) {
            return [ typeof config === 'object' ? config.key : config, idx ].join('--')
        },
        setDataFromRelationship() {
            console.log(this.relationship)
            this.setData(this.mapping, this.relationship.properties)
        },
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
