import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  incrementCartItemQuantity = cartItemDetails => {
    const {id} = cartItemDetails
    const {cartList} = this.state
    const updatedItemList = cartList.map(eachItem => {
      if (eachItem.id === id) {
        return {
          id: eachItem.id,
          title: eachItem.title,
          brand: eachItem.brand,
          quantity: eachItem.quantity + 1,
          price: eachItem.price,
          imageUrl: eachItem.imageUrl,
        }
      }
      return eachItem
    })
    this.setState({cartList: updatedItemList})
  }

  decrementCartItemQuantity = cartItemDetails => {
    const {id, quantity} = cartItemDetails
    const {cartList} = this.state

    const Product = cartList.find(each => each.id === id)
    if (Product.quantity === 1) {
      this.setState({cartList: cartList.filter(eachItem => eachItem.id !== id)})
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachObj => {
          if (eachObj.id === id) {
            return {
              ...eachObj,
              quantity: eachObj.quantity - 1,
            }
          }
          return eachObj
        }),
      }))
    }
  }

  addCartItem = product => {
    const {id, quantity} = product
    const {cartList} = this.state
    const ExsistVal = cartList.find(each => each.id === id)

    if (ExsistVal !== undefined) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachContact => {
          if (id === eachContact.id) {
            return {...eachContact, quantity: eachContact.quantity + quantity}
          }
          return eachContact
        }),
      }))
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }

    //   TODO: Update the code here to implement addCartItem
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedList = cartList.filter(eachitem => eachitem.id !== id)
    this.setState({cartList: updatedList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
