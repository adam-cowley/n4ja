<template>
    <div :class="classes" v-if="display">
        <n4ja-grid>
            <n4ja-column columns="2"></n4ja-column>
            <n4ja-column columns="7">
                <h1 v-if="title" v-html="title" />
                <p v-if="message" v-html="message" />
            </n4ja-column>
            <n4ja-column columns="1">
                <button type="button" class="ui button ml-2 mb-1 close" data-dismiss="toast" aria-label="Close" @click.prevent="hide">
                    <span aria-hidden="true">&times;</span>
                </button>
            </n4ja-column>
            <n4ja-column columns="2"></n4ja-column>
        </n4ja-grid>
    </div>

</template>

<script>
export default {
    name: 'N4jaAlert',
    props: {
        type: String,
        title: String,
        message: String,

        timeout: {
            type: Number,
            default: 4000,
        },
    },
    data() {
        return {
            display: true,
        }
    },
    created() {
        this.scheduleHide();
    },
    computed: {
        classes() {
            return `alert-container alert-${this.type}`;
        },
    },
    methods: {
        hide() {
            this.display = false;
        },
        show() {
            this.display = true;

            this.scheduleHide();
        },
        scheduleHide() {
            this._timeout = setTimeout(() => this.hide(), this.timeout);
        },
    },
    watch: {
        message() {
            clearTimeout( this._timeout );

            this.show();
        },
    },
}
</script>

<style lang="scss">
.alert-container {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3000;
    background: #ccc;
    padding: 12px 0;
    border-top: 2px solid;

    .row {
        margin-bottom: 0;
    }
}
.alert-container h1 {
    font-size: 16px;
    font-weight: 700;
    margin: 0 0 3px !important;

}

.alert-container p {
    margin-bottom: 0;
}

.alert-container .close {
    float: right;
    font-size: 24px;
    padding: 12px !important;
    background: transparent;
    color: #fff;
    border: 1px solid #fff;

    &:hover {
        background: transparent;
    }

    &:active {
        background: transparent;
    }

}

</style>

