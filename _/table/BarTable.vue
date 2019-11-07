<template>
    <table class="ui table n4ja-bar-table">
        <thead>
            <tr>
                <th class="value">{{ valueHeader }}</th>
                <th class="count">{{ countHeader }}</th>
                <th class="bar">&nbsp;</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in data" :key="row.value">
                <td class="value">{{ row[ valueKey ] }}</td>
                <td class="count">{{ row[ countKey ] }}</td>
                <td class="bar">
                    <span :style="barStyle(row)" />
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'n4ja-bar-table',
    props: {
        data: Array,
        countHeader: {
            type: String,
            default: 'Count',
        },
        valueHeader: {
            type: String,
            default: 'Value',
        },
        countKey: {
            type: String,
            default: 'count',
        },
        valueKey: {
            type: String,
            default: 'value',
        },
    },
    computed: {
        total() {
            return this.data.reduce((acc, row) => acc + row[ this.countKey ], 0);
        },
        max() {
            return this.data.reduce((acc, row) => row[ this.countKey ] > acc ? row[ this.countKey ] : acc, 0);
        },
    },
    methods: {
        barStyle(row) {
            const percentage = (row.count / this.max) * 100;

            return {
                width: `${percentage.toFixed(3)}%`,
                'min-width': '2px'
            }
        },
    },
}
</script>

<style lang="scss">
.n4ja-bar-table {
    .value {
        width: 100px !important;
        font-weight: 600;
    }

    .count {
        text-align: right !important;
        float: none;
        
        width: 60px;
    }

    td.count {
        border-right: 1px solid rgba(34,36,38,.1);
    }

    td.bar {
        min-width: 120px;
        padding-left: 0 !important;
     
        span {
            display: inline-block;
            height: 20px;
            background: rgba(0, 0, 0, 0.8);
        }
    }
}
</style>
