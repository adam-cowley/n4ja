<template>
    <div class="n4ja-map">
        <div id="map" class="map-container" />
        <slot />
        <n4ja-map-layer
            v-if="result"
            :result="result"
            :markers="markers"
            :polylines="polylines"
            :onMarkerClick="onMarkerClick"
            :onPolylineClick="onPolylineClick"
        />
    </div>
</template>

<script>
// import leaflet from 'leaflet'
// import 'leaflet/dist/leaflet.css'

export default {
    name: 'n4ja-map',
    props: {
        result: [ Object, Boolean, ],

        centre: {
            type: Array,
            default: () => [51.505, -0.09],
        },
        zoom: {
            type: Number,
            default: 13,
        },

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
        this.n4jaMap = L.map(this.$el.firstElementChild).setView(this.centre, this.zoom);

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
