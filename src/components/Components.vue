<template>
    <div>
        <n4ja-grid>
            <n4ja-column columns="12">
                <h1>Cypher</h1>
            </n4ja-column>
        </n4ja-grid>

        <n4ja-grid>
            <n4ja-column columns="4">
                <h2>n4ja-cypher-overviews</h2>
                <p>Takes a cypher query and displays the results as a set of overviews</p>
                <pre>
&lt;n4ja-cypher-overviews
    :context="['Something']"
    cypher="
        MATCH (n) 
        RETURN n, 
            size((n)--()) AS nb 
        ORDER BY nb DESC
        LIMIT 2"

    node="n"
    noResults="NO RESULTS YO"

    :cards="true"
/&gt;
                </pre>
            </n4ja-column>

            <n4ja-column columns="8">
                <n4ja-cypher-overviews
                    :context="['Something']"
                    cypher="
                        MATCH (n)
                        RETURN n
                        LIMIT 2"
                    noResults="NO RESULTS YO"
                    node="n"
                    :cards="true"
                />
            </n4ja-column>
        </n4ja-grid>

        <n4ja-grid>
            <n4ja-column columns="4">
                <p>...or for a set of relationships</p>
                <pre>
&lt;n4ja-cypher-overviews
    :context="['Something']"
    cypher="
        MATCH (n)-[r]->(x) 
        RETURN r
        LIMIT 2"
    
    noResults="NO RESULTS YO"

    :cards="true"
    
    relationship="r"
    start="n"
    end="x"
/&gt;
                </pre>
            </n4ja-column>

            <n4ja-column columns="8">
                <n4ja-cypher-overviews
                    :context="['Something']"
                    cypher="
                        MATCH (n)-[r]->(x)
                        RETURN n, r, x
                        LIMIT 2"
                    noResults="NO RESULTS YO"
                    relationship="r"
                    start="n"
                    end="x"
                    :cards="true"
                />
            </n4ja-column>
        </n4ja-grid>


        <n4ja-grid>
            <n4ja-column columns="4">
                <h2>n4ja-cypher-details</h2>
                <p>Takes a cypher query and displays the results as a set of entity details components</p>
                <pre>
&lt;n4ja-cypher-details
    :context="['Something']"
    cypher="
        MATCH (n) 
        RETURN n, 
            {
                neighbours: [ (n)--(r) | r ][0..10]
            } AS relationships
        LIMIT 3"

    node="n"
    relationships="relationships"
    noResults="NO RESULTS YO"

    :cards="true"
/&gt;
                </pre>

                <p style="font-style:italic">Depending on your configuration, it may look like these are just a set of overviews</p>
            </n4ja-column>

            <n4ja-column columns="8">
                <n4ja-cypher-details
                    :context="['Something']"
                    cypher="
                        MATCH (n) 
                        RETURN n, 
                            {
                                neighbours: [ (n)--(r) | r ][0..10]
                            } AS relationships
                        LIMIT 2"

                    node="n"
                    relationships="relationships"
                    noResults="NO RESULTS YO"

                    :cards="true"
                />
            </n4ja-column>
        </n4ja-grid>

        <n4ja-grid>
            <n4ja-column columns="4">
                <h2>n4ja-cypher-table</h2>
                <p>Takes a cypher query and displays the results in a table</p>
                <pre>
&lt;n4ja-cypher-table
    :context="['Something']"
    cypher="
        MATCH (n) 
        RETURN n, 
            size((n)--()) AS nb 
        ORDER BY nb DESC
        LIMIT 2"
    :columns="['n', 'neighbours']"
    noResults="NO RESULTS YO"
    :index="true"
/&gt;
                </pre>
            </n4ja-column>

            <n4ja-column columns="8">
                <n4ja-cypher-table
                    :context="['Something']"
                    cypher="
                        MATCH (n) 
                        RETURN n, 
                            size((n)--()) AS neighbours 
                        ORDER BY neighbours DESC
                        LIMIT 2"
                    :columns="['n', 'neighbours']"
                    noResults="NO RESULTS YO"
                    :index="true"
                />
            </n4ja-column>
        </n4ja-grid>

        <n4ja-grid>
            <n4ja-column columns="12">
                <h1>Presentation &amp; UI</h1>
                <p>Stateless components to make a nice looking UI.  The computation of the props should be done before using these components.</p>
            </n4ja-column>
        </n4ja-grid>

        <n4ja-grid>
            <n4ja-column columns="12">
                <h1>Grid</h1>
            </n4ja-column>
        </n4ja-grid>

        <n4ja-grid>
            <n4ja-column v-for="n in [1,2,3,4,5,6,7,8,9,10,11,12]" :key="n" :columns="1">
                <n4ja-card>
                    <n4ja-card-body>
                    1
                    </n4ja-card-body>
                </n4ja-card>
            </n4ja-column>
        </n4ja-grid>
        <n4ja-grid>
            <n4ja-column v-for="n in [1,2,3,4,5,6]" :key="n" :columns="2">
                <n4ja-card>
                    <n4ja-card-body>
                    2
                    </n4ja-card-body>
                </n4ja-card>
            </n4ja-column>
        </n4ja-grid>
        <n4ja-grid>
            <n4ja-column v-for="n in [1,2,3,4]" :key="n" :columns="3">
                <n4ja-card>
                    <n4ja-card-body>
                    3
                    </n4ja-card-body>
                </n4ja-card>
            </n4ja-column>
        </n4ja-grid>


        <n4ja-grid>
            <n4ja-column :columns="4">
                <n4ja-card>
                    <n4ja-card-body>
                    4
                    </n4ja-card-body>
                </n4ja-card>
            </n4ja-column>
            <n4ja-column :columns="8">
                <n4ja-card>
                    <n4ja-card-body>
                    8
                    </n4ja-card-body>
                </n4ja-card>
            </n4ja-column>
        </n4ja-grid>

        <n4ja-grid>
            <n4ja-column :columns="6">
                <n4ja-card>
                    <n4ja-card-body>
                    6
                    </n4ja-card-body>
                </n4ja-card>
            </n4ja-column>
            <n4ja-column :columns="6">
                <n4ja-card>
                    <n4ja-card-body>
                    6
                    </n4ja-card-body>
                </n4ja-card>
            </n4ja-column>
        </n4ja-grid>

        <n4ja-grid>
            <n4ja-column :columns="2">
                <n4ja-card>
                    <n4ja-card-body>
                    2
                    </n4ja-card-body>
                </n4ja-card>
            </n4ja-column>
            <n4ja-column :columns="10">
                <n4ja-card>
                    <n4ja-card-body>
                    10
                    </n4ja-card-body>
                </n4ja-card>
            </n4ja-column>
        </n4ja-grid>

        <n4ja-grid>
            <n4ja-column columns="4">
                <h2>Cards</h2>
                <p>Given a relationship, start and end nodes, display the relationship overview followed by a <code>dl</code> of properties and nodes according to the config provided to n4ja.</p>
                <pre>&lt;n4ja-card :header="someProp"&gt;
    &lt;n4ja-card-body&gt;
        Some body text
    &lt;/n4ja-card-body&gt;
    &lt;n4ja-card-footer&gt;
        Text in the footer
    &lt;/n4ja-card-footer&gt;
