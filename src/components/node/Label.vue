<template>
    <span pill 
        :class="classes" 
        :style="style"
    >
        <component :is="icon" v-if="icon" />
        {{ labelText }}
    </span>
</template>

<script>
// TODO: Icons

export default {
    name: 'N4jaLabel',
    props: {
        label: String,
    },
    computed: {
        labelText() {
            return this.options && this.options.text !== undefined ? this.options.text : this.label;
        },
        classes() {
            return `badge badge-pill ui label label-${this.label}`;
        },
        options() {
            return this.$n4ja.options.labels[ this.label ] || {};
        },
        icon() {
            return this.options.icon || false;
        },
        style() {
            const output = {};

            ['background-color', 'color'].forEach(key => {
                if ( this.options[ key ] ) {
                    output[ key ] = this.options[ key ];
                }
            });

            return output;
        },
    },
}
</script>
