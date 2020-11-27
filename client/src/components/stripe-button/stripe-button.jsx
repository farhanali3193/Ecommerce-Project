import React from 'react';
import axios from 'axios';

import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HebDBHQA9A8Jv8Jw7IcD0Ls7jgExhIo5puuq09h2FTTmKCKpnarDFkBtsNC7ZXYK9k6ZJHMeyzYoZiQ2QmYhKzb00ZerBOO4P';

    const onToken = (token) => {
        console.log(token);
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token,
            }
        }).then(response => {
            alert('Payment Successful')
        }).catch(error => {
            console.log('Payment Error: ', error);
            alert('There was an issue with your payment. Please make sure you use the provided credit card');
        })
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
