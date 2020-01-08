import VueNeo4j from 'vue-neo4j'

import * as components from './components';

// import DataMixin from './mixins/data'

import './scss/n4ja.scss';

// Defaults
const N4ja = {

};

const defaultOptions = {
    flavour: 'bootstrap', // Or "semantic" - not really important at the moment
    labels: {},
    relationships: {},
    keys: {},
    icons: {},
    routes: [],
};

const defaultNodeDisplay = {
    overview: {
        name: '$.name',
        caption: '$.caption',
        picture: false,
    },
}

const defaultRelationshipDisplay = {
    overview: {
    }
}

export default {
    install: (Vue, opts = {}) => {
        // Install Components
        for ( const component in components ) {
            Vue.component(components[ component ].name, components[ component ] );
        }

        Vue.use(VueNeo4j);

        // Install Mixins
        // Vue.mixin(DataMixin);
        // Vue.mixin(ProfileMixin);
        // Vue.mixin(BloomMixin);
        // Vue.mixin(CustomisationMixin);
        // Vue.mixin(UtilMixin);

        const options = Object.assign({}, defaultOptions, opts);

        /**
         * Get the configuration for a node by it's labels
         */
        N4ja.getNodeConfig = node => {
            if (!node) {
                console.log('no node?', node)
                return {}
            }

            return Object.entries( options.labels )
                .filter(([ label, options ]) => node.labels.includes(label))
                .sort((a, b) => a.priority > b.priority )
                .map(([ label, options ]) => options)
                .pop() || defaultNodeDisplay;
        }

        N4ja.getRelationshipConfig = relationship => {
            if (!relationship) {
                console.log('no relationship?', relationship)
                return {}
            }

            return options.relationships[ relationship.type ] || defaultRelationshipDisplay;
        }

        Vue.$n4ja = Vue.prototype.$n4ja = Object.assign({}, N4ja, { options });

        // TODO: Support nodes...
        // Vue.prototype.getViewRoute = (type, key) => {
        //     if ( type  == 'relationship' ) {
        //         return options.relationships[ key ] ? options.relationships[ key ].route : null;
        //     }
        // };

    },
};
