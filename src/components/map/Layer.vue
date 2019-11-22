<template>
    <span>
        <n4ja-map-marker 
            v-for="marker in currentMarkers" 
            :key="'n'+ marker.entity.identity.toNumber()"
            :entity="marker.entity"
            :point="marker.point"
            :onClick="onMarkerClick"
        />

        <n4ja-map-polyline
            v-for="line in currentPolylines"
            :key="'r'+ line.relationship.identity.toNumber()"
            :relationship="line.relationship"
            :start="line.start"
            :end="line.end"
            :path="line.path"
            :onClick="onPolylineClick"
        />

    </span>
</template>

<script>
import { getMap } from './mapUtils'

const srids = [ 4979, 4326, ];


export default {
    name: 'n4ja-map-layer',
    props: {
        result: Object,

        markers: {
            type: [ Array, String ], 
            default: () => [], 
        },
        polylines: {
            type: [ Array, String ], 
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
        currentMarkers: [],
        currentPolylines: [],
    }),
    computed: {
        cleanedMarkers() {
            return Array.isArray(this.markers) ? this.markers : [ this.markers ]
        },
        cleanedPolylines() {
            return Array.isArray(this.polylines) ? this.polylines : [ this.polylines ]
        },
    },
    mounted() {
        this.addLayers();
    },
    methods: {
        clearMap() {
            this.currentMarkers = []
            this.currentPolylines = []
        },

        fitBounds() {
            getMap(this).fitBounds( this.currentMarkers.map(marker => marker.point) )
        },

        addLayers() {
            this.clearMap();

            if ( !this.result ) return;

            // Add new markers
            this.result.records.map(row => {
                // Add explicit Markers
                this.cleanedMarkers.filter(key => row.has(key)).map(key => {
                    const obj = row.get(key)

                    if ( obj.properties ) {
                        this.addNodeMarker(obj);
                    }
                    else if ( obj.segments ) {
                        this.addNodeMarker(obj.segments[0].start)
                        // TODO: End nodes for segments
                        obj.segments.map(segment => this.addNodeMarker(segment.end))
                    }
                })

                // Add explicit Polylines
                this.cleanedPolylines.filter(key => row.has(key)).map(key => {
                    const obj = row.get(key)

                    if ( obj.segments ) {
                        this.addPath(obj)
                    }
                })
            })

            this.fitBounds();
        },

        addNodeMarker(entity) {
            const id = entity.identity.toNumber()

            if ( this.currentMarkers.find(r => r.id === id) ) {
                return
            }

            const point = this.findCoordinates(entity)

            if ( point ) {
                this.currentMarkers.push({ id, point, entity })
            }
        },
        addRelationship(path, segment) {
            const start = this.findCoordinates(segment.start)
            const end = this.findCoordinates(segment.end)
            const { relationship } = segment

            this.currentPolylines.push({ start, end, relationship, segment, path })
        },
        addPath(path, obj) {
            path.segments.forEach(segment => {
                this.addRelationship(path, segment)
            })
        },

        findCoordinates(obj) {
            // TODO: Handle more than one coordinate
            return Object.entries(obj.properties).filter(([key, value]) => value.hasOwnProperty('srid') && srids.includes( value.srid.toNumber() ))
                .map(([key, value]) => [ value.y, value.x ])
                .pop()
        },
    },
    watch: {
        result() {
            this.addLayers();
        },
    },
}
</script>