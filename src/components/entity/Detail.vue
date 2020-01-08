<template>
    <dl class="n4ja-entity-detail" v-if="values && values.length">
        <n4ja-key :config="cleanConfig" :context="childContext" />
        <n4ja-value 
            v-for="(value, idx) in values" 
            :key="valueKey(value, idx)" 
            :config="cleanConfig" 
            :context="childContext"
            :value="value" 
        />
    </dl>
</template>

<script>
import EntityComponent from '../EntityComponent'

export default {
    name: 'n4ja-detail',

    mixins: [ EntityComponent ],
    props: {
        config: {
            type: [ Object, String, ],
            description: 'A configuration option for the detail',
        },

        context: {
            type: [ Array, String, ],
            description: 'The context in which this node is being displayed',
        },
        
        // TODO: rename this to entity to conform with relationships too?
        node: {
            type: Object,
            description: 'Node to display in this component',
        },
        relationships: {
            type: Object,
            description: 'Eagerly loaded relationships to use in the details',
            default: () => {},
        },
        
        start: {
            type: Object,
            description: 'Optional start node for the relationship',
        },
        end: {
            type: Object,
            description: 'Optional start node for the relationship',
        },
    },
    mounted() {
        this.setValues()
    },
    data: () => ({ values: false, count: false, }),

    computed: {
        childContext() {
            return this.appendContext(this.context, this.cleanConfig.key)
        },
        cleanConfig() {
            if ( this.config.type === 'start' || this.config.type === 'end' ) {
                return { type: this.config.type, key: this.config.type }
            }

            return typeof this.config === 'string' ? { type: 'property', key: this.config } : this.config;
        },
    },
    methods: {
        valueKey(value, idx) {
            return [ this.cleanConfig.key, this.node.identity, idx ].join('--')
        },
        setValues() {
            // TODO: Burn jsonpath?
            if ( this.cleanConfig.type === 'relationships' ) {
                // this.values = this.find(this.relationships, `$.${this.config.key}`)
                this.values = this.relationships && this.relationships[ this.cleanConfig.key ] ? this.relationships[ this.cleanConfig.key ] : []
            }
            else if ( this.cleanConfig.type === 'property' ) {
                this.values = this.find(this.node.properties, `$.${this.cleanConfig.key}`)
            }
            else if ( this.cleanConfig.type === 'start' || this.cleanConfig.type === 'end' ) {
                // console.log(this.cleanConfig.type, this[ this.cleanConfig.type ])
                this.values = [ this[ this.cleanConfig.type ] ]
            }
            else {
                throw new Error(`Couldn't find detail type for ${this.cleanConfig.type} in ${this.context}`)
                this.values = false
            }
        }
    },
    watch: {
        node() {
            this.setValues()
        },
        relationship() {
            this.setValues()
        },
    },

}
</script>