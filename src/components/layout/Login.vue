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
    name: 'n4ja-login',
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