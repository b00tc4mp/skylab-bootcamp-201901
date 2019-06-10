import React, { useState, useEffect } from "react";
import {withRouter} from 'react-router-dom'
import logic from "../../logic";
import './index.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function Detail({userLogged, match }) {
  const [modalLogin, setModalLogin] = useState("modal");
  const [messageError, setErrorMessage] = useState(null);
  const [detail, setDetail] = useState({})

  const { params: { id } } = match

  useEffect( function(){
    
    async function getProduct(){
      const detailA = await logic.retrieveProduct(id)
      setDetail(detailA)
    }
    getProduct()
  }
  , [])



  async function handleAddToCart() {
    debugger
    console.log(logic.__userToken__)
    if (logic.__userToken__) {
      await logic.addProductToCart(logic.__userToken__, id);
    } else {
      setModalLogin("modal is-active");
    }
  }

  async function handleTakeOfCart() {
    debugger
    console.log(logic.__userToken__)
    if (logic.__userToken__) {
      await logic.takeOutProductToCart(logic.__userToken__, id);
    } else {
      setModalLogin("modal is-active");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const {
      email: { value: email },
      password: { value: password }
    } = event.target;
    try {

      await logic.loginUser(email, password);
      userLogged()
      setModalLogin('modal')
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => setModalLogin('modal'), 4000)
    }
    
  }

  return (
    <>
      <div className='container box'>
        <section className='columns'>
          <section className='column'>
            <figure class='image is-4by3'>
              <img className="image-detail" src={detail.imageUrlMain} alt='Placeholder image' />
            </figure>
          </section>
          <section className='column'>
            <div className='box'>
              <p has-text-justified>{detail.name}</p>
              <br/>
              <p has-text-justified>{detail.description}</p>
              <br/>
              <p>{detail.price}€</p>
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
          </section>

          {
            <div className={modalLogin}>
              <div className='modal-background' />

              <div className='modal-content'>
                Login
                <div className='box'>
                  <form onSubmit={handleSubmit}>
                    <div className='field'>
                      <label className='label'>Email</label>
                      <div className='control'>
                        <input className='input' name='email' type='email' placeholder='email' />
                      </div>
                    </div>

                    <div className='field'>
                      <label className='label'>Password</label>
                      <div className='control'>
                        <input
                          className='input'
                          name='password'
                          type='password'
                          placeholder='password'
                        />
                      </div>
                    </div>

                    <p className='control'>
                      <button className='button is-info is-outlined'>Login</button>
                    </p>
                  </form>
                  {messageError && (
                    <div className='message-body'>
                      <p>{messageError}</p>
                    </div>
                  )}
                </div>
              </div>
              <button className='modal-close is-large' aria-label='close' />
            </div>
          }
        </section>
      </div>
    </>
  );
}

export default withRouter(Detail);
