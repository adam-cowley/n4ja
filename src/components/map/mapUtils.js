export const getMap = (component) => {
    while ( component.$parent ) {
        component = component.$parent

        if ( component.n4jaMap ) {
            return component.n4jaMap
        }
    }

    return false;
  };