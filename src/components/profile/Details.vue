<template>
    <n4ja-card class="n4ja-profile-details">
        <n4ja-card-body>
            <div class="overview">
                <div class="picture-container">
                    <div class="picture" :style="pictureStyle()" />
                </div>

                <div class="details">
                    <h1 v-if="name">{{ name }}</h1>
                    <p v-if="caption" class="caption">{{ caption }}</p>
                </div>
            </div>
            
            <pre>{{ config }}</pre>
            <pre>{{ relationships }}</pre>

            <pre>{{ data }}</pre>

            <n4ja-children v-if="config.children" :children="config.children" :data="data" />
        </n4ja-card-body>
    </n4ja-card>
</template>

<script>


const defaults = {
    labels: false,
    name: false,
    caption: false,
    picture: false,
    cover: false,
};

export default {
    name: 'n4ja-profile-details',
    props: {
        config: {
            type: Object,
            default: () => {},
        },
        data: Object,
    },
    data: () => defaults,
    created() {
        this.setData()
    },
    watch: {
        config() {
            this.setData();
        },
        data() {
            this.setData();
        },
    },
}
</script>

<style lang="scss">
.n4ja-profile-details {
    .overview {
        display: flex;
        justify-content: flex-start;// space-between;

        padding-bottom: 12px;
        border-bottom: 1px solid #eee;
    }

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
        // display: flex;
        flex: 0 1 auto;

        h1 {
            font-size: 16px;
            margin: 0;
        }

        .caption {
            margin-bottom: 0;
            color: #ccc;
        }
    }
   



    // margin-top: -30px;
    // padding: 60px 0;

    // background-color: rgba(0, 140, 193, .4);

    // position: relative;

    // .details-container {
    //     flex-direction: column;

    //     .details {
    //         display: flex;
    //         flex-direction: column;
    //         height: 100%;

    //         h1 {
    //             flex: 1;
    //             align-items: flex-end;
    //             margin-bottom: 4px;
    //         }

    //         p {
    //            margin-bottom: 24px;
    //         }
    //     }
    // }

    // .cover {
    //     position: absolute;
    //     top: 0;
    //     left: 0;
    //     right: 0;
    //     bottom: 0;

    //     // opacity: .3;
    //     z-index: -1;

    //     background-size: cover;
    //     background-position: center;
    // }

    // .picture {
    //     width: 160px;
    //     height: 160px;
    //     margin: auto;

    //     background: #f2f2f2;
    //     background-size: cover;
    //     background-position: center;

    //     border: 2px solid #fff;
    //     border-radius: 50%;
    //     box-shadow: 0 0 6px rgba(0, 0, 0, .4);

    //     text-indent: -9999px;
    // }

    // h1 {
    //     margin-bottom: 6px;
    // }
}
</style>