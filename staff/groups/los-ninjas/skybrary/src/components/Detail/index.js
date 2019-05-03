import React, { Fragment } from 'react'
import './index.scss'

function Detail({ item, onFav, bookFavs }) {
    if (!item) {
        return "Este detalle no es correcto"
    }

    const isBookFav = () => {
        return bookFavs.some(fav => {
            if(item.isbn){
                const key = Object.keys(fav)[0]
                return key === 'ISBN:' + item.isbn
            }
            return false
        })
    }

    return <section className='container'>
        <article className='columns card-detail'>
            {<i onClick={() => { onFav(item.isbn) }} className={isBookFav() ? 'fas fa-heart' : 'far fa-heart'} />}

            <div className='column is-4 card-detail__image'>
                {<img src={(item.cover && item.cover > 0)
                    ? `https://covers.openlibrary.org/b/id/${item.cover}-L.jpg`
                    : 'https://www.motorolasolutions.com/content/dam/msi/images/business/products/accessories/p_-_r/raf4220a/_images/static_files/b2b_product_raf4220a_lg_us-en.jpg'} />
                }
            </div>
            <div className='column is-8 card-detail__info'>
                {item.title &&
                    <Fragment>
                        <p className="info__BoldTitle">
                            Title:
                            <span>{item.title}</span>
                        </p>
                    </Fragment>
                }

                <p className="info__BoldTitle">
                    Author:
                    <span>{item.author_name.join(', ')}</span>
                </p>
                {item.numberOfPages &&
                    <p className="info__BoldTitle">
                        Num of pages:
                        <span>{item.numberOfPages}</span>
                    </p>
                }
                {item.description &&
                    <Fragment>
                        <p className="info__BoldTitle">
                            Synopsis:
                            <span>{item.description}</span>
                        </p>
                    </Fragment>
                }
            </div>
        </article>
    </section>

}

export default Detail









