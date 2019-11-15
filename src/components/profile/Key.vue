<template>
    <component :is="getContextComponent('dt')" class="n4ja-key" :class="classes">
        {{ keyString }}
    </component>
</template>

<script>
export default {
    name: 'n4ja-key',
    
    props: {
        config: {
            type: Object,
            description: 'The configuration for the current key',
        },

        context: {
            type: [ Array, String, ],
            description: 'The context in which this key is being displayed',
        },

    },

    computed: {
        classes() {
            return [
                'n4ja-key-'+ this.context.join('-').toLowerCase(),
            ];
        },
        keyString() {
            const propertyKey = this.context.join('.');

            if ( this.$n4ja.options.keys.hasOwnProperty( propertyKey ) ) {
                return this.$n4ja.options.keys[ propertyKey ];
            }
            
            return this.config.key;
            // return this.$n4ja.options.keys[ this.config.key ] || this.config.key;
        },
    },

}
</script>