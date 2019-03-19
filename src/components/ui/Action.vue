<template>
    <button
        :class="classes"
        :to="to"
        @click="handleClick"
    >
        {{ text }}
    </button>
</template>

<script>
export default {
    name: 'N4jaAction',

    props: {
        value: Object,
        action: Object,
        id: [ String, Number, Object ],
        value: Object,
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
        classes() {
            return `${this.action.class || ''} btn btn-${this.action.variant} ui button ${this.action.variant}`;
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
