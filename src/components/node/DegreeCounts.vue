<template>
    <div class="n4ja-degree-counts" v-if="!loading">
        <!-- <n4ja-grid v-if="!loading" class="count-row n4ja-grid col"> -->
            <div
                class="count"
                v-for="c in counts"
                :key="c.type"
            >
                <n4ja-key
                    :tag="headerTag"
                    :context="context"
                    :name="c.type"
                />
                <component :is="countTag" v-html="c.count" />
            </div>
        <!-- </n4ja-grid> -->
    </div>
</template>

<script>
export default {
    name: 'n4ja-degree-counts',
    props: {
        id: {
            type: [ String, Number ],
            description: 'ID of source Node',
        },
        context: {
            type: [ String, Number ],
            description: 'The context in which this node is being displaued',
        },

        headerTag: {
            type: String,
            description: 'Tag for the header',
            default: 'h2',
        },
        countTag: {
            type: String,
            description: 'Tag for the count',
            default: 'span',
        },

        types: {
            type: Array,
            description: 'Array of relationship types out of the node',
            default: '',
        },
        direction: {
            type: String,
            description: 'Direction of relationship(s) - `in`, `out` or `both`',
        },
        distinct: {
            type: Boolean,
            description: 'Only count distinct end nodes?',
            default: false,
        },
    },

    data() {
        return {
            loading: true,
            counts: [],
        };
    },
    created() {
        this.load();
    },

    methods: {
        load() {
            this.$neo4j.run(this.cleanedQuery, this.idParams())
                .then(res => {
                    this.counts = res.records.map(row => {
                        return {
                            type: row.get('type'),
                            count: row.get('count').toNumber(),
                        };
                    });
                })
                .catch(e => console.log(e))
                .then(() => this.loading = false);
        },
    },
    computed: {
        cleanedQuery() {
            const rels = this.types && this.types.length ? `:${this.types.join('|')}` : '';
            const direction_in = this.direction == 'in' ? '<' : '';
            const direction_out = this.direction == 'out' ? '>' : '';
            const distinct = this.distinct ? 'DISTINCT' : '';

            return `
                MATCH (node)${direction_in}-[r${rels}]-${direction_out}(n)
                WHERE id(node) = $id
                RETURN type(r) AS type, count(${distinct} n ) AS count
            `;
        },
    },
}
</script>

<style lang="scss">

.n4ja-degree-counts {

    display: flex;
    // flex-direction: row;
    // clear: both;
    // margin: -16px 0;
    flex-flow: row wrap;
    // justify-content: flex-start;



    .count {
        flex: 1;
        padding: 1em;
        // margin: 16px;
    
        .n4ja-key {
            display: flex;
            font-size: 12px;
            margin-bottom: 0;
            color: #aaa;
        }

        span {
            color: #4183c4;
            font-size: 46px;
            font-weight: bold;
            line-height: 1.5em;
        }
    }
}
</style>


