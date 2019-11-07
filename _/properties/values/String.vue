<template>
    <span v-html="valueString" />
</template>


<script>
import { v1 as neo4j } from 'neo4j-driver';

export default {
    name: 'N4jaValueString',
    props: {
        component: String,
        name: String,
        type: String,
        value: [ String, Number, Array, Object ],
    },
    computed: {
        valueString() {
            const { value } = this;

            return this.valueToString(value);
        },
    },
    methods: {
        valueToString(value) {
            if ( typeof value == 'string' ) {
                return value.length > 30
                    ? `<abbr title="${value}">${ value.substr(0, 30) }&hellip;</abbr>` 
                    : value;
            }
            else if ( neo4j.isInt(value) ) {
                return value.toNumber();
            }
            else if ( neo4j.isDateTime(value) ) {
                // TODO: Handle Formats - momentjs?
                return `${value.day}/${value.month}/${value.year} ${value.hour}:${value.minute}:${value.second} (${value.timeZoneId || value.timeZoneOffsetSeconds})`;
            }
            else if ( Array.isArray(value) ) {
                return value.map(v => this.valueToString(v))
                    .join(',<br>');
            }
            else if ( typeof value == 'object' && value.properties ) {
                const keys = Object.keys(value.properties);

                return keys
                    .filter(key => keys.length == 1 || key.toLowerCase().indexOf('id') == -1)
                    .map(key => value.properties[ key ])
                    .filter(value => !neo4j.isDateTime(value))
                    .join(', ');
            }

            return value;
        },
    },
}
</script>
