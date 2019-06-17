<template>
    <div class="ui card n4ja-card">
        <slot name="header">
            <n4ja-card-header v-if="header" :header="header" :headerTag="headerTag" />
        </slot>

        <slot />
    </div>
</template>

<script>
export default {
    name: 'N4jaCard',

    props: {
        header: {
            type: String,
            description: 'Header text',   
        },
        headerTag: {
            type: String,
            description: 'HTML tag to display the header as',   
        },
    },
};
</script>

<style lang="scss">
.n4ja-card {
    border-width: 0;
    border: 0px none !important;
    background-color: #fff;

    box-shadow: 0 2px 10px 0 #E1E5EB !important;
    margin: 15px 0;

    display: flex;
    flex-direction: column;

    width: auto !important;
    max-width: auto !important;


    .n4ja-card-header {
        padding: 16px;
        background: #f9fafb;
    }


    .n4ja-node-card-header {
        padding: 16px;
        flex: 1 0 auto;
        
        .n4ja-value-image {
            text-align: center;
            margin-bottom: 6px;

            img, svg {
                height: 64px;
            }
        }

        .n4ja-card-header-title {
            text-align: center;
        }

        .n4ja-id {
            color: #536574;
            font-size: .85714286rem;
            padding: 0.5833em 0;
        }

        .n4ja-labels {
            float: right;
        }
    }
    
    .n4ja-card-body {
        flex: 1;
        padding: 8px;

        dl {
            width: 100%;
            
            dt {
                font-weight: 700;
                text-align: left;

                width: 100%;
                border-bottom: 1px solid #e8e8e8;
                margin: 0;
                padding: 12px 12px 6px;
            }

            dd {
                text-align: left;

                width: 100%;
                margin: 0;
                padding: 6px 12px;
                color: #536574;
                font-size: 14px;

                .icon {
                    width: 18px;
                    height: 18px;
                    margin-right: 8px;
                    float: left;
                }

                .n4ja-labels {
                    float: right;

                    .label {
                        margin-bottom: 4px;
                    }
                }

                .more-values {
                    float: right;
                    font-style: italic;
                    margin-top: 4px;
                }
            }
        }


    }
    .n4ja-card-footer {
        flex: 0;

        flex: 0 1 auto;
        width: 100%;
        border-top: 1px solid #E1E5EB;
        padding: 12px 0;
        margin-top: 12px;

        &.n4ja-card-footer-actions {
            display: flex;

            button, a {
                flex: 1;
                justify-content: center;
                align-items: center;
                margin: 0 4px;

                &:first-child {
                    margin-left: 12px;
                }
                &:last-child {
                    margin-right: 12px;
                }

                &.no-flex {
                    flex: 0;
                }
            }

            .btn-pagination {
                flex: 0;
            }
        }
    }

}

.n4ja-grid.deck {
    display: flex;
    // flex-direction: row;
    flex-flow: row wrap;
    justify-content: flex-start;

    .n4ja-column {
        display: flex;
        // Flexbugs #4: https://github.com/philipwalton/flexbugs#flexbug-4
        // flex: 1 0 0%;
        flex: 1;
        flex-direction: column;
        flex-wrap: wrap;
        // padding: 12px;

        .n4ja-card {
            flex: 1;

            display: flex;

            .node-details {
                flex: 1;
            }
        }
    }
}

.ui.card.n4ja-table-card {
    .card-body {
        padding: 0;

        table {
            border-radius: 0;
            border-width: 0;
        }
    }
}
</style>
