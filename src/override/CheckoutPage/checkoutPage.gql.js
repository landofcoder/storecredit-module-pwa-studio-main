import { gql } from '@apollo/client';
import { CheckoutPageFragment } from '@magento/venia-ui/lib/components/CheckoutPage/checkoutPageFragments.gql';
import { OrderConfirmationPageFragment } from '@magento/venia-ui/lib/components/CheckoutPage//OrderConfirmationPage/orderConfirmationPageFragments.gql';

export const CREATE_CART = gql`
    # This mutation will return a masked cart id. If a bearer token is provided for
    # a logged in user it will return the cart id for that user.
    mutation createCart {
        cartId: createEmptyCart
    }
`;

export const PLACE_ORDER = gql`
    mutation placeOrder($cartId: String!) {
        placeOrder(input: { cart_id: $cartId }) @connection(key: "placeOrder") {
            order {
                order_number
            }
        }
    }
`;
export const CREDIT_SPENDING = gql`
    mutation MpStoreCreditCustomerSpending($cart_id:String!,$amount:Float!){
        MpStoreCreditCustomerSpending(cart_id:$cart_id,amount:$amount){
            code
            value
            title
        }
}
`

// A query to fetch order details _right_ before we submit, so that we can pass
// data to the order confirmation page.
export const GET_ORDER_DETAILS = gql`
    query getOrderDetails($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            ...OrderConfirmationPageFragment
        }
    }
    ${OrderConfirmationPageFragment}
`;

export const GET_CHECKOUT_DETAILS = gql`
    query getCheckoutDetails($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            is_virtual
            ...CheckoutPageFragment
        }
    }
    ${CheckoutPageFragment}
`;

export const GET_CUSTOMER = gql`
    query GetCustomer {
        customer {
            id
            default_shipping
            firstname
            mp_store_credit{
                mp_credit_balance
            }
        }
    }
`;

export default {
    mutations: {
        createCartMutation: CREATE_CART,
        placeOrderMutation: PLACE_ORDER,
        creditSpendingMutation: CREDIT_SPENDING,
    },
    queries: {
        getCheckoutDetailsQuery: GET_CHECKOUT_DETAILS,
        getCustomerQuery: GET_CUSTOMER,
        getOrderDetailsQuery: GET_ORDER_DETAILS
    }
};
