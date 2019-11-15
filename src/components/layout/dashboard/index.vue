<template>
    <div id="n4ja-dashboard-root" :class="classes">
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
import Link from './Link';

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

<style lang="scss">
$header-height: 52px;
$header-padding: 8px;
$header-padding-horizontal: 16px;

$content-padding: $header-height + ($header-padding * 4);

$navigation-links: rgba(0,0,0,.8);
$navigation-links-hover: lighten($navigation-links, 10%);
$navigation-links-active: darken($navigation-links, 10%);
$navigation-links-active-border: darken($navigation-links, 10%);
$navigation-links-active-border-width: 4px;

$sidebar-padding-vertical: 6px;
$sidebar-padding-horizontal: 16px;
$sidebar-width: 240px;
$sidebar-width-collapsed: 60px;

$sidebar-links: rgba(0, 0, 0, 0.6);
$sidebar-links-hover: lighten($sidebar-links, 20%);
$sidebar-links-active: darken($sidebar-links, 10%);
$sidebar-links-active-border: darken($sidebar-links, 10%);
$sidebar-links-active-border-width: 4px;

$content-width: 71rem;

#n4ja-dashboard-root {
    .main {
        padding-top: $content-padding;
    }

    &.no-sidebar {
        .container, .n4ja-navigation-container {
            margin: auto;
            padding: 0 $header-padding-horizontal;
            max-width: $content-width;
        }

        .main .container {
            padding: $header-padding;
        }
    }

    &.with-sidebar {
        .n4ja-navigation-container {
            padding: 0 $header-padding-horizontal;
        }

        .main {
            margin-left: $sidebar-width;

            @media all and (max-width: 48rem) {
                margin-left: $sidebar-width-collapsed;
            }

            .container {
                max-width: 1080px;
            }
        }
    }
}

.n4ja-navigation {
    border-width: 0;
    border: 0px none;
    background-color: #fff;

    box-shadow: 0 2px 10px 0 #E1E5EB !important;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: $header-height;
    padding: $header-padding $header-padding ($header-padding - $navigation-links-active-border-width);
    z-index: 10000;

    .n4ja-navigation-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .n4ja-brand {
            flex: 0;

            .neo4j-logo {
                width: 39px;
                height: 39px;
                margin-right: 12px;
            }
        }

        .n4ja-navigation-left {
            flex: 1;
        }

        .n4ja-navigation-right {
            flex: 1;

            ul {
                justify-content: flex-end;
            }
        }

        ul {
            display: flex;
            flex-direction: row;
            list-style: none;
            justify-content: flex-start;

            margin: 0;
            padding: 0;

            li {
                flex: 0;
                margin: 0 $header-padding;
                padding: 0;

                a {
                    display: block;
                    border-bottom: $navigation-links-active-border-width solid transparent;
                    padding: 12px 0 10px;
                    font-weight: bold;
                    cursor: pointer;
                    white-space: nowrap;
                    color: $navigation-links;

                    &:hover {
                        color: $navigation-links-hover;
                    }

                    &.active, &.router-link-exact-active {
                        border-bottom-color: #ccc;
                    }
                }
            }
        }
    }
}

.n4ja-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: $sidebar-width;

    background: #f9fafb;
    box-shadow: 0 2px 10px 0 #E1E5EB !important;

    padding-top: $content-padding;


    @media all and (max-width: 48rem) {
        width: $sidebar-width-collapsed !important;

        ul li a .link {
            display: none;
        }
    }

    ul {
        margin: 0;
        padding: 0;

        li {
            margin: 0 0 $sidebar-padding-vertical;
            padding: 0;
            list-style-type: none;

            a {
                display: flex;
                font-weight: bold;
                padding: $sidebar-padding-vertical $sidebar-padding-horizontal;
                border-left: $sidebar-links-active-border-width solid transparent;

                color: $sidebar-links;

                &:hover {
                    color: $sidebar-links-hover;
                }

                &.router-link-active {
                    border-color: $sidebar-links-hover;
                }

                .icon {
                    display: flex;
                    flex: 0;
                    width: 24px;
                    margin-right: 12px;
                    align-content: center;

                    svg {
                        display: block;
                        margin: auto;
                    }
                }
                .link {
                    flex: 1;
                }
            }
        }
    }
}
</style>
