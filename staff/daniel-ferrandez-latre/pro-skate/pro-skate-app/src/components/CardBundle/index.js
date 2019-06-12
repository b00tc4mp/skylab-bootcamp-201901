import React from 'react'
import logic from '../../logic'
import Card from '../Card'

function CardBundle({ ranSelection, handleProductDetail }){


  return (<>
  <div className='container'>
  <section class='section'>
    <div class='container'>
      <h1 class='title'>Our today's selection</h1>
      <h2 class='subtitle'>
        you're currently reading
      </h2>
    </div>
  </section>
    <section className='columns is-multiline'>
      
      {ranSelection.map(product =>{
        return( 
          <section className='column is-3'>
            <Card product={product} handleProductDetail={handleProductDetail}/>
          </section>
        )
      })}
    
    </section>
  </div>
  </>)

}

export default CardBundle