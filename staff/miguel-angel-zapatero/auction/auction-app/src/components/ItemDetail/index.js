import React from 'react'
import './index.sass'

function ItemDetail({item}) {
    return <>
    <div className="uk-visible@s">
        <div className="uk-position-relative" data-uk-slideshow="animation: fade">
            <ul className="uk-slideshow-items">
                {item.images && item.images.length > 0 && item.images.map((img, index) => {
                    return <li key={index}><img src={img} alt={item.title} data-uk-cover/></li>
                })}
            </ul>

            <div className="uk-position-bottom-center uk-position-small">
                <ul className="uk-thumbnav">
                    {item.images && item.images.length > 0 && item.images.map((img, index) => {
                        return <li uk-slideshow-item={index} key={`${index}-thumb`}><a href="#"><img src={img} alt={item.title} width="100"/></a></li>
                    })}
                </ul>
            </div>
        </div>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
    </div>
    <div className="uk-hidden@s" data-uk-grid>
        <div className="uk-width-auto">
            {item.images && item.images.length > 0 && <img src={item.images[0]} alt={item.title}/>}
        </div>
        <div className="uk-width-expand"><h2>{item.title}</h2></div>
    </div> 
    </>
}

export default ItemDetail