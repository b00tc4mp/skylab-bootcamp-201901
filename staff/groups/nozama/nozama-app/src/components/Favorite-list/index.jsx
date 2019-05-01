import React from 'react'
import { Row, Container, Col, Button, Input, Badge } from 'reactstrap'
import ProductHorSlim from '../Products/product-hor-slim'

function FavoriteList (props){
    const {products, onDetail, onToggle} = props

    const handleToggle = (product) => {
        onToggle(product)
      }

    //   let heartPath = heart 
    //   const heart = "https://cdn.icon-icons.com/icons2/38/PNG/512/hearts_heart_love_favorite_5565.png"
    //   const heartStrong = "https://png.pngtree.com/svg/20161101/44472bba9e.png"
    
    return(
        <div>
            {products.map(product => (
                <div>
                    <ProductHorSlim key={product.productId} product={product} onDetail={onDetail} />
                    <div onClick={(e) => handleToggle(product)}>
                    <Badge 
                        style={{
                        position: "absolute",
                        right: "10",
                        top: "-10",
                        zIndex: "1"
                        }} 
                        color="primary"  >Fav</Badge>
                    </div>
                </div>
            
            ))}
        </div>
        )
}

export default FavoriteList