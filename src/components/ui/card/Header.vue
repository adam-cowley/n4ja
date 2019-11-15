<template>
    <div class="n4ja-card-header">
        <component :is="headerTag">
            {{ header }}

            <span class="badge badge-pill ui label label-danger danger count" v-if="count" v-html="count" />
        </component>
        <slot />
        <slot name="actions" />
        
        <!-- TODO: Actions/Dismiss -->
    </div>
</template>

<script>
export default {
    name: 'N4jaCardHeader',

    props: {
        header: String,
        headerTag: {
            type: String,
            default: 'strong',
        },
        count: Number,
    },
}
</script>

<style>
.count {
    float: right;
}
</style>
