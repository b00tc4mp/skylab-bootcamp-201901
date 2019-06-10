import React from 'react'
import './index.sass'

function BidsDetail({bid, userId}) {
    
    return <li className="uk-text-left uk-comment bid">
            <header className="uk-comment-header uk-grid-medium uk-flex-small" data-uk-grid>
                <div className="uk-width-auto">
                    <img className="uk-comment-avatar bid__avatar" src={bid.userId.avatar} alt="user avatar"/>
                </div>
                <div className="uk-width-expand">
                    <h5 className="uk-comment-title uk-margin-remove">{bid.amount} €</h5>
                    <ul className="uk-comment-meta uk-subnav uk-margin-remove uk-padding-remove">
                        <li className="uk-padding-remove">{bid.userId.name}</li>
                    </ul>
                </div>
            </header>
        </li>
}

export default BidsDetail