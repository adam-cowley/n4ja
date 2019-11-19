<template>
    <div class="n4ja-map">
        <div id="map" class="map-container" />
        <slot />
            <!-- <n4ja-map-layer 
                v-if="result"
                :map="map"
                :result="result"
                :markers="markers"
                :polylines="polylines"

                :onMarkerClick="onMarkerClick"
                :onPolylineClick="onPolylineClick"
            /> -->
    </div>
</template>

<script>
import leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'

// TODO: Configuration
const accessToken = 'pk.eyJ1IjoiYWRhbWNvd2xleSIsImEiOiJjazJwMjEwdXgwcDE0M2dzN3k4YnExNDZpIn0.zkBLjnorMcHvyjNGIiNp3g';


const _markers = []
const _polylines = []

export default {
    name: 'n4ja-map',
    props: {
        result: [ Object, Boolean, ],

        markers: {
            type: Array, 
            default: () => [], 
        },
        polylines: {
            type: Array, 
            default: () => [], 
        },

        onMarkerClick: {
            type: Function,
            default: () => {},
        },
        onPolylineClick: {
            type: Function,
            default: () => {},
        },
    },

    data: () => ({
        n4jaMap: false,
    }),
    mounted() {
        this.n4jaMap = L.map(this.$el.firstElementChild).setView([51.505, -0.09], 13);

        // Mapbox layer?
        if ( this.$n4ja.options.mapbox ) {
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                maxZoom: 15,
                id: 'mapbox.streets',
                accessToken: this.$n4ja.options.mapbox.accessToken,
            }).addTo(this.n4jaMap);
        }
    },

}
</script>
