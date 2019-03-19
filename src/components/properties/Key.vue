<template>
    <component :is="componentTag" :class="classes" :tag="tag">
        {{ text }}
        <span class="n4ja-count" v-if="count" v-html="count" />
    </component>
</template>

<script>
// TODO: Icons

export default {
    name: 'n4ja-key',
    props: {
        name: [ String, Boolean ],
        context: {
            type: [ String, Array ],
            description: 'The context in which this key is being displayed',
        },
        tag: {
            type: String,
            description: 'The type of component for the label (dt or th)',
            default: 'dt',
        },
        count: {
            type: String,
            description: 'A count to display',
        },
    },
    computed: {
        componentTag() {
            const base = 'n4ja-key';
            const context = this.castContext.concat(this.name);

            // Check context with key
            const contextKey = this.getContextComponent(base, context);
            if ( contextKey != base ) {
                return contextKey;
            }

            // Check key
            const propertyKey = this.getContextComponent(base, this.name);
            return propertyKey != base ? propertyKey : this.tag;
        },
        options() {
            const specific = this.castContext.concat(this.name).join('_');

            if ( this.$n4ja.options.keys[ specific ] ) {
                return this.$n4ja.options.keys[ specific ];
            }
            


            return this.$n4ja.options.keys[ this.name ] || {}
        },
        text() {
            if ( typeof this.options == 'string' ) return this.options;
            
            return this.options.text || this.name;
        },
        classes() {
            return `n4ja-key ${this.name}`;
        },
    },
}
</script>
