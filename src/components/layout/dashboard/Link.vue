<template>
    <li>
        <router-link :to="to" v-if="to">
            <span class="icon" v-if="icon">
                <component :is="icon" />
            </span>
            <span class="link">
                {{ text }}
            </span>
        </router-link>
        <a @click.prevent="onClick" v-else-if="onClick">
            <span class="icon" v-if="icon">
                <component :is="icon" />
            </span>
            
            <span class="link">
                {{ text }}
            </span>
        </a>
    </li>
</template>

<script>
export default {
    name: 'n4ja-layout-dashboard-link',
    props: {
        to: {
            type: [ String, Object ],
        },
        onClick: Function,
        text: {
            type: String,
        },
        icon: {
            type: Object,
        },
    }
}
</script>
