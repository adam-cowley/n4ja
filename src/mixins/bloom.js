import { v1 as neo4j } from 'neo4j-driver';

export default {
    methods: {
        openBloom(phrase = '') {
            // eslint-disable-next-line
            document.location.href = `neo4j://neo4j-bloom?search=${phrase}`;
        },
        openBloomPhrase(text = this.bloomPhrase, node = this.node) {
            const phrase = this.format(text, node);

            this.openBloom(phrase);
        },
    },
}