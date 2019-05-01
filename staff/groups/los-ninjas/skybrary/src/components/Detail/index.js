import React from 'react'

function Detail({item}){


    return <section>
        {(item && item[0].title) && <p>{item[0].title}</p>}
        {<img src={(item[0].cover && item[0].cover > 0) ? `https://covers.openlibrary.org/b/id/${item[0].covers[0]}-L.jpg` : 'https://www.motorolasolutions.com/content/dam/msi/images/business/products/accessories/p_-_r/raf4220a/_images/static_files/b2b_product_raf4220a_lg_us-en.jpg'} />}
        {item &&  <span>{item[0].authors[0].name}</span>}
     
        {/* {(item && item[0].authors[0] > 0) ? <span>{item[0].authors[0].name}</span> : <span>No definido</span>} */}
        

        {/* <img src={`https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`} /> */}
        {/* {item && <p>{item[0].description.value}</p>} */}
        {/* <h2>{title}</h2>
        <img src={`https://covers.openlibrary.org/b/id/${image}-L.jpg`}  alt={image}/>
        <p>{description}</p>
        <span>{date}</span>
         */}
    </section>
    
}




export default Detail









