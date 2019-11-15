<template>
    <component :is="getContextComponent()" class="n4ja-profile-header">
        <n4ja-profile-picture v-if="picture" class="picture-container" :context="context" :picture="picture" />
        
        <div class="details">
            <component v-if="name" :is="nameTag" v-html="name" class="name" />
            <component v-if="caption" :is="captionTag" v-html="caption" class="caption" />
        </div>
    </component>
</template>

<script>
export default {
    name: 'n4ja-profile-header',
    props: {
        context: {
            type: [ Array, String, ],
            description: 'The context in which this node is being displayed',
        },

        name: [ String, Boolean, ],
        caption: [ String, Boolean, ],
        picture: [ String, Boolean, ],

        nameTag: {
            type: String,
            description: 'HTML element for the name',
            default: 'h3',
        },
        captionTag: {
            type: String,
            description: 'The HTML element for the caption',
            default: 'p',
        },
    },
}
</script>

<style lang="scss">
.n4ja-profile-header {
    display: flex;
    justify-content: flex-start;

    .picture-container {
        display: flex;
        flex: 0;
        width: 24px;
        margin: 6px 12px 0 0;

        .picture {
            height: 24px;
            width: 24px;
            display: block;
            background: #ccc;
            border-radius: 50%;
        }
    }

    .details {
        flex: 0 1 auto;

        .name {
            font-size: 16px;
            margin: 0;
        }

        .caption {
            margin-bottom: 0;
            color: #ccc;
        }
    }
}
</style>