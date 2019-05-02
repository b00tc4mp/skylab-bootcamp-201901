import React , {useState} from 'react'
import Image from '../../components/Products/Detail/Image'
import Title from '../../components/Products/Detail/Title'
import Subtitle from '../../components/Products/Detail/Subtitle'
import Price from '../../components/Products/Detail/Price'
import Currency from '../../components/Products/Detail/Currency'
import ButtonAddToCart from '../../components/Buttons/AddToCart'
import Cart from '../Cart';
import logic from '../../logic/'
import {
  CART_ADD_PRODUCT
} from '../../logic/actions';

function DetailScreen(props){
  const [product, setProduct] = useState(null)

  logic.detailProduct('DB3105')
    .then(detail => { 
      setProduct(detail)
    });




        

  if (!product) return <div class="spinner-border text-success " role="status"></div>

  const handleAddToCart = product => {
    console.log(product)
    props.dispatch({action: CART_ADD_PRODUCT, product, quantity: 1})
   
  }

  return(
    <div className="container">
      <div className="row">
          <Title title={product.productName}/>
        </div>
          <div className="row">
            <img width="100rem" height="100rem" src={product.imageSmall}/>
          </div>
        <div className="col">
          <Subtitle subtitle={product.subtitle} />
          <div className="row" >
            <Price price={product.originalPrice}/>
            <Currency currency={product.displayCurrency}/>
          </div>
          <div className="col">
          <ButtonAddToCart onClick={handleAddToCart}/>
          </div>
        </div>
      </div>
  )

}

export default DetailScreen