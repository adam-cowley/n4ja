<template>
    <div class="n4ja-modal">
        <n4ja-card>
            <n4ja-card-header :header="header">
                <div class="actions" slot="actions">
                    <svg viewBox="0 0 24 24" v-if="onClose" @click.prevent="onClose">
                        <path d="M0.75,23.249 L23.25,0.749" id="Shape"></path>
                        <path d="M23.25,23.249 L0.75,0.749" id="Shape"></path>
                    </svg>
                </div>
            </n4ja-card-header>

            <n4ja-card-body>
                <slot />
            </n4ja-card-body>

            <n4ja-card-footer v-if="actions.length">
                <n4ja-action v-for="(action, index) in actions"
                    :key="index"
                    :action="action"
                />
            </n4ja-card-footer>
        </n4ja-card>
    </div>
</template>

<script>
export default {
    name: 'n4ja-modal',

    props: {
        actions: {
            type: Array,
            description: 'Actions {text, to, onClick, class, variant}',
            default: () => [],
        },
        header: {
            type: String,
            description:'Header text',
            default: '',
        },
        onClose: {
            type: Function,
            description: 'Ran when the close button has been clicked',
        },
    },
}
</script>

<style>

</style>