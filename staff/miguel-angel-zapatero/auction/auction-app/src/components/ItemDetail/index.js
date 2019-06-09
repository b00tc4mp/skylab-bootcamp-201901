import React from 'react'

function ItemDetail({item}) {
    return <>
    <div className="uk-position-relative" data-uk-slideshow="animation: fade">
            <ul className="uk-slideshow-items">
                <li>
                    <img src="https://images.unsplash.com/photo-1532667449560-72a95c8d381b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60" alt="" data-uk-cover/>
                </li>
                <li>
                    <img src="https://images.unsplash.com/photo-1532667449560-72a95c8d381b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60" alt="" data-uk-cover/>
                </li>
                <li>
                    <img src="https://images.unsplash.com/photo-1532667449560-72a95c8d381b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60" alt="" data-uk-cover/>
                </li>
            </ul>

            <div className="uk-position-bottom-center uk-position-small">
                <ul className="uk-thumbnav">
                    <li uk-slideshow-item="0"><a href="#"><img src="https://images.unsplash.com/photo-1532667449560-72a95c8d381b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60" width="100" alt=""/></a></li>
                    <li uk-slideshow-item="1"><a href="#"><img src="https://images.unsplash.com/photo-1532667449560-72a95c8d381b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60" width="100" alt=""/></a></li>
                    <li uk-slideshow-item="2"><a href="#"><img src="https://images.unsplash.com/photo-1532667449560-72a95c8d381b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60" width="100" alt=""/></a></li>
                </ul>
            </div>
        </div>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
    </>
}

export default ItemDetail