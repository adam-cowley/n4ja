<template>
    <div class="n4ja-map">
        <div id="map" />
        <slot :scope="map" />


        
    </div>
</template>

<script>
import leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'

// TODO: Configuration
const accessToken = 'pk.eyJ1IjoiYWRhbWNvd2xleSIsImEiOiJjazJwMjEwdXgwcDE0M2dzN3k4YnExNDZpIn0.zkBLjnorMcHvyjNGIiNp3g';
const srids = [ 4979, 4326, ];

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
        polygons: {
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
        map: false,
    }),
    mounted() {
        this.map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 15,
            id: 'mapbox.streets',
            accessToken,
        }).addTo(this.map);

        this.addMarkers()
    },

    methods: {
        clearMap() {
            // Remove old markers
            while ( _markers.length ) {
                const marker = _markers.pop()

                this.map.removeLayer(marker)
            }

            // Remove old markers
            while ( _polylines.length ) {
                const line = _polylines.pop()

                this.map.removeLayer(line)
            }
        },
        addMarkers() {
            this.clearMap();

            if ( !this.result ) return;

            // Add new markers
            this.result.records.map(row => {
                // Add explicit Markers
                this.markers.filter(key => row.has(key)).map(key => {
                    const obj = row.get(key)

                    if ( obj.properties ) {
                        this.addNodeMarker(obj);
                    }
                    else if ( obj.segments ) {
                        this.addNodeMarker(obj.segments[0].start)
                        obj.segments.map(segment => this.addNodeMarker(segment.end))
                    }
                })

                // Add explicit Polylines
                this.polylines.filter(key => row.has(key)).map(key => {
                    const obj = row.get(key)

                    if ( obj.segments ) {
                        this.addPath(obj)
                    }
                })
            })

            this.centreMap()
        },
        centreMap() {
            if ( !_markers.length ) return;

            const points = _markers.map(marker => marker.getLatLng())

            this.map.fitBounds(points)
        },
        addNodeMarker(obj) {
            Object.entries(obj.properties).forEach(([key, value]) => {
                if ( value.hasOwnProperty('srid') && srids.includes( value.srid.toNumber() ) ) {
                    this.addMarker(value, obj)
                }
            })
        },
        addMarker(point, obj) {
            // TODO: Custom Icons
            const icon = L.icon({
                iconUrl: '/marker_32.png',
                iconSize: [32, 32],
                iconAnchor: [16, 32]
            })

            const marker = L.marker( [point.y, point.x], {
                icon,
            } )
                .on('click', () => this.onMarkerClick(obj))
                .addTo(this.map)

            _markers.push(marker)
        },
        addPath(path, obj) {
            path.segments.forEach(segment => {
                const { start, end, relationship } = segment
                // TODO: Default colour?

                const config = this.$n4ja.options.relationships[ relationship.type ] || {}
                const color = config.color || 'red';
                const opacity = config.opacity || .6;

                const startPosition = this.findCoordinates(start);
                const endPosition = this.findCoordinates(end);

                const polyline = L.polyline([ startPosition, endPosition ], { color, opacity })
                    .on('click', () => this.onPolylineClick(segment, obj))
                    .addTo(this.map)

                _polylines.push(polyline)
            })

            // // const color = this.$n4ja.config.relationships[  ]

            // const pos = [
            //     [path.start.properties.latitude, path.start.properties.longitude]
            // ]

            // path.segments.forEach(segment => {
            //     console.log(segment)
            //     pos.push( [segment.end.properties.latitude, segment.end.properties.longitude] )
            // })

            // // TODO: Colours?
            // const polyline = L.polyline(pos, {color: 'red', opacity: 0.6, fill: false}).addTo(this.map);

            // _polylines.push(polyline)
        },

        findCoordinates(obj) {
            // TODO: Handle more than one coordinate
            return Object.entries(obj.properties).filter(([key, value]) => value.hasOwnProperty('srid') && srids.includes( value.srid.toNumber() ))
                .map(([key, value]) => [ value.y, value.x ])
                .pop()
        },


// const pos = [
//         [path.start.properties.latitude, path.start.properties.longitude]
//       ]

//       this.addMarker(path.start, 'black')

//       path.segments.forEach(segment => {
//         pos.push( [segment.end.properties.latitude, segment.end.properties.longitude] )

//         this.addMarker(segment.end, 'green')
//       })

//       const polyline = L.polyline(pos, {color, opacity: 0.6, fill: false}).addTo(this.map);
//       // zoom the map to the polyline
//       this.map.fitBounds(polyline.getBounds());
//         },
    },
    watch: {
        result() {
            this.addMarkers()
        },
    }
}
</script>

<style>
#map {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ccc;
}
</style>