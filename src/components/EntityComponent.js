import jsonpath from 'jsonpath'


export default {
    methods: {
        pad(value, length = 2, char = '0') {
            return ( char.repeat(length) + value ).substr(-2)
        },
        toString(value) {
            // TODO: Support more types & friendly formatting

            if ( typeof value.toNumber === 'function' ) {
                return value.toNumber()
            }

            // Date
            if ( value.year && value.month && value.day ) { 
                return `${value.year.toNumber()}-${ this.pad(value.month.toNumber()) }-${ this.pad(value.day.toNumber())}`
            }


            return value
        },
        find(object, query) {
            return jsonpath.query(object, query)
        },

        // TODO: Clean this up
        setData(mapping, data, join = ' ') {
            if ( !mapping ) mapping = {}

            return Object.entries( mapping.overview || {} ).map(([ key, path ]) => {
                if ( !Array.isArray(path) ) {
                    path = [ path ];
                }

                const value = path.map(query => {
                    if ( typeof query === 'function' ) {
                        return query(data)
                    }
                    else if ( typeof query === 'string' ) {
                        // jsonpath?
                        if ( query.substr(0, 1) === '$' ) {
                            return jsonpath.query(data, query) 
                        }

                        // Return a simple property
                        return data[ query ]
                    }
                    
                    return '??'
                }).join(join);

                this[ key ] = value;
            });
        },

        appendContext(current, additional) {
            const updated = Array.isArray(current)
                ? current.slice(0)
                : [ current ]

            updated.push(additional)

            return updated
        },
        // toComponent(base, context) {
        //     return [ base, ...context ].map(n => n.toLowerCase().replace(/[^a-z0-9]+/, SEPARATOR) ).join(SEPARATOR)
        // },
        // checkComponent(name) {
        //     return typeof this.$options.components[ name ] != 'undefined';
        // },
        // getContextComponent(fallback = 'div') {
        //     const base = this.$options._componentTag;

        //     let context = []

        //     if ( !this.context ) {
        //         console.error(`NO CONTEXT FOR ${base}`)
        //     }
        //     else {
        //         context = Array.isArray(this.context) ? this.context : [ this.context ];
        //     }

        //     // Check for specific component - eg [ 'Actor', 'ACTED_IN', 'Movie' ] - n4ja-node-overview-actor-acted-in-movie
        //     if ( context.length > 1 ) {
        //         const specific = this.toComponent(base, context)

        //         if ( this.checkComponent(specific) ) {
        //             return specific;
        //         }
        //     }

        //     // Check for more generic component - eg [ 'Actor', 'ACTED_IN', 'Movie' ] - n4ja-node-overview-movie
        //     const generic = this.toComponent( base, context.slice(-1) )

        //     if ( this.checkComponent(generic) ) {
        //         return generic;
        //     }

        //     return fallback;
        // },

        headerStyle() {
            return {
                'background-image': this.cover ? `url( ${this.cover})` : 'none',
            };
        },
        pictureStyle() {
            return {
                'background-image': this.picture ? `url( ${this.picture})` : 'none',
            };
        },
    }
}