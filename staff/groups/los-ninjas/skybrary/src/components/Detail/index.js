import React from 'react'

function Detail ({item}) {
    if (!item) {
        return "Este detalle no es correcto"
    }

    console.log(item)

    return <section>
        {item.title && <p>{item.title}</p>}
        {<img src={(item.cover && item.cover > 0) ? `https://covers.openlibrary.org/b/id/${item.cover}-L.jpg` : 'https://www.motorolasolutions.com/content/dam/msi/images/business/products/accessories/p_-_r/raf4220a/_images/static_files/b2b_product_raf4220a_lg_us-en.jpg'} />}
        <span>{item.author_name.join(', ')}</span>
        {item.numberOfPages && <span>{item.numberOfPages} páginas</span>}
        {item.description && <p>{item.description}</p>}
     
        {/* {(item && item.authors > 0) ? <span>{item.authors.name}</span> : <span>No definido</span>} */}
        

        {/* <img src={`https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`} /> */}
        {/* {item && <p>{item.description.value}</p>} */}
        {/* <h2>{title}</h2>
        <img src={`https://covers.openlibrary.org/b/id/${image}-L.jpg`}  alt={image}/>
        <p>{description}</p>
        <span>{date}</span>
         */}
    </section>
    
}




export default Detail









