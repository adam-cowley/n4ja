<template>
    <n4ja-card class="n4ja-entity-overview">
        <n4ja-card-body>
            <n4ja-proflle-header
                :picture="picture"
                :name="name"
                :caption="caption"
                :cover="cover"
                :onClick="handleClick"
            >

            <n4ja-children v-if="config.children" :children="config.children" :data="data" />
        </n4ja-card-body>
    </n4ja-card>
</template>

<script>
import EntityComponent from './EntityComponent'

const defaults = {
    name: false,
    caption: false,
    picture: false,
    cover: false,
};

export default {
    mixins: [ DataComponent ],
    name: 'n4ja-entity-overview',
    props: {
        config: {
            type: Object,
            default: () => {},
        },
        data: Object,
        onClick: {
            type: Function,
            description: 'On Click Handler',
            default: () => {},
        }
    },
    data: () => defaults,
    created() {
        this.setData()
    },
    watch: {
        config() {
            this.setData();
        },
        data() {
            this.setData();
        },
    },
}
</script>
