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
    name: 'n4ja-alert',
    props: {
        type: String,
        title: String,
        message: String,

        timeout: {
            type: Number,
            default: 4000,
        },
        onClose: {
            type: Function,
            default: () => {},
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
            if ( typeof this.onClose === 'function' ) {
                this.onClose()
            }
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
