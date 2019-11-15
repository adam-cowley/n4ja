<template>
    <div>
        <pre>!! component not found: n4ja-profile-{{ config.type }}</pre>
        <div>
            <b>Config:</b> <pre>{{ config }}</pre>
        </div>
        <div>
            <b>Data:</b> <pre>{{ data }}</pre>
        </div>
    </div>
</template>

<script>
export default {
    name: 'n4ja-profile-debug',
    props: {
        config: Object,
        data: Object,
    },
}
</script>