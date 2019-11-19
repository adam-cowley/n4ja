<template>
    <component :is="getComponent()">
        <n4ja-node-overview
            v-if="isNode"

            :context="context"
            :node="value" 
        />

        <template v-else>
            {{ value }}
        </template>
    </component>
</template>

<script>
import { v1 as neo4j } from 'neo4j-driver'

export default {
    name: 'n4ja-value',

    props: {
        config: {
            type: Object,
            description: 'A configuration option for the detail',
        },

        context: {
            type: [ Array, String, ],
            description: 'The context in which this node is being displayed',
        },
        
        value: null,
    },

    computed: {
        isNode() {
            return this.value.hasOwnProperty('identity');
        },
    },

    methods: {
        getComponent() {
            return 'dd';
        }
    },
}
</script>