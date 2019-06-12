import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import logic from "../../logic";
import Tags from "../Tags";
import "./index.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

function Detail({history, match, cartItemsQuantity }) {
  const [modalLogin, setModalLogin] = useState("modal");
  const [messageError, setErrorMessage] = useState(null);
  const [detail, setDetail] = useState({});

  const {
    params: { id }
  } = match;

  useEffect(() => {
    async function verify() {
      const detailA = await logic.retrieveProduct(id);
      setDetail(detailA);
      setModalLogin('modal')
    }
    verify();
  }, []);

  async function handleAddToCart() {
    console.log(logic.__userToken__);
    if (logic.__userToken__) {
      await logic.addProductToCart(logic.__userToken__, id);

      await cartItemsQuantity();
    } else {
      setModalLogin("modal is-active");
    }
  }

  async function handleTakeOfCart() {
    if (logic.__userToken__) {
      await logic.takeOutProductToCart(logic.__userToken__, id);
      await cartItemsQuantity();
    } else {
      setModalLogin("modal is-active");
    }
  }

  async function handleModalLogin() {
      
      setTimeout(() => history.push('/login'), 4000);}

  return (
    <>

      <div className='container'>
        <section className='columns'>
          <section className='column'>
            <figure class='image is-4by3'>
              <img className='image-detail' src={detail.imageUrlMain} alt='Placeholder image' />
            </figure>
          </section>
          <section id="features" className='column'>
            <div >
              <p className="is-size-5 has-text-danger"  >{detail.name}</p>
              <br />
              <p className="is-size-5" >{detail.description}</p>
              <br />
              <p className="is-size-5"  >{detail.price}€</p>
            </div>
            
            <div id="addCart">
              <div>
                <div>
            <p className="is-size-4 has-text-weight-bold">Add to cart</p>
            </div>
            </div>
              <div id='add' className='button is-radiusless' onClick={e => handleAddToCart()}>
                <FontAwesomeIcon icon={faPlus} className='g-ShoppingBasket__icon' />
              </div>
              <div id='withdraw' className='button is-radiusless' onClick={e => handleTakeOfCart()}>
                <FontAwesomeIcon icon={faMinus} className='g-ShoppingBasket__icon' />
              </div>
            </div>
          </section>

          {
            <div className={modalLogin}>
              <div className='modal-background' />

              <div className='modal-content'>
                <div className='box' >
                  <p>You need to be logged in to add products on cart</p>
                </div>
              </div>
              <button
                className='modal-close is-large'
                aria-label='close'
                onClick={() => setModalLogin("modal")}
              />
            </div>
          }
        </section>
      </div>
    </>
  );
}

export default withRouter(Detail);
