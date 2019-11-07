import { v1 as neo4j } from 'neo4j-driver';

export default {
    methods: {  
        toInt(value) {
            if ( neo4j.isInt(value) ) {
                value = value.toNumber();
            }

            else if ( Array.isArray(value) ) {
                value = value.map(this.toInt);
            }

            else if ( typeof value === "object" ) {
                for ( const key in value ) {
                    value[ key ] = this.toInt(value[ key ]);
                }
            }

            return value;
        },
    },
}