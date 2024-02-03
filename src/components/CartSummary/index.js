import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const cartItems = cartList.length

      const totalValue = cartList.map(
        eachItem => eachItem.price * eachItem.quantity,
      )
      const outputVal = totalValue.reduce((acc, currentVal) => acc + currentVal)
      return (
        <div className="cartSummary-container">
          <h1 className="heading">
            Order Total: <span className="span-El">Rs {outputVal}/- </span>
          </h1>
          <p className="para">{cartItems} items in Cart</p>
          <button type="button" className="checkout-btn">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
