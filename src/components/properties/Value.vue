<template>
    <component 
        :is="innerComponent" 
        :context="context"
        :name="name" 
        :type="type" 
        :value="value" 
        :viewRoute="viewRoute"
        :id="id"

        :valueLimit="valueLimit"
        :moreValuesText="moreValuesText"
    />
</template>

<script>
export default {
    name: 'N4jaValue',
    props: {
        context: {
            type: [ String, Array ],
            description: 'The context in which this value is being displayed',
        },
        name: {
            type: String,
            default: 'node',
        },
        type: {
            type: String,
            default: 'property',
        },
        value: [ String, Number, Array, Object ],

        valueLimit: {
            type: [ Number, String ],
            description: 'Number of relationship entities to show',
        },
        moreValuesText: {
            type: [ Function, Number, String ],
            description: 'Number of relationship entities to show',
            default: count => `+ ${count} More&hellip;`,
        },
    },
    computed: {
        valueString() {
            const { value } = this;

            return this.valueToString(value);
        },
        baseComponent() {
            if ( Array.isArray(this.value) ) {
                return 'n4ja-value-array';
            }

            if ( this.value.identity ) {
                return 'n4ja-value-node';
            }

            return 'n4ja-value-string';
        },

        valueIsNodeArray() {
            // TODO: Better way?
            return Array.isArray(this.value && this.value.length && this.value[0].identity && this.value[0].identity);
        },

        innerComponent() {
            const base = 'n4ja-value';
            const context = this.castContext.concat(this.name);

            // Check context with key
            const contextKey = this.getContextComponent(base, context);
            if ( contextKey != base ) {
                return contextKey;
            }

            // Check key
            const propertyKey = this.getContextComponent(base, this.name);

            return propertyKey != base ? propertyKey : this.baseComponent;
        },
        id() {
            return this.value.identity ? this.value.identity.toNumber() : null;
        },
        viewRoute() {
            return this.getViewRoute( this.type, this.name );
        },
    },
}
</script>
