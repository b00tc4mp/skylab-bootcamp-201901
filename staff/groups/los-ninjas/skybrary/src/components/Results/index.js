import React from 'react'
import './index.scss'
import { debug } from 'util';

function Results({ items, onItem, onFav, bookFavs }) {
    return (
        <section className="library container" >
            <ul className="columns is-centered is-multiline is-mobile">
                {
                    items.map(({ key, isbn, cover_edition_key, title, author_name, cover_i, publish_date }) => {
                        const isFav = bookFavs.some(fav => {
                            if(isbn){
                                const key = Object.keys(fav)[0]
                                return key === 'ISBN:' + isbn[0]
                            }
                            return false
                        })

                        return (isbn && cover_edition_key) && <li className="library__book column is-3-desktop is-4-tablet is-10-mobile" key={cover_edition_key} onClick={() => onItem(isbn[0], key)}>
                            <article className="card">
                                <div className="card-image">
                                    <figure className="image is-3by4">
                                        <img src={(cover_i && cover_i > 0) ? `http://covers.openlibrary.org/b/id/${cover_i}-L.jpg` : 'https://www.motorolasolutions.com/content/dam/msi/images/business/products/accessories/p_-_r/raf4220a/_images/static_files/b2b_product_raf4220a_lg_us-en.jpg'} alt={title} />
                                    </figure>
                                </div>
                                <div className="card-content">
                                    <div className="media">
                                        <div className="media-content">
                                            <p className="title is-4">{title}</p>
                                            <p className="subtitle is-6">{author_name}</p>
                                        </div>
                                    </div>

                                    <div className="content">
                                        <span className="book__isbn">ISBN: {isbn[0]}</span>
                                        <time>
                                            {publish_date && <span>{publish_date[0]}</span>}
                                        </time>

                                    </div>
                                {<i onClick={e => { e.stopPropagation(); onFav(isbn[0]) }} className={isFav ? 'fas fa-heart' : 'far fa-heart'}/>}
                                </div>
                            </article>
                        </li>
                    })
                }
            </ul>
        </section>
    )
}

export default Results
