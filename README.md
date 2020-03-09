# N4ja

A set of components that will allow a Neo4j Consultant to rapidly prototype a Graph App with as little code as possible.


## Installation

```
npm link n4ja
```

```javascript
export { default as Vue } from 'vue'
export { default as N4ja } from 'n4ja'

// ...

Vue.use(N4ja, {
    // ...
});
```


## TODO



## Results

- **Table** - A table of results containing cards
- **List** - A list of results containing cards


## Component Types

- **Overview** - given an ID, show the main information (title, picture, caption)
- **Card** - given an ID, attempt to show as much information as possible





### Node


#### Component Selectivity

Where possible, a more specific component will be loaded

| # | Name                                      | Type                                                                                                       |
| 1 | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| 2 | `n4ja-node-officer-shareholder-of-entity` | Specific - node at the end of a relationship may have a different view depending on how it's being viewed  |
| 3 | `n4ja-node-officer-entity`                | Generic - display of a node in relation to it's parent regardless of relationship type                     |
| 4 | `n4ja-node-entity`                        | Generic - display an entity regardless of context                                                          |
| 5 | `n4ja-value-node`                         | Fallback - attempt to display the node labels and the properties                                           |



```
n4ja-{type}-{?parent}-{?rel}-{label}
       |         |       |      |
     Node        |       |    Label
 Relationship    |       |
                 |       |
            Parent Label |
                    Relationship
                    from parent



````

n4ja-relationship-officer-shareholder-of-entity

n4ja-relationship-shareholder-of






```bash
vue create panamapapers
cd panamapapers

npm i --save vue vue-router vue-neo4j
npm link n4ja



chainWebpack: config => config.resolve.symlinks(false),
```

## Chart

"chart.js": "^2.9.3",
"vue-chartjs": "^3.5.0",

## Maps

"leaflet": "^1.5.1",

## Graphs

"neovis.js": "^1.2.1",