&lt;/n4ja-card&gt;
</pre>
            </n4ja-column>

            <n4ja-column columns="8">
                <n4ja-card header="Header in the :header='' prop, or use <n4ja-card-header/>">
                    <n4ja-card-body>
                        Something in the <code>&lt;n4ja-card-body&gt;</code>
                    </n4ja-card-body>

                    <n4ja-card-footer>
                        Some footer text inside <code>&lt;n4ja-card-footer&gt;</code>
                    </n4ja-card-footer>
                </n4ja-card>
            </n4ja-column>
        </n4ja-grid>


        <n4ja-grid>
            <n4ja-column columns="4">
                <h2>Header</h2>
                <pre>
&lt;n4ja-entity-header 
    :context="['Something']"
    name="Name"
    caption="Caption"
    picture="/marker_32.png"
/&gt;
                </pre>
            </n4ja-column>

            <n4ja-column columns="8">
                <n4ja-card>
                    <n4ja-card-body>
                        <n4ja-entity-header 
                            :context="['Something']"
                            name="Name"
                            caption="Caption"
                            picture="/marker_32.png"
                        />
                    </n4ja-card-body>
                </n4ja-card>
            </n4ja-column>
        </n4ja-grid>


        <n4ja-grid>
            <n4ja-column columns="12">
                <h1>Nodes &amp; Relationships</h1>
                <p>Quickly displaying stuff in a pretty container</p>
            </n4ja-column>
        </n4ja-grid>

        <n4ja-grid>
            <n4ja-column columns="4">
                <h2>Node Overview</h2>
                <p>Given a node, work out what is important and display it in a <code>n4ja-entity-header</code> component.</p>
                <pre></pre>
            </n4ja-column>

            <n4ja-column columns="8" />
        </n4ja-grid>

        <n4ja-grid>
            <n4ja-column columns="4">
                <h2>Node Details</h2>
                <p>Given a node and some relationships, display the node overview followed by a <code>dl</code> of properties and relationships according to the config provided to n4ja.</p>
                <pre></pre>
            </n4ja-column>

            <n4ja-column columns="8" />
        </n4ja-grid>

        <n4ja-grid>
            <n4ja-column columns="4">
                <h2>Relationship Overview</h2>
                <p>Given a relationship, start and end nodes, work out what is important and display it in a <code>n4ja-entity-header</code> component.</p>
                <pre></pre>
            </n4ja-column>

            <n4ja-column columns="8" />
        </n4ja-grid>

        <n4ja-grid>
            <n4ja-column columns="4">
                <h2>Relationship Details</h2>
                <p>Given a relationship, start and end nodes, display the relationship overview followed by a <code>dl</code> of properties and nodes according to the config provided to n4ja.</p>
                <pre></pre>
            </n4ja-column>

            <n4ja-column columns="8" />
        </n4ja-grid>


        <n4ja-grid>
            <n4ja-column columns="4">
                <h1>To Do</h1>
                <p>The stuff I'd like to find time to get around to</p>
            </n4ja-column>

            <n4ja-column columns="8">
                <ul>
                    <li>A generic search page with pagination (eg. Santander)</li>
                    <li>Generate a whole profile from a cypher query and some config</li>
                    <li>Tidy up the codebase</li>
                    <li>Utility Classes</li>
                    <li>Better theming</li>
                </ul>
            </n4ja-column>

        </n4ja-grid>




        <!-- copy me 
        <n4ja-grid>
            <n4ja-column columns="12">
                <h1>CopyMe</h1>
            </n4ja-column>
        </n4ja-grid>

        <n4ja-grid>
            <n4ja-column columns="4">
                <h2>x</h2>
                <pre>
y
                </pre>
            </n4ja-column>

            <n4ja-column columns="8">
                val
            </n4ja-column>
        </n4ja-grid>

        / copy me -->

    </div>
</template>

<script>
export default {
    name: 'n4ja-components',
}
</script>

<style scoped>
pre {
    background: #fff;
    padding: 12px;
    border-radius: 6px;
    overflow: auto;
}
.n4ja-column {
    min-width: auto !important;
}
</style>