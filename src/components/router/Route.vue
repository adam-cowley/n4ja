<template>
    <div class="n4ja-route">
        <n4ja-loading v-if="loading" />

        <template v-else>
            <n4ja-children
                :children="children"
                :data="data"
            />


            <div style="margin: 60px; background: #eeeeee; padding: 10px; border: 1px solid #ccc">
            <pre>children: {{ children }}</pre>


            <pre>data: {{data}}</pre>
            <pre>path: {{$route.path}}</pre>
            <pre>name: {{$route.name}}</pre>
            <pre>params: {{$route.params}}</pre>

            <pre>children: {{ children }}</pre>
            </div>
        </template>
    </div>
</template>

<script>


export default {
    name: 'n4ja-route',
    mounted() {
        this.init();
    },
    data() {
        return {
            loading: true,
            children: [],

            data: [],
        };
    },
    methods: {
        init() {
            this.loading = true;

            const config = this.$n4ja.options.routes.find(r => r.name == this.$route.name);
            this.children = config.children;

            this.load();
        },
        load() {
            // TODO: Load cypher
            // TODO: Load GraphQL

            setTimeout(() => {
                this.loading = false;
                this.data = this.$route.name == 'movie' ?
                    { id: 9999, title: 'The Matrix',
                        tagline: "Reality is a thing of the past.",
                        picture: 'https://cdn.theatlantic.com/assets/media/img/mt/2019/03/Matrix/lead_720_405.jpg?mod=1554125211',
                        cover: 'https://cdn.onebauer.media/one/empire-images/articles/5cd5741b133d503e3a49a5c9/matrix-reloaded.jpg?quality=50&width=1800&ratio=16-9&resizeStyle=aspectfill&format=jpg',
                    }
                : {
                    id: 1234,
                    firstName: 'Max',
                    lastName: 'Power',
                    jobTitle: 'Field Engineer',

                    cover: 'https://images.unsplash.com/photo-1571253128585-a45f981abb78?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
                    photo: 'https://randomuser.me/api/portraits/men/32.jpg',

                    totalSpend: 19274.28,
                    dailySpend: 5.30,

                    socialConnectionsCount: 128,
                    socialConnections: [],

                    currentLocation: { id: 1, name: 'London', cover: 'https://london.ac.uk/sites/default/files/styles/promo_mobile/public/2018-10/london-aerial-cityscape-river-thames_1.jpg?itok=ekaaHHpi'  },
                    homeStation: { id: 2, name: 'Swindon, Wiltshire', cover: 'https://growthhub.swlep.co.uk/images/librariesprovider2/news-images/swindon-station.tmb-articleher.jpg?sfvrsn=3cd7218f_1'  },
                }
            }, 100);
        },


    },
    watch:{
        $route(){
            this.init();
        }
    },
};
</script>