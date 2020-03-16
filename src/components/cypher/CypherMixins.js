export default {
    props: {
        database: String,
        cypher: String,
        params: {
            type: Object,
            default: () => ({}),
        },
        lastUpdate: null,
    },
    data: () => ({
        error: false,
        loading: true,
        result: false,
    }),
    methods: {
        runCypher() {
            this.result = false;
            this.error = false;
            this.loading = true;

            const options = {}

            if ( this.database ) {
                options.database = this.database
            }

            this.$neo4j.run(this.cypher, this.params, options)
                .then(res => this.result = res)
                .catch(e => this.error = e)
                .finally(() => this.loading = false)
        },
    },
    created() {
        this.runCypher()
    },
    watch: {
        database() {
            this.runCypher()
        },
        query() {
            this.runCypher()
        },
        params() {
            this.runCypher()
        },
        lastUpdate() {
            this.runCypher()
        },
    },
}