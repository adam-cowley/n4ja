<template>
    <div :class="classes">
        <a role="button" @click.prevent="handleClick">
            <!-- <sui-popup :content="text" inverted> -->
                <div v-html="icon" slot="trigger" />
            <!-- </sui-popup> -->
        </a>
    </div>
</template>


<script>
export default {
    name: 'n4ja-sidebar-tab',
    props: {
        active: String,
        text: String,
        value: String,
        icon: String,
        onClick: Function,
    },
    computed: {
        isActive() {
            return this.active == this.value;
        },
        classes() {
            const classes = ['n4ja-tabs-list-item n4ja-tab-item-'+ this.text.toLowerCase().replace(/[^a-z0-9+]/g, '_')];

            if ( this.isActive ) {
                classes.push('n4ja-tabs-list-item-active-tab');
            }

            return classes;
        },
    },
    methods: {
        handleClick() {
            this.onClick(this.value);
        },
    },
}
</script>

<style>
/* TODO: Tooltips */
.n4ja-tabs-list-item span {
    display: none;
}
.n4ja-tabs-list-item a {
    outline: none;
}
</style>
