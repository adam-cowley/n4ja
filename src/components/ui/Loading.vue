<template>
    <div class="n4ja-loading loading">
        <span v-html="message" />
    </div>
</template>

<script>
export default {
    name: 'N4jaLoading',
    props: {
        message: {
            type: [ String, Number, Object ],
            default: () => 'Loading.  Please Wait&hellip;'
        },
    },
}
</script>
