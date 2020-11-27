import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';

import CheckoutItem from '../../components/checkout-item/checkout-item';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button';

import './checkout.styles.scss';

const CheckoutPage = ({ cartItems, total }) => {
    return (
        <div className='checkout-page'>
            <div className='checkout-header'> 
                <div className='header-block'>
                    <span> Product </span>
                </div>
                <div className='header-block'>
                    <span> Description </span>
                </div>
                <div className='header-block'>
                    <span> Quantity </span>
                </div>
                <div className='header-block'>
                    <span> Price </span>
                </div>
                <div className='header-block'>
                    <span> Remove </span>
                </div>
            </div>
            {
                cartItems.map(cartItem => {
                    return (
                        <CheckoutItem key={cartItem.id} cartItem = {cartItem}/>
                    )
                })
            }

            <div className='total'> 
                <span> TOTAL: ${total}</span>
            </div>
            <div className="test-warning">
                *Please use the following test credit card for payments
                <br />
                4242 4242 4242 4242 - Exp: Any future date - CVV: Any 3 digits
            </div>
            <StripeCheckoutButton price = {total} />
        </div>
    )

}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
})
/*Above code can be written without using createStructuredSelector:
const mapStateToProps = (state)=> ({
    cartItems: selectCartItems(state),
    total: selectCartTotal(state)
})
*/

export default connect(mapStateToProps)(CheckoutPage);