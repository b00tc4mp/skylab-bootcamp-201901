import React , { useState, useEffect }from "react";
import logo from "./logo.svg";
import "./App.css";
import { Switch, Route, Redirect  } from "react-router-dom";
import {  withRouter } from "react-router-dom";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";
import "bulma/bulma.sass";
import Register from "./components/Register";
import Login from "./components/Login";
import Detail from './components/Detail'
import Cart from './components/Cart'
import logic from './logic';
import './index.sass'




function App({history}) {
  const [userName, setUserName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [cartItems, setCartItems] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)
  

  // useEffect( ()=> {
  //   cartItemsQuantity()
  //   /* async function verify(){
  //     logic.isUserLoggedIn && await cartItemsQuantity()
  //   }
  //   verify() */
  // }, [])

    useEffect( ()=>{
      cartItemsQuantity()
      
      }
  , [])



  const handleProductDetail = async (id) => {
    console.log(id)
    history.push(`/detail/${id}`)

  }


  const userLogged = ( async () => {
    if(logic.isUserLoggedIn) {
      const user = await logic.retrieveUser(logic.__userToken__)
     
      setUserName(user.name)
    }
  })

  const cartItemsQuantity =  async () => {
    
    if(logic.isUserLoggedIn) {
      const cart = await logic.retrieveCart()
      let quantity = 0
      let amount = 0
      cart.forEach(product => {
        quantity = quantity + product.quantity
        amount = amount + (product.productId.price * product.quantity)
      });
      setQuantity(quantity)
      setTotalAmount(amount)
      setCartItems(cart)
      
      //return quantity
    }
  }




  

  // const cartItemsQuantity =  async () => {
  //   debugger
  //   if(logic.isUserLoggedIn) {
  //     const user = await logic.retrieveUser(logic.__userToken__)
  //     const cart = user.cart
  //     let quantity = 0
  //     cart.forEach(product => {
  //       quantity = quantity + product.quantity
  //     });
  //     setQuantity(quantity)
  //     setCartItems(cart)
  //     //return quantity
  //   }
  // }


  
  return (
    <div className='App'>
      <Navbar username={userName} quantity={quantity}/>
      <Switch>
        <Route exact path='/' render={() => <Landing handleProductDetail={handleProductDetail} />} />
        <Route  path='/register' render={() => <Register />} />
        <Route  path='/login' render={() => <Login />} />
        <Route  path='/detail/:id' render={() => <Detail cartItemsQuantity={cartItemsQuantity}/>} /> 
        <Route  exact='/cart' render={() => logic.isUserLoggedIn ? <Cart cartItems={cartItems} cartItemsQuantity={cartItemsQuantity} totalAmount={totalAmount} /> : console.log('hola') } />
      </Switch>
    </div>
  );
}

export default withRouter(App)