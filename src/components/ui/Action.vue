<template>
    <button
        :class="classes"
        @click="handleClick"
    >
        <component v-if="icon" :is="icon" />
        <span>{{ text }}</span>
    </button>
</template>

<script>
export default {
    name: 'N4jaAction',

    props: {
        value: Object,
        action: Object,
        id: [ String, Number, Object ],
    },

    computed: {
        component() {
            return this.action.route ? 'router-link' : 'button';
        },
        to() {
            return {
                name: this.action.route,
                params: this.row,
            }
        },
        icon() {
            return this.action.icon;
        },
        classes() {
            return `${this.action.class || ''} XXX btn btn-${this.action.variant} ui button ${this.action.variant}`;
        },
        text() {
            // TODO: Replace?
            return this.action.text;
        },
    },
    methods: {
        handleClick() {
            if ( this.action.route ) {
                this.$router.push({
                    name: this.action.route,
                    params: Object.assign({ _id: this.id }, this.value),
                })
            }
            else if (this.action.onClick) this.action.onClick(this.value);
        },
    },
}
</script>
