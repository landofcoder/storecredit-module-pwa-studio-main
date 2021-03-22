import { gql } from '@apollo/client';

export const GET_CUSTOMER_STORE_CREDIT_INFO = gql`
    query getStoreCreditInfo {
        customer {
            id
            mp_store_credit {
                customer_id
                mp_credit_balance
                mp_credit_notification
            }
        }
    }
`;

export const GET_CUSTOMER_STORE_CREDIT_TRANSACTION = gql`
    query getStoreCreditTransactions($pageSize: Int!, $currentPage: Int!) {
        customer {
            mp_store_credit {
                transactions(pageSize: $pageSize, currentPage: $currentPage) {
                    total_count
                    items {
                        transaction_id
                        customer_id
                        order_id
                        title
                        status
                        action
                        amount
                        balance
                        customer_note
                        admin_note
                        created_at
                    }
                }
            }
        }
    }
`;

export const UPDATE_SC_SUBSCRIBE_STATUS = gql`
    mutation UpdateBalanceNotification(
        $mp_credit_notification: Int!
    ) {
        UpdateBalanceNotification(
            mp_credit_notification: $mp_credit_notification
        ) @connection(key: "UpdateBalanceNotification")
    }
`;


export const SPEND_STORE_CREDIT = gql`
    mutation MpStoreCreditCustomerSpending(
        $cart_id: String!,
        $amount: Float!
    ) {
        MpStoreCreditCustomerSpending (
            cart_id: $cart_id,
            amount: $amount
        ) @connection(key: "UpdateBalanceNotification") {
            code
            title
            value
        }
    }
`;