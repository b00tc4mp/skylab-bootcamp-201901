import React, { useState, useEffect } from "react";
import {withRouter} from 'react-router-dom'
import logic from "../../logic";

function Cart({userLogged}) {


  userLogged()

  return(
    <>
    
    <div className='container'>
  <section class='section'>
    <div class='container'>
      <h1 class='title'> Your orders</h1>
    </div>
  </section>
    <section className='card is-horizontal columns'>
      
    <section class='section'>
    <div class='container'>
      <h3 class='title'> Order </h3>
    </div>
  </section>  <section class='section'>
    <div class='container'>
      <h3 class='title'> Order</h3>
    </div>
  </section>  <section class='section'>
    <div class='container'>
      <h3 class='title'> Order</h3>
    </div>
  </section>
    
    </section>
  </div>
    
    
    </>

  )

}

export default withRouter(Cart)