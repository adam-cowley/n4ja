<template>
    <div class="n4ja-card-footer n4ja-card-footer-actions">
        <slot />
        <Action
            v-for="action in actions"
            :key="action.name"
            :id="id"
            :value="value"
            :action="action"
        />
    </div>
</template>

<script>
import Action from './../../ui/Action';

export default {
    name: 'N4jaCardFooter',
    components: {
        Action,
    },
    props: {
        id: [ Number, String, ],
        value: Object,
        actions: Array,
    },
}
</script>

