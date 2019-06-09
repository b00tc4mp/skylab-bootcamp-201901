import React from 'react'
import './index.sass'

function BidsDetail({bid, index, userId}) {
    
    return <> 
        {(userId !== bid.userId._id) &&
            <li className="uk-text-left uk-comment bid" key={index}>
                <header className="uk-comment-header uk-grid-medium uk-flex-small" data-uk-grid>
                    <div className="uk-width-auto">
                        <img className="uk-comment-avatar bid__avatar" src={bid.userId.avatar} alt="user avatar"/>
                    </div>
                    <div className="uk-width-expand">
                        <h5 className="uk-comment-title uk-margin-remove">{bid.amount} €</h5>
                        <ul className="uk-comment-meta uk-subnav uk-margin-remove uk-padding-remove">
                            <li key={index} className="uk-padding-remove">{bid.userId.name}</li>
                        </ul>
                    </div>
                </header>
            </li>
        } 
        {(userId === bid.userId._id) && 
            <li className="uk-text-right uk-comment bid" key={index}>
            <header className="uk-comment-header uk-grid-medium uk-flex-small" data-uk-grid>
                <div className="uk-width-expand">
                    <h5 className="uk-comment-title uk-margin-remove">{bid.amount} €</h5>
                    <ul className="uk-comment-meta uk-subnav uk-margin-remove uk-padding-remove">
                        <li key={index} className="uk-text-right uk-padding-remove bid__username">{bid.userId.name}</li>
                    </ul>
                </div>
                <div class="uk-width-auto">
                    <img className="uk-comment-avatar bid__avatar" src={bid.userId.avatar} alt="user avatar"/>
                </div>
            </header>
        </li>
        }
    </>
}

export default BidsDetail