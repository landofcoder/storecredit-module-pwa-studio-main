import { useUserContext } from '@magento/peregrine/lib/context/user';

export const flatten = data => {
    const { cart } = data;
    const { shipping_addresses } = cart;
    let address = {}
    if (shipping_addresses && shipping_addresses[0])
        address = shipping_addresses[0];

    const shippingMethod = ``;

    return {
        city: address.city ? address.city : '',
        country: (address && address.country && address.country.label) ? address.country.label : '',
        email: cart.email,
        firstname: address.firstname ? address.firstname : '',
        lastname: address.lastname ? address.lastname : '',
        postcode: address.postcode ? address.postcode : '',
        region: (address && address.region && address.region.label) ? address.region.label : '',
        shippingMethod,
        street: address.street ? address.street : [],
        totalItemQuantity: cart.total_quantity
    };
};

export const useOrderConfirmationPage = props => {
    const { data } = props;
    const [{ isSignedIn }] = useUserContext();

    return {
        flatData: flatten(data),
        isSignedIn
    };
};
