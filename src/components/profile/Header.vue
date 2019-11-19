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
