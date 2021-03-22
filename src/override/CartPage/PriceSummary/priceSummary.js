import React, { useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import { Price } from '@magento/peregrine';
import { usePriceSummary } from '@magento/peregrine/lib/talons/CartPage/PriceSummary/usePriceSummary';
import Button from '@magento/venia-ui/lib/components/Button';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from '@magento/venia-ui/lib/components/CartPage/PriceSummary/priceSummary.css';
import DiscountSummary from '@magento/venia-ui/lib/components/CartPage/PriceSummary/discountSummary';
import GiftCardSummary from '@magento/venia-ui/lib/components/CartPage/PriceSummary/giftCardSummary';
import ShippingSummary from '@magento/venia-ui/lib/components/CartPage/PriceSummary/shippingSummary';
import TaxSummary from '@magento/venia-ui/lib/components/CartPage/PriceSummary/taxSummary';
import { PriceSummaryFragment } from '@magento/venia-ui/lib/components/CartPage/PriceSummary/priceSummaryFragments';
import Checkbox from '@magento/venia-ui/lib/components/Checkbox/checkbox.js';
import { GET_CUSTOMER_STORE_CREDIT_INFO, SPEND_STORE_CREDIT } from './customerStoreCredit.gql';
import { Redirect } from 'react-router-dom';


export const GET_PRICE_SUMMARY = gql`
    query getPriceSummary($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            ...PriceSummaryFragment
        }
    }
    ${PriceSummaryFragment}
`;

/**
 * A child component of the CartPage component.
 * This component fetches and renders cart data, such as subtotal, discounts applied,
 * gift cards applied, tax, shipping, and cart total.
 *
 * @param {Object} props
 * @param {Object} props.classes CSS className overrides.
 * See [priceSummary.css]{@link https://github.com/magento/pwa-studio/blob/develop/packages/venia-ui/lib/components/CartPage/PriceSummary/priceSummary.css}
 * for a list of classes you can override.
 *
 * @returns {React.Element}
 *
 * @example <caption>Importing into your project</caption>
 * import PriceSummary from "@magento/venia-ui/lib/components/CartPage/PriceSummary";
 */
const PriceSummary = props => {
    const { isUpdating } = props;
    const classes = mergeClasses(defaultClasses, props.classes);
    const talonProps = usePriceSummary({
        queries: {
            getStoreCreditInfoQr: GET_CUSTOMER_STORE_CREDIT_INFO,
            getPriceSummary: GET_PRICE_SUMMARY
        },
        mutation: {
            MpStoreCreditCustomerSpending: SPEND_STORE_CREDIT
        }
    });
    const [isOpen, setOpen] = useState(false)
    const {
        handleProceedToCheckout,
        hasError,
        hasItems,
        isCheckout,
        isLoading,
        flatData,
        userStoreCreditInfo,
        spendStoreCredit,
        spendStoreCreditLoading,
        spendStoreCreditError,
        usedStoreCredit,
        spendStoreCreditData,
        spendValue
    } = talonProps;


    if (hasError) {
        return (
            <div className={classes.root}>
                <span className={classes.errorText}>
                    Something went wrong. Please refresh and try again.
                </span>
            </div>
        );
    } else if (!hasItems) {
        return null;
    }
    if (spendStoreCreditError) {
        return <Redirect to='/checkout' />
    }
    const { subtotal, total, discounts, giftCards, taxes, shipping } = flatData;

    const isPriceUpdating = isUpdating || isLoading;
    const priceClass = isPriceUpdating ? classes.priceUpdating : classes.price;
    const totalPriceClass = isPriceUpdating
        ? classes.priceUpdating
        : classes.totalPrice;
    const proceedToCheckoutButton = !isCheckout ? (
        <div className={classes.checkoutButton_container}>
            <Button
                disabled={isPriceUpdating}
                priority={'high'}
                onClick={handleProceedToCheckout}
            >
                {'Proceed to Checkout'}
            </Button>
        </div>
    ) : null;

    if (spendStoreCreditLoading || !userStoreCreditInfo) {
        return 'Loading...'
    }
    let usePrice;
    if (
        userStoreCreditInfo && userStoreCreditInfo.customer &&
        userStoreCreditInfo.customer.mp_store_credit && userStoreCreditInfo.customer.mp_store_credit.mp_credit_balance
    ) {
        const { mp_credit_balance } = userStoreCreditInfo.customer.mp_store_credit
        const price = (
            <span className={totalPriceClass}>
                <Price value={total.value} currencyCode={total.currency} />
            </span>
        )
        return (
            <div className={classes.root}>
                <div className={classes.lineItems}>
                    <Checkbox
                        label={`Use store credit`}
                        id="credit_options"
                        field="credit_options"
                        fieldState={{
                            value: usedStoreCredit
                        }}
                        onClick={() => {
                            setOpen(!isOpen)
                            spendStoreCredit(!usedStoreCredit)

                        }}
                        onKeyUp={() => {
                            setOpen(!isOpen)
                            spendStoreCredit(!usedStoreCredit)
                        }}
                    />
                    <br />

                    <span className={classes.lineItemLabel}>{'Subtotal'}</span>
                    <span className={priceClass}>
                        <Price
                            value={subtotal.value}
                            currencyCode={subtotal.currency}
                        />
                    </span>
                    {spendValue ? <>
                        <span className={classes.lineItemLabel}>{'StoreCredit Discount'}</span>
                        <span className={priceClass}>
                            <Price
                                value={0 - spendValue}
                                currencyCode={subtotal.currency}
                            />
                        </span>
                    </> : ''}
                    <DiscountSummary
                        classes={{
                            lineItemLabel: classes.lineItemLabel,
                            price: priceClass
                        }}
                        data={discounts}
                    />
                    <GiftCardSummary
                        classes={{
                            lineItemLabel: classes.lineItemLabel,
                            price: priceClass
                        }}
                        data={giftCards}
                    />
                    <TaxSummary
                        classes={{
                            lineItemLabel: classes.lineItemLabel,
                            price: priceClass
                        }}
                        data={taxes}
                        isCheckout={isCheckout}
                    />
                    <ShippingSummary
                        classes={{
                            lineItemLabel: classes.lineItemLabel,
                            price: priceClass
                        }}
                        data={shipping}
                        isCheckout={isCheckout}
                    />
                    <span className={classes.totalLabel}>
                        {isCheckout ? 'Total' : 'Estimated Total'}
                    </span>
                    {price}

                </div>
                {proceedToCheckoutButton}
            </div>
        );
    }
    return ''
};

export default PriceSummary;
