<script>
import { getMap } from './mapUtils'

export default {
    name: 'n4ja-map-polyline',

    props: {
        point: Object,
        relationship: Object,
        start: Array,
        end: Array,
        path: Object,

        onClick: Function,
    },
    render: () => {},
    data: () => ({ polyline: null, }),
    created() {
        const config = this.$n4ja.options.relationships[ this.relationship.type ] || {}

        let color = config.color || 'red';
        if ( typeof color == 'function' ) color = color(this.relationship)

        const options = {
            color,
            opacity: .6,
            width: 2,
        }

        // TODO: Tidy this up
        Object.entries( config.map && config.map.polyline || {} ).forEach(([key, value]) => {
            if ( typeof value === 'function' ) {
                value = value(this.entity)
            }

            options[ key ] = value
        });

        this.polyline = L.polyline([ this.start, this.end ], options)
            .on('click', () => this.onClick(this.relationship, this.path))
            .addTo(getMap(this))

    },
    beforeDestroy() {
        getMap(this).removeLayer(this.polyline)
    },
}
</script>