import { v1 as neo4j } from 'neo4j-driver';

export default {
    methods: {
        openBloom(phrase = '') {
            let host = 'neo4j://neo4j-bloom?';

            // If there is no desktop api, assume that then can be sent to the browser version
            if ( !window.neo4jDesktopApi ) {
                const [ bolthost, boltport ] = this.$neo4j.getDriver()._hostPort.split(':');

                // TODO: Get the actual protocol and port
                const protocol = 'http';
                const port = 7474;

                host = `${protocol}://${bolthost}:${port}/browser/bloom`;
            }

            // eslint-disable-next-line
            document.location.href = `${host}?search=${phrase}`;
        },
        openBloomPhrase(text = this.bloomPhrase, node = this.node) {
            const phrase = this.format(text, node);

            this.alert = {
                type: 'info',
                title: 'Opening Bloom',
                message: phrase
            };

            this.openBloom(phrase);
        },
    },
}