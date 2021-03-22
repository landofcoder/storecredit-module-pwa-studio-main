/**
 * Mappings for overwrites
 * example: [`@magento/venia-ui/lib/components/Main/main.js`]: './lib/components/Main/main.js'
 */
module.exports = componentOverride = {
    [`@magento/venia-ui/lib/RootComponents/Product/product.gql.js`]:'@landofcoder/storecredit-module/src/override/ProductFullDetail/product.gql.js',
    [`@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail.gql.js`]:'@landofcoder/storecredit-module/src/override/ProductFullDetail/productFullDetail.gql.js',
    [`@magento/peregrine/lib/talons/ProductFullDetail/useProductFullDetail.js`]:'@landofcoder/storecredit-module/src/talons/ProductFullDetail/useProductFullDetail.js',
    [`@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail.js`]:'@landofcoder/storecredit-module/src/override/ProductFullDetail/productFullDetail.js',
    [`@magento/venia-ui/lib/components/AccountMenu/accountMenuItems.js`]:'@landofcoder/storecredit-module/src/override/AccountMenu/accountMenuItems.js',
    [`@magento/venia-ui/lib/components/Header/header.js`]:'@landofcoder/storecredit-module/src/override/Header/header.js',
    [`@magento/venia-ui/lib/components/CheckoutPage/checkoutPage.js`]:'@landofcoder/storecredit-module/src/override/CheckoutPage/checkoutPage.js',
    [`@magento/venia-ui/lib/components/CartPage/PriceSummary/priceSummaryFragments.js`]:'@landofcoder/storecredit-module/src/override/CartPage/PriceSummary/priceSummaryFragments.js',
    [`@magento/venia-ui/lib/components/CartPage/PriceSummary/priceSummary.js`]:'@landofcoder/storecredit-module/src/override/CartPage/PriceSummary/priceSummary.js',
    [`@magento/peregrine/lib/talons/CartPage/PriceSummary/usePriceSummary.js`]:'@landofcoder/storecredit-module/src/talons/CartPage/PriceSummary/usePriceSummary.js',
    [`@magento/venia-ui/lib/components/CheckoutPage/PaymentInformation/paymentInformation.js`]:'@landofcoder/storecredit-module/src/override/CheckoutPage/PaymentInformation/paymentInformation.js',
    [`@magento/venia-ui/lib/components/CheckoutPage/PaymentInformation/index.js`]:'@landofcoder/storecredit-module/src/override/CheckoutPage/PaymentInformation/index.js',
    [`@magento/venia-ui/lib/components/CheckoutPage/PaymentInformation/creditCard.js`]:'@landofcoder/storecredit-module/src/override/CheckoutPage/PaymentInformation/creditCard.js',
    [`@magento/peregrine/lib/talons/CheckoutPage/PaymentInformation/useCreditCard.js`]:'@landofcoder/storecredit-module/src/talons/CheckoutPage/PaymentInformation/useCreditCard.js',
    [`@magento/peregrine/lib/talons/CheckoutPage/OrderConfirmationPage/useOrderConfirmationPage`]:'@landofcoder/storecredit-module/src/talons/CheckoutPage/OrderConfirmationPage/useOrderConfirmationPage.js',
};
