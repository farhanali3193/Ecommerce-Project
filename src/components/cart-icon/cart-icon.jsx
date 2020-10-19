import React from 'react';
import { toggleCartHidden } from '../../redux/cart/cart.actions'
import { connect } from 'react-redux';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';


const CartIcon = ({ toggleCartHidden, itemCount }) => {
    console.log('Rerendered cart icon')
    return (
        <div className="cart-icon" onClick={toggleCartHidden}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'> {itemCount} </span>
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log('CALLING')
    return{
        itemCount: state.cart.cartItems.reduce((accumulator, element) => accumulator + element.quantity,0)
    }
    
}
const mapDispatchToProps = (dispatch) => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon); //export default connect(null, { toggleCartHidden })(CartIcon) 