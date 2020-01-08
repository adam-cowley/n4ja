<template>
    <div class="n4ja-line-chart">
        <line-chart
            v-if="!loading"
            :chartdata="chartData"
            :options="options"
        />
    </div>
</template>

<script>
import { Line } from 'vue-chartjs'

const LineChart = {
    extends: Line,
    props: {
        chartdata: {
            type: Object,
            default: null,
        },
        options: {
            type: Object,
            default: null,
        }
    },
    mounted () {
        this.renderChart(this.chartdata, this.options)
    },
}

import { colours } from './theme';

export default {
    name: 'n4ja-line-chart',
    components: {
        LineChart,
    },
    props: {
        result: {
            type: null,
            description: 'Neo4j Driver Result',
        },

        xAxis: {
            type: String,

        },
        yAxis: {
            type: [ String, Array, ],
        },
    },
    data: () => ({
        loading: true,
    }),

    computed: {
        labels() {
            return this.result.records.map(row => this.toString( row.get(this.xAxis)))
        },
        datasets() {
            return this.yAxis.map((label, index) => ({
                label: label,
                borderColor: colours[ index ],
                opacity: .8,
                fill: false,
                data: this.result.records.map(row => this.toString( row.get(label) )),
            }))
        },
        chartData() {
            return {
                labels: this.labels,
                datasets: this.datasets,
            }
        },
        options() {
            return {
                responsive: true,
                maintainAspectRatio: false,

                layout: {
                    padding: 0,
                },

                legend: {
                    position: 'bottom',
                },

                scales: {
                    xAxes: [{
                        // ticks: { display: false },
                        gridLines: {
                            display: false,
                            drawBorder: false
                        }
                    }],
                    yAxes: [{
                        ticks: { display: true },
                        gridLines: {
                            display: true,
                            drawBorder: true
                        }
                    }]
                }
            }
        },
    },

    mounted() {
        this.loading = !this.result;
    },
}
</script>