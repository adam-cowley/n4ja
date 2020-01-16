<template>
    <div class="n4ja-sparkline">
        <line-chart
            :chartdata="chartData"
            :options="options"

            :width="width"
            :height="height"
        />
    </div>
</template>

<script>
import { Line, } from 'vue-chartjs'

import { theme_success, theme_info, theme_warning, theme_danger  } from './theme'

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
        },
    },
    mounted () {
        this.renderChart(this.chartdata, this.options)
    },
}

import EntityComponent from '../../EntityComponent'

export default {
    name: 'n4ja-sparkline',
    mixins: [
        EntityComponent,
    ],
    props: {
        data: Array,

        height: {
            type: Number,
            default: 80,
        },
        width: {
            type: Number,
            default: 120,
        },
    },
    components: {
        LineChart,
    },
    data: () => ({
        context: false,
        gradient: false,
    }),

    computed: {
        datasets() {
            const ctx = document.createElement("canvas").getContext('2d')

            const gradient = ctx.createLinearGradient(this.width /2, 0, this.width/2, this.height);
            
            gradient.addColorStop(0, theme_success)
            gradient.addColorStop(.25, theme_info)
            gradient.addColorStop(.5, theme_warning)
            gradient.addColorStop(.7, theme_danger)
            gradient.addColorStop(1, theme_danger)

            return [
                {
                    fill: false,
                    // borderColor: theme_success,// this.gradient,
                    // fillColor: this.gradient,

                    borderColor:              gradient,
                    // pointBorderColor:          gradientStroke,
                    // pointBackgroundColor:      gradientStroke,
                    // pointHoverBackgroundColor: gradientStroke,
                    // pointHoverBorderColor:     gradientStroke,

                    data: this.data.map(value => this.toString( value ) ),
                }
            ]
        },
        chartData() {
            return {
                datasets: this.datasets,
            }
        },
        options() {
            return {
                responsive: false,
                maintainAspectRatio: false,

                layout: {
                    padding: 0,
                },

                legend: {
                    display: false,
                },
                
                elements: {
                    line: {
                        borderWidth: 2,
                    },
                    point: {
                        radius: 0,
                    },
                },

                scales: {
                    xAxes: [{
                        // ticks: { display: false },
                        gridLines: {
                            display: false,
                        }
                    }],
                    yAxes: [{
                        ticks: { display: false },
                        gridLines: {
                            display: false,
                        }
                    }]
                },

                tooltips: false,
                
      
            }
        },
    },
}
</script>