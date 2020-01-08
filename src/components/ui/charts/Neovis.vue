<template>
    <div class="n4ja-neovis" :id="id" />
</template>

<script>
import NeoVis from 'neovis.js'

export default {
    name: 'neovis',

    props: {
        cypher: String,
    },

    data: () => ({
        loading: false,
    }),

    mounted() {
        this.draw();
    },

    methods: {
        draw() {
            const driver = this.$neo4j.getDriver();
            const server_user = driver._authToken.principal;
            const server_password = driver._authToken.credentials;
            const server_url = `bolt://${driver._connectionProvider._hostPort}`

            const config = {
                container_id: this.id,
                server_url,
                server_user,
                server_password,
                labels: {
                    "Character": {
                        "caption": "name",
                        "size": "pagerank",
                        "community": "community"
                    }
                },
                relationships: {
                    "INTERACTS": {
                        "thickness": "weight",
                        "caption": false
                    }
                },
                initial_cypher: this.cypher,
            };

            const viz = new NeoVis(config);
            viz.render();
        },
    },
    computed: {
        id() {
            return `neovis_${this._uid}`
        },
    },
    watch: {
        cypher() {
            this.draw();
        },
    },
}
</script>
