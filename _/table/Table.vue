<template>
    <table class="n4ja-table ui table striped">
        <slot name="header">
            <thead>
                <tr>
                    <slot name="headers" />
                </tr>
            </thead>
        </slot>
        <tbody>
            <slot name="body" />
        </tbody>
        <tfoot slot="footer"></tfoot>
    </table>
</template>

<script>
export default {
    name: 'N4jaTable',
}
</script>


<style lang="scss">
.n4ja-card .n4ja-table {
    margin: -1em !important;
    width: calc(100% + 2em) !important;
    border: 0px none !important;

    thead {
        background: #f9fafb;
    }

    .icon {
        width: 16px;
        height: 16px;
        margin-right: 8px;
    }

    .n4ja-labels {
        float: right;
    }

    td, th {
        padding: 8px 16px 8px 16px !important;
        border: 0px none !important;
    }
}
</style>
