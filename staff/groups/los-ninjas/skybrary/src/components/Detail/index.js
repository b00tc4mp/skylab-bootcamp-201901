import React from 'react'
import './index.scss'

function Detail({ item }) {
    if (!item) {
        return "Este detalle no es correcto"
    }



    return <section className='container'>
        <article className='columns card-detail'>

            <div className='column is-4 card-detail__image'>
                {<img src={(item.cover && item.cover > 0) ? `https://covers.openlibrary.org/b/id/${item.cover}-L.jpg` : 'https://www.motorolasolutions.com/content/dam/msi/images/business/products/accessories/p_-_r/raf4220a/_images/static_files/b2b_product_raf4220a_lg_us-en.jpg'} />}
            </div>
            <div className='column is-8 card-detail__info'>
                {item.title && <span><p className="info__BoldTitle">Title: </p> <p>{item.title}</p></span>}
                <span><p className="info__BoldTitle">Author: </p>{item.author_name.join(', ')}</span>
                {item.numberOfPages && <span><p className="info__BoldTitle">Num of pages: </p>{item.numberOfPages} </span>}
                {item.description && <span> <p className="info__BoldTitle">Synopsis: </p><p>{item.description}</p> </span>}
            </div>
        </article>
    </section>

}




export default Detail









