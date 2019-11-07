<template>
    <div class="n4ja-value-array">
        <n4ja-value v-for="v in values"
            :key=" name + type + v"
            :name="name"
            :value="v"
            :type="type"
            :context="context"
        />

        <span class="more-values" v-if="moreText" v-html="moreText" />
    </div>
</template>

<script>
export default {
    name: 'N4jaValueArray',
    props: {
        name: String,
        type: String,
        value: [ String, Number, Array, Object ],
        context: {
            type: [ String, Array ],
            description: 'The context in which this value is being displayed',
        },
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
        values() {
            if ( !this.valueLimit ) {
                return this.value;
            }

            return this.value.slice(0, this.valueLimit);
        },
        moreText() {
            return this.valueLimit && this.valueLimit < this.value.length && typeof this.moreValuesText == 'function'
                ? this.moreValuesText(this.value.length)
                : false;
        },
    },


}
</script>
