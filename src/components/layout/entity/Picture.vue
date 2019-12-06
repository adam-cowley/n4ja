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
import ContextComponent from '../../ContextComponent'
import EntityComponent from '../../EntityComponent'

export default {
    name: 'n4ja-entity-picture',
    mixins: [ ContextComponent, EntityComponent, ],
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