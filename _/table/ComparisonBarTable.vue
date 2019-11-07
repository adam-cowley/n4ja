<template>
    <n4ja-table class="n4ja-bar-table n4ja-comparison-bar-table">
        <template slot="headers">
            <th class="percentage left">{{ percentageLeftHeader }}</th>
            <th class="count left" colspan="2">{{ leftHeader }}</th>
            <!-- <th class="count left">{{ countHeader }}</th> -->
            <th class="value">{{ valueHeader }}</th>
            <!-- <th class="count right">{{ countHeader }}</th> -->
            <!-- <th class="bar right">{{ rightHeader }}</th> -->
            <th class="bar right" colspan="2">{{ rightHeader }}</th>
            <th class="percentage right">{{ percentageRightHeader }}</th>
        </template>
        <tr slot="body" v-for="row in data" :key="row.value">
            <td class="percentage left">
                {{ percentage(row, leftGroup )}}
            </td>
            <td class="bar left">
                <span :style="barStyle(row, leftGroup)" />
            </td>
            <td class="count left">
                {{ value(row, leftGroup) }}
            </td>
            <td class="value">
                {{ row[ valueKey ] }}
            </td>
            <td class="count right">
                {{ value(row, rightGroup) }}
            </td>
            <td class="bar right">
                <span :style="barStyle(row, rightGroup)" />
            </td>
            <td class="percentage right">
                {{ percentage(row, rightGroup )}}
            </td>
        </tr>
    </n4ja-table>
</template>


<script>
import { v1 as neo4j } from 'neo4j-driver';

export default {
    name: 'n4ja-comparison-bar-table',
    props: {
        data: Array,
        valueHeader: {
            type: String,
            default: 'Value',
        },
        countHeader: {
            type: String,
            default: 'Count',
        },
        leftHeader: {
            type: String,
            default: 'Left',
        },
        rightHeader: {
            type: String,
            default: 'Right',
        },

        percentageLeftHeader: {
            type: String,
            default: '%',
        },
        percentageRightHeader: {
            type: String,
            default: '%',
        },

        countsKey: {
            type: String,
            default: 'counts',
        },
        countKey: {
            type: String,
            default: 'count',
        },
        valueKey: {
            type: String,
            default: 'value',
        },
        groupKey: {
            type: String,
            default: 'group',
        },
        leftGroup: {
            type: String,
            default: 'left',
        },
        rightGroup: {
            type: String,
            default: 'right',
        },
    },
    computed: {
        max() {
            const max_values = this.data.map(row => Math.max( ...row[ this.countsKey ].map(e => e[ this.countKey ]) ));

            return Math.max(...max_values);
        },
    },
    methods: {
        barStyle(row, index) {
            const value = this.value(row, index);
            const percentage = (value / this.max) * 100;

            return {
                width: `${percentage}%`,
                'min-width': '2px'
            }
        },
        value(row, index) {
            const value = row[ this.countsKey ].find(e => e[ this.groupKey ] == index);
            return value ? value[ this.countKey ] : 0;  
        },
        total(index) {
            const values = this.data.map(row => {
                const value = row[ this.countsKey ].find(e => e[ this.groupKey ] == index);

                return value ? value[ this.countKey ] : 0;
            });

            return values.reduce((acc, val) => acc + val, 0);
        },
        percentage(row, index) {
            const total = this.total(index);
            const value = this.value(row, index);
            const percentage = value / total * 100;

            return Math.round(percentage) !== percentage ? percentage.toFixed(2) : percentage;
        }
    },
}
</script>

<style lang="scss">
.n4ja-comparison-bar-table {
    .value {
        width: 100px !important;
        font-weight: 600;
        text-align: center !important;
    }

    .count {
        text-align: right !important;
        float: none;
        
        width: 60px;
    }

    td.count {
        &.left {
            border-left: 1px solid rgba(34,36,38,.1) !important;
        }

        &.right {
            border-right: 1px solid rgba(34,36,38,.1) !important;
        }
    }

    .bar {
        min-width: 120px;
        padding-left: 0 !important;

        &.left {
            padding-right: 0 !important;
            padding-left: .78571429em !important;
            text-align: right;
        }
    }

    td.percentage {
        color: #aaa;
    }

    .percentage {
        &.right {
            text-align: right;
        }
    }

    td.count.left {
        text-align: left !important;
    }
}
</style>

