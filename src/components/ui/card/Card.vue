<template>
    <div class="ui card n4ja-card">
        <slot name="header">
            <n4ja-card-header v-if="header" :header="header" :headerTag="headerTag" />
        </slot>

        <slot />
    </div>
</template>

<script>
export default {
    name: 'N4jaCard',

    props: {
        header: {
            type: String,
            description: 'Header text',   
        },
        headerTag: {
            type: String,
            description: 'HTML tag to display the header as',   
        },
    },
};
</script>
