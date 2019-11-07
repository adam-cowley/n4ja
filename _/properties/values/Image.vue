<template>
    <div :class="classes">
        <!-- todo: battle test -->
        <img
            v-if="formattedSrc"
            :src="formattedSrc"
        />
        <component v-else-if="isComponent"
            :is="defaultSrc"
        />
        <svg v-else width="84px" height="84px" viewBox="0 0 168 168">
            <circle fill="#A0A0A0" fill-rule="nonzero" cx="84" cy="84" r="84"></circle>
        </svg>
    </div>
</template>

<script>
export default {
    name: 'N4jaValueImage',
    props: {
        value: Object,
        src: [ String, Function, Boolean, ],
        defaultSrc: {
            // type: [ String, Function, Boolean, ],
        },
    },
    computed: {
        classes() {
            const labels = this.value.labels && this.value.labels.map(e => `label-${e}-image`).join(' ').toLowerCase();
            return `n4ja-value-image n4ja-header-image ${labels}`
        },
        isComponent() {
            return typeof this.defaultSrc == 'object' && typeof this.defaultSrc.render == 'function'
        },
        isImg() {
            return typeof this.defaultSrc == 'string';
        },
        formattedSrc() {
            const src = this.format(this.src, this.value);

            return src && src != ''
                ? src
                : this.isImg ? this.defaultSrc : false; //this.format(this.defaultSrc, this.value);
        },
    },
}
</script>
