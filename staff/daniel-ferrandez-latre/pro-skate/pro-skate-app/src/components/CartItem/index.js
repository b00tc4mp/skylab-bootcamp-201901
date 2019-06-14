import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import logic from "../../logic/index";
import Tags from "../Tags"
import "./index.sass";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function CartItem({ history, product, cartItemsQuantity }) {

  async function handleAddToCart() {
    console.log(logic.__userToken__)
    if (logic.__userToken__) {
      await logic.addProductToCart(logic.__userToken__, product.productId._id);
      await cartItemsQuantity()
    } 
  }

  async function handleTakeOfCart() {
    if (logic.__userToken__) {
      await logic.takeOutProductToCart(logic.__userToken__, product.productId._id);
      await cartItemsQuantity()
    } 
  }

  return (

    <>
      <div class='container'>
        <div class='section'>
          <div class='card is-horizontal columns'>
            <div class='card-image column is-three-fifths'>
              <figure class='image is-4by3'>
                <img
                  src={product.productId.imageUrlMain}
                  alt='this used to be photo'
                />
              </figure>
            </div>
            <div class='card-content column is-two-fifths'>
              <div class='media'>
                
                <div class='media-content'>
                  <p class='title is-4'>{product.productId.name}</p>
                  <p class='subtitle is-6'>
                  {product.productId.brand}
                  </p>
                </div>
              </div>

              <div class='content'>
            
                <br />
                <br />
                  <div class='field is-grouped is-grouped-multiline'>
                    <div class='control'>
                      <div class='tags has-addons'>
                        <Tags tagsItem={product.productId.tag}/>
                      </div>
                    </div>

                    <div className='buttons'>
              <div id="add" className='button' onClick={e =>  handleAddToCart()}>
                <FontAwesomeIcon icon={faPlus} className='g-ShoppingBasket__icon' />
              </div>
              <div id="withdraw" className='button' onClick={e => handleTakeOfCart()}>
                <FontAwesomeIcon icon={faMinus} className='g-ShoppingBasket__icon' />
              </div>
              <div className='button '>add to wish list</div>
            </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>


  );
}

export default withRouter(CartItem);
