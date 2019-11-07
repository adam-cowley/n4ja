<template>
    <div class="n4ja-node-card-header text-center clearfix">
        <n4ja-value-image
            v-if="picture || pictureDefault"
            :value="node"
            :src="picture"
            :defaultSrc="pictureDefault"
        />

        <div class="n4ja-card-header-details">
            <h3 class="n4ja-card-header-title" v-html="titleText" />

            <n4ja-id class="float-left text-muted node-id" :id="id" />
            <n4ja-labels :labels="labels" />
        </div>
        
        <slot name="header" />
    </div>
</template>

<script>
export default {
    name: 'n4ja-node-card-header',

    props: {
        id: {
            type: [ String, Number ],
            description: 'The Internal ID of the node',
        },
        node: {
            type: Object,
            description: 'The Internal ID of the node',
        },
        context: {
            type: [ Array, String, ],
            description: 'The context in which this card is being displayed',
        },
        
        title: {
            type: [ String, Function, Boolean ],
            description: 'The template string or function for generating the title text',
            default: '$name',
        },
        caption: {
            type: [ String, Function, Boolean ],
            description: 'The template string or function for generating the title text',
        },
        picture: {
            type: [ String, Function, Boolean, Object ],
            description: 'The template string or function for generating the title text',
        },
        pictureDefault: {
            type: [ String, Function, Boolean, Object ],
            description: 'Default picture to show if the image returns null',
        },
    },

    computed: {
        titleText() {
            const formatted = this.format(this.title, this.node);
            return formatted && formatted != '' ? formatted : this.id;
        },
        labels() {
            return this.node.labels;
        },
    },
}
</script>

<style lang="scss">

// .n4ja-card-header {
    // padding: 16px;
    /*
    // height: 160px;

    // display: flex;
    // flex-direction: row;

    
    .n4ja-value-image {
        width: 64px;
        border: 1px solid blue;

        min-width: 64px;
        flex: 0;
    }

    .n4ja-card-header-details {
        flex: 1;
        
        border: 1px solid green;

        display: flex;
        flex-direction: column;
        align-items:baseline;
        // justify-content: space-between;
        justify-content: flex-end;

        .n4ja-card-header-title {
            margin-top: 0;
            flex: 1;
        }

        .n4ja-id {
            // display: flex;
            flex: 1;
        }
        .n4ja-labels {
            
            flex: 1;
        }
    }

    .n4ja-card-header-details {
    }
*/    
// }

</style>
