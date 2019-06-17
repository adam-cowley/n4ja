import Vue from 'vue';
import VueNeo4j from 'vue-neo4j';

import * as components from './components';

import ProfileMixin from './mixins/profile';
import BloomMixin from './mixins/bloom';
import CustomisationMixin from './mixins/customisation';
import UtilMixin from './mixins/utils';

import './semantic.min.css';

// Defaults
const N4ja = {};

const defaultOptions = {
    flavour: 'bootstrap', // Or "semantic" - not really important at the moment
    labels: {},
    relationships: {},
    keys: {},
    icons: {},
};

export default {
    install: (Vue, opts = {}) => {
        // Install Components
        for ( const component in components ) {
            Vue.component(components[ component ].name, components[ component ] );
        }

        Vue.use(VueNeo4j);

        // Install Mixins
        Vue.mixin(ProfileMixin);
        Vue.mixin(BloomMixin);
        Vue.mixin(CustomisationMixin);
        Vue.mixin(UtilMixin);

        const options = Object.assign({}, defaultOptions, opts);

        Vue.$n4ja = Vue.prototype.$n4ja = Object.assign({}, N4ja, { options });

        // TODO: Support nodes...
        Vue.prototype.getViewRoute = (type, key) => {
            if ( type  == 'relationship' ) {
                return options.relationships[ key ] ? options.relationships[ key ].route : null;
            }
        };
    },
}