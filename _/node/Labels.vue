<template>
    <span class="n4ja-labels">
        <n4ja-label
            v-for="label in visibleLabels"
            :key="label"
            :label="label"
        />
    </span>    
</template>

<script>
export default {
    name: 'N4jaLabels',
    props: {
        labels: Array,
    },
    computed: {
        visibleLabels() {
            return this.labels && this.labels.filter(label => !this.$n4ja.options.labels[ label ] || !this.$n4ja.options.labels[ label ].hidden)
        },
    },
}
</script>


