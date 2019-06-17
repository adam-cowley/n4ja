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

<style lang="scss">
@import '../../../scss/breakpoints';

$gutter-width: 12px;
$gutter-height: 24px;


#n4ja-dashboard-root {
    &.with-sidebar {
        .container {
            margin: $gutter-width;
        }
    }

    .n4ja-grid {
        display: flex;

        margin: $gutter-width -$gutter-width;

        .n4ja-column {
            flex: 1;
            box-sizing: border-box;
            margin: 0 $gutter-width;

            min-width: 220px;
            
            @for $width from 1 through 11 {
                &.n4ja-col-#{$width} {
                    width: calc(#{round(percentage($width/12))} - #{$gutter-width*2});
                    flex: 0 0 calc(#{round(percentage($width/12))} - #{$gutter-width*2});
                }
            }

            .card {
                margin-bottom: $gutter-height;
            }
        }

        @media all and (max-width: $breakpoint-sm) {
            flex-direction: column;

            .n4ja-column {
                min-width: calc(100% - #{$gutter-width*2});
                max-width: 320px;
            }
        }
    }
}

</style>
