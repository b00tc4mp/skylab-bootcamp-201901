import React from 'react'
import logic from '../../logic'
import './index.sass'

function BidsDetail({bid}) {
    
    return <li className={logic.userId === bid.userId.id ? "uk-text-left uk-comment bid bid-user" : "uk-text-left uk-comment bid"}>
            <header className="uk-comment-header uk-grid-medium uk-flex-small" data-uk-grid>
                <div className="uk-width-auto">
                    <img className="uk-comment-avatar bid__avatar" src={bid.userId.avatar} alt="user avatar"/>
                </div>
                <div className="uk-width-expand">
                    <h5 className="uk-comment-title uk-margin-remove">{logic.getFormat(bid.amount)}</h5>
                    <ul className="uk-comment-meta uk-subnav uk-margin-remove uk-padding-remove">
                        <li className={logic.userId === bid.userId.id ? "uk-padding-remove uk-text-bold" : "uk-padding-remove"}>{bid.userId.name}</li>
                    </ul>
                </div>
            </header>
        </li>
}

export default BidsDetail