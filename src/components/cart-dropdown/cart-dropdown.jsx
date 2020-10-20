import React from 'react';
import CustomButton from '../custom-button/custom-button';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { selectCartItems } from '../../redux/cart/cart.selectors'
import './cart-dropdown.styles.scss';
import CartItem from '../cart-item/cart-item';
import { createStructuredSelector } from 'reselect'
import { toggleCartHidden } from '../../redux/cart/cart.actions';

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

export default withRouter(connect(mapStateToProps)(CartDropDown));