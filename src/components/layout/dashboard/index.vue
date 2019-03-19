<template>
    <div id="n4ja-dashboard-root" :class="classes">
        <n4ja-login
            v-if="!driver"
            :logo="loginLogo"
            :showHost="showHost"
            :protocol="protocol"
            :host="host"
            :port="port"
            :username="username"
            :password="password"
            :encrypted="encrypted"
            :onConnect="onConnect"
            :onConnectError="onConnectError"
        />
        <div class="n4ja-dashboard-application" v-else>
            <div class="n4ja-navigation">
                <div class="n4ja-navigation-container">
                    <div class="n4ja-brand">
                        <router-link to="/">
                            <slot name="brand">
                                <component v-if="logo" :is="logo" />
                                <svg v-else width="231px" height="262px" viewBox="0 0 231 262" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <g id="neo4j_logo_textreverse" transform="translate(0.000000, 2.000000)">
                                            <g id="Group">
                                                <path d="M219.7,117.2 C219.7,177.9 170.5,227 109.9,227 C49.2,227 0,177.8 0,117.2 C0,56.5 49.2,7.3 109.8,7.3 C170.5,7.3 219.7,56.5 219.7,117.2" id="Path" fill="#008CC1"></path>
                                                <path d="M48.7,81.2 C48.7,86.1 44.8,90 39.9,90 C35,90 31.1,86.1 31.1,81.2 C31.1,76.3 35,72.4 39.9,72.4 C44.8,72.4 48.7,76.3 48.7,81.2" id="Path" fill="#FFFFFF"></path>
                                                <path d="M50.2,105.3 C50.2,110.2 46.3,114.1 41.4,114.1 C36.5,114.1 32.6,110.2 32.6,105.3 C32.6,100.4 36.5,96.5 41.4,96.5 C46.3,96.5 50.2,100.4 50.2,105.3" id="Path" fill="#FFFFFF"></path>
                                                <path d="M55.6,130.8 C55.6,135.7 51.7,139.6 46.8,139.6 C41.9,139.6 38,135.7 38,130.8 C38,125.9 41.9,122 46.8,122 C51.6,122 55.6,125.9 55.6,130.8" id="Path" fill="#FFFFFF"></path>
                                                <path d="M67.6,153.7 C67.6,158.6 63.7,162.5 58.8,162.5 C53.9,162.5 50,158.6 50,153.7 C50,148.8 53.9,144.9 58.8,144.9 C63.7,144.9 67.6,148.8 67.6,153.7" id="Path" fill="#FFFFFF"></path>
                                                <path d="M161.6,185.7 C161.6,190.6 157.7,194.5 152.8,194.5 C147.9,194.5 144,190.6 144,185.7 C144,180.8 147.9,176.9 152.8,176.9 C157.7,176.9 161.6,180.8 161.6,185.7" id="Path" fill="#FFFFFF"></path>
                                                <path d="M177.6,166.8 C177.6,171.7 173.7,175.6 168.8,175.6 C163.9,175.6 160,171.7 160,166.8 C160,161.9 163.9,158 168.8,158 C173.7,158 177.6,161.9 177.6,166.8" id="Path" fill="#FFFFFF"></path>
                                                <path d="M131.3,33.2 C131.3,38.1 127.4,42 122.5,42 C117.6,42 113.7,38.1 113.7,33.2 C113.7,28.3 117.6,24.4 122.5,24.4 C127.4,24.4 131.3,28.4 131.3,33.2" id="Path" fill="#FFFFFF"></path>
                                                <path d="M108.2,25.1 C108.2,30 104.3,33.9 99.4,33.9 C94.5,33.9 90.6,30 90.6,25.1 C90.6,20.2 94.5,16.3 99.4,16.3 C104.3,16.3 108.2,20.3 108.2,25.1" id="Path" fill="#FFFFFF"></path>
                                                <circle id="Oval" stroke="#FFFFFF" stroke-width="3.5" fill="#66B245" cx="170.5" cy="91" r="58.5"></circle>
                                                <circle id="Oval" stroke="#FFFFFF" stroke-width="3.5" fill="#66B245" cx="90.3" cy="210.3" r="47.9"></circle>
                                                <circle id="Oval" stroke="#FFFFFF" stroke-width="3.5" fill="#66B245" cx="50.9" cy="32.2" r="31.9"></circle>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
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

            <div class="main">
                <slot />
            </div>


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
        driver: {
            type: [ Object, Boolean, ],
            description: 'The Neo4j Driver - if this is not set then the login form is displayed',
        },
        onConnect: {
            type: Function,
            description: 'The function to call on successful login',
        },
        onConnectError: {
            type: Function,
            description: 'The function to call on unsuccessful login',
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
            default: [],
        },
        rightNav: {
            type: Array,
            description: 'Links to display on the left',
            default: [],
        },
        sideNav: {
            type: Array,
            description: 'Links to display in sidebar',
            default: [],
        },

        logo: {
            type: Object,
        },

        sidebar: {
            type: Boolean,
            default: false,
        },
        
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
    z-index: 2000;

    .n4ja-navigation-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .n4ja-brand {
            flex: 0;
            svg {
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


