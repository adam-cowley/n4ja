<template>
    <n4ja-grid :class="config.class">
        <n4ja-column
            v-for="(config, key) in config.children"
            :key="key"
            :columns="config.width"
        >
            <n4ja-children :children="config.children" :data="data" />
        </n4ja-column>
    </n4ja-grid>
</template>

<script>
export default {
    name: 'n4ja-profile-columns',
    props: {
        config: Object,
        data: Object,
    },
}
</script>


