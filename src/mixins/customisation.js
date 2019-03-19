import { v1 as neo4j } from 'neo4j-driver';

export default {
    computed: {
        castContext() {
            return Array.isArray(this.context) ? this.context : [ this.context ];
        },
        placeholder() {
            // TODO: Placeholder?  This is an ugly hack
            return 'data:image/svg+xml;charset=UTF-8,<svg version="1.1" id="Light" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><g><title>single-woman-circle</title><path d="M12,24C5.383,24,0,18.617,0,12C0,5.383,5.383,0,12,0c6.617,0,12,5.383,12,12C24,18.617,18.617,24,12,24z M12,1C5.935,1,1,5.935,1,12s4.935,11,11,11s11-4.935,11-11S18.065,1,12,1z"/><path d="M12,9.5c-1.841,0-3.395-1.32-3.696-3.138l0,0c-0.001,0-0.009-0.029-0.01-0.067C8.264,6.096,8.25,5.918,8.25,5.75C8.25,3.682,9.932,2,12,2c2.068,0,3.75,1.682,3.75,3.75c0,0.17-0.014,0.344-0.044,0.546c-0.001,0.044-0.01,0.075-0.015,0.09C15.389,8.185,13.835,9.5,12,9.5z M9.435,6.732C9.838,7.786,10.855,8.5,12,8.5c1.144,0,2.16-0.713,2.564-1.766C13.604,6.595,12.71,6.171,12,5.517C11.289,6.17,10.395,6.593,9.435,6.732z M12,4.3c0.145,0,0.283,0.063,0.378,0.173c0.602,0.696,1.456,1.153,2.372,1.277C14.75,4.233,13.516,3,12,3c-1.515,0-2.748,1.232-2.75,2.747c0.916-0.123,1.77-0.579,2.372-1.274C11.717,4.363,11.855,4.3,12,4.3z"/><path d="M9.998,21.5c-0.237,0-0.442-0.169-0.489-0.403L9.09,19H7c-0.158,0-0.309-0.076-0.403-0.204c-0.094-0.128-0.122-0.294-0.075-0.445l1.754-5.614c0.257-0.825,0.796-1.552,1.519-2.049c0.013-0.013,0.034-0.03,0.062-0.046c0.006-0.003,0.012-0.006,0.018-0.009c0.31-0.202,0.634-0.356,0.963-0.459c0.377-0.117,0.766-0.177,1.157-0.177c0.769,0,1.517,0.227,2.163,0.656c0,0,0.003,0.002,0.004,0.003c0.741,0.494,1.295,1.233,1.56,2.081l1.753,5.614c0.048,0.15,0.02,0.317-0.074,0.445C17.309,18.924,17.158,19,17,19h-2.09l-0.42,2.098C14.444,21.331,14.238,21.5,14,21.5c-0.034,0-0.067-0.003-0.1-0.01c-0.269-0.054-0.445-0.318-0.391-0.588l0.5-2.5C14.057,18.169,14.263,18,14.5,18h1.82l-1.551-4.965c-0.141-0.453-0.389-0.859-0.722-1.19l-1.61,2.898C12.349,14.901,12.181,15,12,15s-0.349-0.099-0.437-0.257l-1.609-2.897c-0.334,0.332-0.582,0.738-0.722,1.189L7.68,18H9.5c0.238,0,0.444,0.169,0.49,0.402l0.5,2.5c0.054,0.27-0.122,0.534-0.392,0.588C10.067,21.497,10.032,21.5,9.998,21.5z M12,13.47l1.221-2.198c-0.386-0.18-0.806-0.274-1.229-0.274c-0.289,0-0.577,0.044-0.855,0.131c-0.119,0.037-0.239,0.084-0.359,0.142L12,13.47z"/></g></svg>';
        },
    },
    methods: {  
        toComponentName(...parts) {
            return parts.join('-').toLowerCase().replace(/([^a-z0-9]+)/g, '-');
        },
        getContextComponent(base, context) {
            if ( context ) {
                const parts = Array.isArray(context) ? context : [ context ];

                // Get last part
                let last = parts.pop();
    
                // Try full specific context first
                if ( parts.length > 0 ) {
                    const combinedContext = this.toComponentName(base, parts);
    
                    const specificName = this.getContextComponent(combinedContext, last);

                    // TODO: Battle test this
                    if ( specificName !== combinedContext ) {
                        return specificName;
                    }
                }
                
                // Convert to array
                if ( !Array.isArray( last ) ) {
                    last = [ last ];
                }
    
                // Sort into alphabetical order
                last = last.sort((a, b) => a < b ? -1 : 1);
    
                // Check all together
                const combinedName = this.toComponentName(base, last);

                if ( this.checkComponent( combinedName ) ) {
                    
                    return combinedName;
                }
    
                // Check each individually
                for ( let i = 0; i < last.length; i ++ ) {
                    let individualName = this.toComponentName(base, last[ i ]);

    
                    if ( this.checkComponent( individualName ) ) {
                        return individualName;
                    }
                }
            }
    
            return base;
        },
        checkComponent(name) {
            if ( name.includes('zn4ja-node')) console.log('>>', name)
            return typeof this.$options.components[ name ] != 'undefined';
        },
    }
}