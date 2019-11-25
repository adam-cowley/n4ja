<template>
    <component :is="getContextComponent()" class="n4ja-profile-header">
        <n4ja-profile-picture v-if="picture" class="picture-container" :context="context" :picture="picture" :onClick="onClick" />
        <div class="details">
            <component v-if="name" :is="nameTag" v-html="name" class="name" @click.prevent="onClick" />
            <component v-if="caption" :is="captionTag" v-html="caption" class="caption" @click.prevent="onClick" />
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

        name: [ String, Boolean, null, ],
        caption: {
            type: [ String, Boolean, ],
        },
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

        onClick: {
            type: Function,
            description: 'On Click Handler',
            default: () => {},
        }
    },
}
</script>
