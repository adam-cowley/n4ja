<template>
    <div
        class="n4ja-profile-header"
    >
        <div class="cover" :style="headerStyle()" />
        <n4ja-grid>
            <n4ja-column columns="3">
                <div
                    class="picture"
                    :style="pictureStyle()"
                />
            </n4ja-column>
            <n4ja-column columns="9" class="details-container">
                <div class="details">
                    <h1>{{ name }}</h1>
                    <p v-if="caption" class="caption">{{ caption }}</p>
                </div>
            </n4ja-column>
        </n4ja-grid>
    </div>
</template>

<script>
import jsonpath from 'jsonpath';

const defaults = {
    name: false,
    caption: false,
    picture: false,
    cover: false,
};

export default {
    name: 'n4ja-profile-header',
    props: {
        config: Object,
        data: Object,
    },
    data() {
        return Object.entries( this.config.data ).map(([ key, path ]) => {
            if ( !Array.isArray(path) ) {
                path = [ path ];
            }

            const value = path.map(query => jsonpath.query(this.data, query) ).join( this.config.join || ' ' );

            return [ key, value ];
        }).reduce((acc, [ key, value ]) => {
            acc[ key ] = value;

            return acc;
        }, defaults);
    },
    methods: {
        headerStyle() {
            return {
                'background-image': `url( ${this.cover ? this.cover : 'none'})`,
            };
        },
        pictureStyle() {
            return {
                'background-image': `url( ${this.picture ? this.picture : 'none'})`,
            };
        },
    },
}
</script>

<style lang="scss">
.n4ja-profile-header {

    margin-top: -30px;
    padding: 60px 0;

    background-color: rgba(0, 140, 193, .4);

    position: relative;

    .details-container {
        flex-direction: column;

        .details {
            display: flex;
            flex-direction: column;
            height: 100%;

            h1 {
                flex: 0 0 auto;
                align-items: flex-end;
                margin-bottom: 4px;
            }

            p {
               margin-bottom: 24px;
            }
        }
    }

    .cover {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        // opacity: .3;
        z-index: -1;

        background-size: cover;
        background-position: center;
    }

    .picture {
        width: 160px;
        height: 160px;
        margin: auto;

        background: #f2f2f2;
        background-size: cover;
        background-position: center;

        border: 2px solid #fff;
        border-radius: 50%;
        box-shadow: 0 0 6px rgba(0, 0, 0, .4);

        text-indent: -9999px;
    }

    h1 {
        margin-bottom: 6px;
    }
}
</style>