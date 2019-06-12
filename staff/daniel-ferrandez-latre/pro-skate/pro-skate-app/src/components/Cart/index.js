import React, { useState, useEffect } from "react";
import {withRouter} from 'react-router-dom'
import logic from "../../logic";
import CartItem from "../CartItem"
import './index.sass'

function Cart({cartItems, cartItemsQuantity}) {


  return(
    <>
    <ul>
      {cartItems.map((product) =>{
        return( 
          <li>
            <CartItem product={ product } cartItemsQuantity={cartItemsQuantity}/>
          </li>
        )
      })}
    </ul>
    
    {/* <div className='cart'>
      <ul>
        <li className="cart-item columns">
          <div className="column is-2 is-offset-1">
            <img src=""/>
            aaa
          </div>
          <div className="column is-2">aa</div>
          <div className="column is-2">aaa</div>
          <div className="column is-2">aa</div>
          <div className="column is-2">aa</div>
        </li>
      </ul>
  
    
    </div> */}


    
    
    </>

  )

}

export default withRouter(Cart)