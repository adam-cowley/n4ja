<script>
import { getMap } from './mapUtils'

export default {
    name: 'n4ja-map-marker',

    props: {
        point: Array,
        entity: Object,

        onClick: Function,
    },
    render: () => {},
    data: () => ({ marker: null, }),
    created() {
        const map = getMap(this);
        const config = this.$n4ja.getNodeConfig(this.entity)

        const options = {
            iconUrl: '/marker_32.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32]
        };

        // TODO: Tidy this up
        Object.entries( config.map && config.map.icon || {} ).forEach(([key, value]) => {
            if ( typeof value === 'function' ) {
                value = value(this.entity.properties)
            }

            options[ key ] = value
        });

        this.marker = L.marker( this.point, {
            icon: L.icon(options),
        } )
            .on('click', () => this.onClick(this.entity))
            .addTo( map )
    },
    beforeDestroy() {
        getMap(this).removeLayer(this.marker)
    },
}
</script>