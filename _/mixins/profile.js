import { v1 as neo4j } from 'neo4j-driver';

export default {
    methods: {
        idParams() {
            return {
                id: new neo4j.int( this.id ),
            };
        },
        format(value, node = this.node) {
            if ( value ) {
                if ( typeof value == 'function' ) {
                    return value(node, this);
                }
                else if ( value ) {
                    return this.formatText(value, node);
                }
            }
        },
        formatText(text, node = this.node) {
            if ( !node ) return '';

            // Replace ID
            text = text.replace('<id>', this.id);

            // Replace Count
            if ( this.count ) {
                text = text.replace('<count>', this.count.toNumber());
            }

            // Replace anything starting with $ with the node property
            const matches = text.match(/\$([a-z0-0_]+)/ig);

            const properties = node.properties || node || {};
            
            if ( matches ) {
                matches.forEach(match => {
                    const key = match.substr(1);

                    let value = properties[ key ];
                    
                    if ( !value ) {
                        value = '';
                    }
                    else if ( neo4j.isInt(value) ) {
                        value = value.toNumber();
                    }

                    text = text.replace(match, value);
                });
            }

            return text;
        },
    },
}