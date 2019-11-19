<template>
    <div class="container">
        <div :class="classes">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    name: 'n4ja-grid',

    props: {
        deck: {
            type: Boolean,
            description: 'If true, the card heights will be matched',
            default: false,
        },
    },

    computed: {
        classes() {
            const output = ['n4ja-grid row'];

            if ( this.deck ) {
                output.push('deck');
            }

            return output;
        },
    },
}
</script>
