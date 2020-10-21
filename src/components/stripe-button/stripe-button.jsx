import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HebDBHQA9A8Jv8Jw7IcD0Ls7jgExhIo5puuq09h2FTTmKCKpnarDFkBtsNC7ZXYK9k6ZJHMeyzYoZiQ2QmYhKzb00ZerBOO4P';

    const onToken = (token) => {
        console.log(token);
        alert('Payment Successful');
    }
    return (
        <StripeCheckout 
            label = 'Pay Now'
            name = 'E-Store'
            billingAddress
            shippingAddress
            image = 'https://sendeyo.com/up/d/f3eb2117da'
            description = { `Your total is $${price}`}
            amount = {priceForStripe}
            panelLabel = 'Pay Now'
            token = {onToken}
            stripeKey = {publishableKey}
        />
    )
}

export default StripeCheckoutButton;
