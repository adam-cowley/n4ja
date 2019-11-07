<template>
    <div class="n4ja-all-relationship-overviews">
        <n4ja-relationship-overview
            v-for="type in relationships"
            :key="type"
            :id="id"
            :context="context"
            
            :type="type"

            :pagination="true"
        />
    </div>
</template>

<script>
import { v1 as neo4j } from 'neo4j-driver';

const TYPE_PLACEHOLDER = '{{TYPE}}';

export default {
    name: 'N4jaAllRelationshipOverviews',
    props: {
        id: {
            type: [ String, Number ],
            description: 'ID of source Node',
        },
        context: {
            type: [ Array, String ],
            description: 'The context in which this component is being viewed',
        },
        ignoreRelationships: {
            type: [ Array, String ],
            description: 'Relationship types to exclude',
            default: () => [],
        },
    },
    data: () => ({
        loading: true,
        relationships: []
    }),
    computed: {
       query() {
            return `
                MATCH (a)-[r]-()
                WHERE id(a) = $id AND NOT type(r) IN $ignoreRelationships
                RETURN DISTINCT type(r) AS type
            `;
       },
    },
    created() {
        const { ignoreRelationships } = this;
        this.$neo4j.run(this.query, {
            ignoreRelationships, 
            ...this.idParams()
        })
            .then(res => {
                this.loading = false;
                this.relationships = res.records.map(row => row.get('type'));
            })
            .catch(e => console.log(e));
    },
}
</script>
