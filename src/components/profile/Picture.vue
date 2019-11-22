<template>
    <component :is="getContextComponent()" class="n4ja-picture">
        <div
            class="picture"
            :style="pictureStyle()"
            @click.prevent="onClick"
        />
    </component>
</template>

<script>
export default {
    name: 'n4ja-profile-picture',

    props: {
        context: {
            type: [ String, Array, ],
            description: 'What type of node/relationship is this for?',
        },
        
        picture: {
            type: [ String, Boolean, Object, ],
            description: 'Picture to display',
        },

        onClick: {
            type: Function,
            description: 'On Click Handler',
            default: () => {},
        },
    },
}
</script>