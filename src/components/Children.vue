<template>
    <div class="n4ja-children">
        <component
            v-for="(config, key) in children"
            :key="key"
            :is="getComponent(config)"
            :config="config"
            :class="config.type"
            :data="data"
        />
    </div>
</template>

<script>
export default {
    name: 'n4ja-children',
    props: {
        children: Array,
        data: Object,
    },
    methods: {
        getComponent(config) {
            const search = 'n4ja-profile-'+ config.type;

            return this.$options.components[ search ] || 'n4ja-profile-debug';
        },
    },
}
</script>

