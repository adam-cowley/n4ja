<template>
    <n4ja-card class="n4ja-entity-details">
        <n4ja-card-body>
            <div class="overview">
                <div class="picture-container">
                    <div class="picture" :style="pictureStyle()" />
                </div>

                <div class="details">
                    <h1 v-if="name">{{ name }}</h1>
                    <p v-if="caption" class="caption">{{ caption }}</p>
                </div>
            </div>

            <n4ja-children v-if="config.children" :children="config.children" :data="data" />
        </n4ja-card-body>
    </n4ja-card>
</template>

<script>
import EntityComponent from './EntityComponent'

const defaults = {
    labels: false,
    name: false,
    caption: false,
    picture: false,
    cover: false,
};

export default {
    name: 'n4ja-entity-details',
    mixins: [ EntityComponent, ],
    props: {
        config: {
            type: Object,
            default: () => {},
        },
        data: Object,
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
