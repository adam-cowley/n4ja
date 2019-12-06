const SEPARATOR = '-'

export default {
    props: {
        context: {
            type: [ Array, String, ],
            description: 'The context in which this key is being displayed',
            default: () => [],
        },
    },
    methods: {
        getContextComponent(fallback = 'div') {
            const base = this.$options._componentTag;

            let context = []

            if ( !this.context ) {
                console.error(`NO CONTEXT FOR ${base}`)
            }
            else {
                context = Array.isArray(this.context) ? this.context : [ this.context ];
            }

            // Check for specific component - eg [ 'Actor', 'ACTED_IN', 'Movie' ] - n4ja-node-overview-actor-acted-in-movie
            if ( context.length > 1 ) {
                const specific = this.toComponent(base, context)

                if ( this.checkComponent(specific) ) {
                    return specific;
                }
            }

            // Check for more generic component - eg [ 'Actor', 'ACTED_IN', 'Movie' ] - n4ja-node-overview-movie
            const generic = this.toComponent( base, context.slice(-1) )

            if ( this.checkComponent(generic) ) {
                return generic;
            }

            return fallback;
        },
        toComponent(base, context) {
            return [ base, ...context ].map(n => n.toLowerCase().replace(/[^a-z0-9]+/, SEPARATOR) ).join(SEPARATOR)
        },
        checkComponent(name) {
            return typeof this.$options.components[ name ] != 'undefined';
        },
    },
}