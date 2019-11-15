<template>
    <component :is="getContextComponent()" class="n4ja-picture">
        <div
            class="picture"
            :style="pictureStyle()"
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
    },
}
</script>