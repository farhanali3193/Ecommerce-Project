import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'

import { toggleCartHidden } from '../../redux/cart/cart.actions';

import CustomButton from '../custom-button/custom-button';
import CartItem from '../cart-item/cart-item';

import { selectCartItems } from '../../redux/cart/cart.selectors'

import './cart-dropdown.styles.scss';

const CartDropDown = ({ cartItems, history, dispatch }) => {
    return (
        <div className="cart-dropdown">
            <div className = 'cart-items'> 
                {
                    cartItems.length ? (
                        cartItems.map(cartItem => (
                            <CartItem key={cartItem.id} item={cartItem} /> 
                        ))
                    ) : (
                        <span className="empty-message"> YOUR CART IS EMPTY </span>
                    )    
                }
            </div>
            <CustomButton 
                onClick= {()=> {
                    history.push('/checkout');
                    dispatch(toggleCartHidden());
                }}
            > 
                GO TO CHECKOUT 
            </CustomButton>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})
//Above code can be written without using selectors or Reselect lib:
// const mapStateToProps = (state) => ({
//   cartItems: state.cart.cartItems
// })

/*Above code can be written without using createStructuredSelector:
const mapStateToProps = (state)=> ({
    cartItems: selectCartItems(state)
})
*/

export default withRouter(connect(mapStateToProps)(CartDropDown));