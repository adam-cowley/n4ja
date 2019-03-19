<template>
    <div class="n4ja-sidebar-container pt-dark">
        <div class="n4ja-tabs">
            <div class="n4ja-tabs-list">
                <n4ja-sidebar-tab
                    v-for="t in topTabs"
                    :key="t.id"
                    :active="group" 
                    :icon="t.icon" 
                    :value="t.value" 
                    :text="t.text" 
                    :onClick="handleClick" 
                />

                <slot name="top" />

                <div class="n4ja-tabs-spacer"></div>

                <n4ja-sidebar-tab
                    v-for="t in bottomTabs"
                    :key="t.id"
                    :active="group" 
                    :icon="t.icon" 
                    :value="t.value" 
                    :text="t.text" 
                    :onClick="handleClick" 
                />

                <slot name="bottom" />
            </div>
        </div>

        <div class="n4ja-pane" v-if="expanded">
            <slot name="pane" />
        </div>
    </div>
</template>

<script>
// import icons from '@/icons';
// import Pane from './Pane';

import Tab from './Tab';

export default {
    name: 'n4ja-sidebar',
    components: {
        Tab,
    },
    props: {
        group: String,
        algorithm: String,

        topTabs: Array,
        bottomTabs: Array,
        onClick: Function,
    },
    data() {
        return {
            expanded: false,
        };
    },
    methods: {
        handleClick(group) {
            if ( group == this.group ) {
                return this.expanded = !this.expanded;
            }

            this.expanded = true;
            this.onClick(group);
        },
    },
};
</script>

<style>
.n4ja-tabs-list-item svg {
    width: 28px;
    height: 28px;
}

.n4ja-tabs-list-item svg path {
    fill: #fff;
}
</style>
