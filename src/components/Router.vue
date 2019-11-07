<template>
    <div class="main">
        <slot>
            <router-view />
        </slot>
    </div>
</template>

<script>
import VueRouter from 'vue-router';
import N4jaRoute from './Route';

export default {
    name: 'n4ja-router',
    created() {
        // Register Routes
        const routes = this.$n4ja.options.routes ? this.$n4ja.options.routes.map(route => {
            const { name, path } = route;

            return {
                name, path,
                component: N4jaRoute,
            }
        }) : [];

        this.$router.addRoutes(routes);

        this.routes = routes.map(r => r.name);
    },
    data() {
        return {
            routes: [],
        }
    }
}
</script>