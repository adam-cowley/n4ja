<template>
    <div id="n4ja-dashboard-root" class="n4ja-layout-dashboard" :class="classes">
        <n4ja-login
            v-if="!driver"
            :logo="loginLogo"
            :showHost="showHost"
            :protocol="protocol"
            :hosts="hosts"
            :host="host"
            :port="port"
            :username="username"
            :password="password"
            :encrypted="encrypted"
            :onConnect="setDriver"
            :onConnectError="onConnectError"
        />
        <div class="n4ja-dashboard-application" v-else>
            <div class="n4ja-navigation">
                <div class="n4ja-navigation-container">
                    <div class="n4ja-brand">
                        <router-link to="/">
                            <slot name="brand">
                                <component v-if="logo" :is="logo" />
                                <neo4j-logo v-else />
                            </slot>
                        </router-link>
                    </div>

                    <nav class="n4ja-navigation-left">
                        <slot name="leftNav">
                            <ul v-if="leftNav.length">
                                <Link
                                    v-for="link in leftNav"
                                    :key="link.text"
                                    :to="link.to"
                                    :onClick="link.onClick"
                                    :text="link.text"
                                />
                            </ul>
                        </slot>
                    </nav>

                    <!-- <div class="spacer" /> -->

                    <nav class="n4ja-navigation-right">
                        <slot name="rightNav">
                            <ul v-if="rightNav.length">
                                <Link
                                    v-for="link in rightNav"
                                    :key="link.text"
                                    :to="link.to"
                                    :onClick="link.onClick"
                                    :text="link.text"
                                />
                            </ul>
                        </slot>
                    </nav>
                </div>
            </div>

            <div class="n4ja-sidebar" v-if="hasSidebar">
                <slot name="sidebar">
                    <ul v-if="sideNav.length">
                        <Link
                            v-for="link in sideNav"
                            :key="link.text"
                            :to="link.to"
                            :onClick="link.onClick"
                            :text="link.text"
                            :icon="link.icon"
                        />
                    </ul>
                </slot>
            </div>

            <slot>
                <n4ja-router />
            </slot>
            
            <slot name="footer" />
        </div>
    </div>
</template>

<script>
import Link from './Link'

export default {
    name: 'n4ja-layout-dashboard',
    components: {
        Link,
    },
    props: {
        onConnect: {
            type: Function,
            description: 'The function to call on successful login',
            default: () => {},
        },
        onConnectError: {
            type: Function,
            description: 'The function to call on unsuccessful login',
            default: () => {},
        },
        loginLogo: {
            type: Object,
        },
        signOut: {
            type: Function,
            description: 'Function to clear the driver and force a log out',
        },

        /**
         * Login Properties
         */
        showHost: {
            type: Boolean,
            description: 'Show the hostname and port?',
            showHost: false
        },
        host: {
            type: String,
            description: 'Neo4j Host',
            default: 'localhost',
        },
        hosts: {
            type: Array,
            description: 'Array of possible hosts',
        },
        protocol: {
            type: String,
            description: 'Neo4j Protocl',
            default: 'bolt',
        },
        port: {
            type: [String, Number],
            description: 'Neo4j Bolt Port',
            default: 7687,
        },
        username: {
            type: String,
            description: 'Default Neo4j Username',
            default: 'neo4j',
        },
        password: {
            type: String,
            description: 'Default Neo4j Password',
            default: 'neo',
        },
        encrypted: {
            type: Boolean,
            description: 'Should the Neo4j connection be encrypted?',
            default: false,
        },

        /**
         * [ { to: { name: 'Home' }, title: 'Home', } ],
         */
        leftNav: {
            type: Array,
            description: 'Links to display on the left',
            default: () => [],
        },
        rightNav: {
            type: Array,
            description: 'Links to display on the left',
            default: () => [],
        },
        sidebar: {
            type: Boolean,
            default: false,
        },
        sideNav: {
            type: Array,
            description: 'Links to display in sidebar',
            default: () => [],
        },

        logo: {
            type: Object,
        },
    },
    data: () => ({
        driver: false,
    }),

    methods: {
        setDriver(driver) {
            this.driver = driver;

            if ( typeof this.onConnect === 'function' ) this.onConnect(driver);
        }
    },

    computed: {
        classes() {
            return this.sidebar || this.sideNav.length ? 'with-sidebar' : 'no-sidebar';
        },
        hasSidebar() {
            return this.sidebar || this.sideNav.length
        },
    },

};
</script>
