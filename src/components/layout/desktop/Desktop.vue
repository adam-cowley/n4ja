<template>
    <div id="n4ja-app-root">
        <div id="n4ja-app" class="n4ja-app">
            <slot name="sidebar">
                <n4ja-sidebar />
            </slot>

            <div class="n4ja-page">
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'n4ja-layout-desktop',
};
</script>

<style scoped>
@import './Desktop.css';
</style>


