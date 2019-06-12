import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartSolid, faCalendarAlt, faEuroSign, faMapMarkerAlt  } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import moment from 'moment'
import logic from '../../logic'

function Item({ onItem, onFav, onToggleFav, onDetail }) {

    const heartFav = onFav? faHeartSolid : faHeartRegular
    
    return (

            <section className="item" >

                    <div className="item__header">
                        <p className="item__header__name">{onItem.name}</p>
                    </div>
        
                    <div className="item__image" onClick={() => onDetail(onItem._id)} style={{ backgroundImage: `url("${onItem.image}")`}} >
                    </div>
                    
                    
                    { (onItem.resultsType === 'congress') && 
                    
                    <div className="item__footer">

                            {/* {logic.isUserLoggedIn  && <FontAwesomeIcon className="item__footer__fav" icon={heartFav} onClick={() => onToggleFav(onItem._id)} />} */}

                            <div className="item__footer__city">
                                <p className="item__footer__city__p">{onItem.city}</p>
                                <FontAwesomeIcon className="item__footer__city__icon" icon={faMapMarkerAlt} />
                            </div>

                            <div className="item__footer__date">
                                <p className="item__footer__date__p">{moment(onItem.startDate).format('DD MMM')}</p>
                                <FontAwesomeIcon className="item__footer__date__icon" icon={faCalendarAlt} />
                            </div>

                            <div className="item__footer__price">
                                <p className="item__footer__price__p">{onItem.tickets[0].price}</p>
                                <FontAwesomeIcon className="item__footer__price__icon" icon={faEuroSign} />
                            </div>

                    </div> } 
    
                    
                    { (onItem.resultsType === 'artist') && <div className="item__footer">

                           {logic.isUserLoggedIn  && <FontAwesomeIcon className="item__footer__fav" icon={heartFav} onClick={() => onToggleFav(onItem._id)} />}

                            <p className="item__footer__category">{onItem.category[0]}</p>

                    </div> }
                

            </section> 
    )
}

export default Item