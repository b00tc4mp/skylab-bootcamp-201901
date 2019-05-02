import React from 'react'
import { Badge } from 'reactstrap'
import ProductHorSlim from '../Products/product-hor-slim'

function FavoriteList (props){
    const {products, onDetail, onToggle} = props

    const handleToggle = (product) => {
        onToggle(product)
      }
    
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