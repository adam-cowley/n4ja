<template>
    <span class="n4ja-id">
        &lt;{{ idString }}&gt;
    </span>
</template>

<script>
import { v1 as neo4j } from 'neo4j-driver';

export default {
    name: 'N4jaId',
    props: {
        id: [ String, Number, Object ],
    },
    computed: {
        idString() {
            if ( neo4j.isInt(this.id) ) {
                return this.id.toNumber();
            }

            return this.id;
        },
    },
}
</script>

