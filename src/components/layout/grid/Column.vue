<template>
    <div :class="classes">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'n4ja-column',

    props: {
        columns: {
            type: [ String, Number, ],
        },
        xs: [ String, Number, ],
        sm: [ String, Number, ],
        md: [ String, Number, ],
        lg: [ String, Number, ],

        half: Boolean,
        third: Boolean,
        twoThirds: Boolean,
    },

    computed: {
        classes() {
            const output = [
                `n4ja-column n4ja-col-${this.columns} n4ja-col-lg-${this.columns}`,
            ];


            // [ 'xs', 'sm', 'md', 'lg', 'half', 'third', 'twoThirds' ].forEach(size => {
            //     if ( this[ size ] ) {
            //         output.push(`col-${size}-${this[ size ]}`);
            //     }
            // });

            return output;
        },
    },
}
</script>


