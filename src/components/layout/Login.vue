<template>
    <div id="login">
        <form class="login-form" @submit.prevent="handleLogin">
            <div class="ui form">
                <div class="logo">
                    <slot name="login-logo">
                        <component v-if="logo" :is="logo" />
                        <neo4j-logo v-else />
                    </slot>
                </div>

                <div class="alert alert-danger" v-if="error" v-html="error" />

                <div class="host" v-if="showHost">
                    <label for="host" class="sr-only">Host</label>
                    <input v-model="lhost" id="host" class="form-control" placeholder="Neo4j URL" required>
                </div>
                <div class="port" v-if="showHost">
                    <label for="port" class="sr-only">Port</label>
                    <input type="number" v-model="lport" id="port" class="form-control" placeholder="Neo4j Port" required>
                </div>
                <div v-else-if="hosts && hosts.length">
                    <label for="host" class="sr-only">Host</label>
                    <select class="ui dropdown" id="host" v-model="lhost">
                        <option v-for="host in hosts" :key="host" :value="host" v-html="host" />
                    </select>
                </div>
                <div class="full">
                    <label for="username" class="sr-only">Username</label>
                    <input v-model="lusername" id="username" class="form-control" placeholder="Username" required autofocus>
                </div>
                <div class="full">    
                    <label for="inputPassword" class="sr-only">Password</label>
                    <input v-model="lpassword" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
                </div>
                <div class="full submit">
                    <button class="ui button primary btn btn-lg btn-primary btn-block" type="submit" :disabled="loading">
                        {{ loading ? this.loadingText : this.signInText }}
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'N4jaLogin',
    props: {
        onConnect: Function,
        onConnectError: Function,
        logo: Object,

        signInText: {
            type: String,
            default: 'Sign In',
        },
        loadingText: {
            type: String,
            default: 'Please wait...',
        },

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
            description: 'List of possible hosts',
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

    },
    data() {
        return {
            loading: false,
            lprotocol: this.protocol,
            lhost: this.host,
            lport: this.port,
            lusername:this.username,
            lpassword: this.password,
            error: false,
        };
    },
    methods: {
        handleLogin() {
            this.loading = true;
            this.$neo4j.connect(this.lprotocol, this.lhost, this.lport, this.lusername, this.lpassword, this.encrypted)
                .then(driver => {
                    return this.$neo4j.run('MATCH (n) RETURN count(n)')
                        .then(() => this.onConnect(driver));
                })
                .catch(e => {
                    this.error = e.message;

                    if ( typeof this.onConnectError === 'function' ) this.onConnectError(e);
                })
                .then(() => this.loading = false);
        }
    },
}
</script>

<style lang="scss">
#login {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #f2f2f2;
    display: flex;

    align-items: center;
    justify-content: center;

    .login-form {
        width: 100%;
        max-width: 330px;
        padding: 32px 16px 16px;
        margin: 60px auto;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 10px 0 #E1E5EB !important;

        .logo {
            img {
                display: block;
                width: 60%;
                margin: 26px auto 42px !important;
            }

            .neo4j-logo {
                display: block;
                width: 64px;
                height: 64px;
                margin: 12px auto 26px !important;
            }
        }

        div {
            margin: 0 0 12px;

            &.form, &.submit {
                margin: 0;
            }
        }

        .host, .port {
            float: left;
        }
        .host {
            width: 70%;

            input {
                border-right: 0px none;
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
            }
        }
        .port {
            width: 30%;
            input {
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
            }
        }
        .full {
            clear: both;
        }
    }

}




#login .login-form label {
    display: none;
    /*
    display: block;
    padding: 0 12px 4px;
    margin-bottom: 5px;
    font-weight: bold;
    */
}
#login .login-form button {
    margin: 8px 0;
    padding: 16px 0;
    width: 100%;
    display: block !important;
    /* text-align: center; */
}
.login-form .row {
    margin-bottom: 10px;
}

// .col-xs-8 {width: 60%}
// .col-xs-4 {width: 40%}

/* .sr-only {
    display: none;
} */
</style>

