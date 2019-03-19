<template>
    <div class="n4ja-value-node clearfix">
        <component
            v-if="customComponent" 
            :is="customComponent"
            :value="value"
        />
        <template v-else>
            <n4ja-labels :labels="value.labels" class="float-right" />
            <router-link
                v-if="viewRoute || dynamicViewRoute && id"
                :to="{ name: viewRoute || dynamicViewRoute, params: routeParams}"
            >
                <n4ja-value-string :name="name" :type="type" :value="value" />
            </router-link>
            <n4ja-value-string v-else :name="name" :type="type" :value="value" />
        </template>
    </div>
</template>

<script>
export default {
    name: 'N4jaValueNode',
    props: {
        name: String,
        type: String,
        value: [ String, Number, Array, Object ],
        viewRoute: [ String, Boolean ],
        id: [ Number ],
        context: {
            type: [ String, Array ],
            description: 'The context in which this value is being displayed',
        },
        moreValuesText: {
            type: Function,
        }
    },
    computed: {
        customComponent() {
            const labels = this.value.labels;
            const base = 'n4ja-node';

            // Try specific type with all joined labels 
            const allLabelsContextKey = this.getContextComponent(base, this.castContext.concat( labels.join('-') ) );

            if ( allLabelsContextKey != base ) {
                return allLabelsContextKey;
            }

            // Try specific type with each label
            for ( let i = 0; i < labels.length; i++ ) {
                const specificLabelsContextKey = this.getContextComponent(base, this.castContext.concat(labels[i]) );

                if ( specificLabelsContextKey != base ) {
                    return specificLabelsContextKey;
                }
            }
        },
        dynamicViewRoute() {
            // TODO: Priorities?
            for ( const label of this.value.labels ) {
                if ( this.$n4ja.options.labels[ label ] ) {
                    return this.$n4ja.options.labels[ label ].viewRoute;
                }
            }
        },
        routeParams() {
            return {
                '_id': this.id,
            };
        },
    },
};
</script>

<style>
.n4ja-value-node .n4ja-id {
    display: block;
    padding-top: 6px;
    margin-right: 3px;
    font-size: 16px;
}
</style>
