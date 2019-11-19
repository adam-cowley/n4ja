<template>
    <div class="">
        <div :class="classNames">
            <div class="n4ja-pane-header">
                <h5 class="n4ja-pane-header-title">{{ title }}</h5>

                <!-- <button type="button" class="pt-button pt-minimal n4ja-pane-project-header-new" v-if="callToAction">
                    <span class="light standard margin-top-2" v-html="callToActionIcon"></span>
                    <h6 class="n4ja-pane-project-new">{{ callToActionText }}</h6>
                </button> -->
            </div>
            <!-- <div class="n4ja-pane-project-list">
                <ul class="pt-list-unstyled pt-large">
                    <li class="n4ja-sidebar-project-item">
                        <button class="pt-minimal pt-menu-item n4ja-sidebar-project-item-link"><span class="n4ja-icon-project light large n4ja-project-icon"></span><span class="n4ja-ellipsis" title="Causal Cluster">Causal Cluster</span></button>
                        <div class="neo4j-locked-div-wrapper"><button type="button" class="pt-button pt-minimal n4ja-sidebar-project-item-delete" data-target="n4ja-sidebar-project-delete-dialog1"><span class="n4ja-icon-remove light standard"></span></button></div>
                    </li>
                </ul>
            </div> -->
            
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    name: 'Pane',
    props: {
        title: String,
        callToAction: Function,
        callToActionText: String,
        callToActionIcon: String,
    },
    computed: {
        classNames() {
            return 'n4ja-pane-project n4ja-pane-'+ this.title.toLowerCase().replace(/[^a-z0-9+]/g, '_');
        },
    },
}
</script>
