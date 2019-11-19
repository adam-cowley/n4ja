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
        const color = config.color || 'red';
        const opacity = config.opacity || .6;

        this.polyline = L.polyline([ this.start, this.end ], { color, opacity })
            .on('click', () => this.onClick(this.relationship, this.path))
            .addTo(getMap(this))

    },
    beforeDestroy() {
        // getMap(this).removeLayer(this.polyline)
    },
}
</script>