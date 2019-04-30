import React from 'react'

function Results({ items }) {
    items.forEach(element => {

    });
    return <ul>
        {
            items.map(({ isbn, cover_edition_key, title, author_name, cover_i, publish_date }) => {

                return (isbn && cover_edition_key) && <li key={cover_edition_key}>
                    <h2>{title}<span>ISBN: {isbn[0]}</span></h2>
                    <img src={cover_i ? `http://covers.openlibrary.org/b/id/${cover_i}-L.jpg`: 'https://www.motorolasolutions.com/content/dam/msi/images/business/products/accessories/p_-_r/raf4220a/_images/static_files/b2b_product_raf4220a_lg_us-en.jpg'} alt={title} />
                    <p>{author_name}</p>
                    {publish_date && <span>{publish_date[0]}</span>}
                </li>
            
                
            })
    }
    </ul>
}


export default Results 