import React, { Fragment } from 'react'
import NoResults from '../NoResults'
import moment from 'moment'

function Items({items, onItem}) {
    return <>
        <div className="uk-child-width-1-2@s uk-child-width-1-3@m uk-grid-small uk-text-center" data-uk-grid> 
            {items && items.map(({ id, title, startPrice, startDate, finishDate, city}) =>  
            <div key={id}> 
                <Fragment>
                <div className="uk-card uk-card-default item" onClick={() => onItem(id)}>
                    <div className="uk-card-media-top">
                        <img src="https://images.unsplash.com/photo-1532667449560-72a95c8d381b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60" alt={title}/>
                    </div>
                    <div className="uk-card-body">
                        {moment().isAfter(finishDate) && <div className="uk-card-badge uk-label uk-label-danger">Closed</div>}
                        {moment().isBefore(startDate) && <div className="uk-card-badge uk-label uk-label-default">Upcoming Auction</div>}
                        
                        <h3 className="uk-card-title uk-text-lead">{title}</h3>
                        <dl>
                            <hr className="uk-divider-icon"/>
                            <dd>Estimate: {startPrice} €</dd>
                            <dd className="uk-text-uppercase uk-text-small">
                            {moment(finishDate).format('DD MMM YYYY')} | {moment(finishDate).format('LT')} | {city}
                            </dd>
                        </dl>
                    </div>
                </div>
                </Fragment>
            </div>
            )}
        </div>
        {(!items || !items.length) && <NoResults/>}
    </>
}

export default Items