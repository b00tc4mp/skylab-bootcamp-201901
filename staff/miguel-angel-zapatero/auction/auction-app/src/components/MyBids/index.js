import React, {useState, useEffect, Fragment} from 'react'
import logic from '../../logic';
import NoResults from '../NoResults';
import moment from 'moment'
import handleErrors from '../../common/handleErrors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAward } from '@fortawesome/free-solid-svg-icons'
import './index.sass'

function MyBids({onItem, onLogout}) {
    const [userItems, setUserItems] = useState(null)

    useEffect(()=>{
        handleRetrieveUserItemsBids()
    },[])

    async function handleRetrieveUserItemsBids() {
        try {
            if (logic.isUserLoggedIn) {
                const userItemsBids = await logic.retrieveUserItemsBids() 

                setUserItems(userItemsBids)
            } else {
                onLogout()
            }
        } catch (error) {
            handleErrors(error)
        }
    }

    return <>
        <h2 className="uk-text-center">MY BIDS</h2>
        
        {userItems === null ? <div className="uk-align-center uk-text-center"><div data-uk-spinner></div></div> : userItems.length > 0 ?
        <div className="uk-child-width-1-2@s uk-child-width-1-3@m uk-grid-small uk-text-center" data-uk-grid>
            {userItems && userItems.map(item => {
                
            return <div key={item.id}> 
                <div className="uk-card uk-card-default user-items" >
                    <Fragment>
                    <div className="uk-card-media-top" onClick={() => onItem(item.id)}>
                        {item.images && item.images.length > 0 && <img src={item.images[Math.floor(Math.random() * item.images.length)]} alt={item.title}/>}
                    </div>
                    </Fragment>
                    <div className="uk-card-body">
                        {moment().isAfter(item.finishDate) && <div className="uk-card-badge uk-label uk-label-danger">Closed</div>}
                        
                        <h3 className="uk-text-center uk-card-title uk-text-lead">{item.title}</h3>
                        <dl>
                            <hr className="uk-divider-icon"/>
                            <dd className="uk-text-center uk-text-uppercase uk-text-small">
                            {moment().isBefore(item.finishDate) && 
                            <>Closing Date: {moment(item.finishDate).format('DD MMM YYYY')} | {moment(item.finishDate).format('LT')}</>}
                            </dd>
                            <dd className="uk-text-center uk-text-uppercase uk-text-small">
                            {moment().isAfter(item.finishDate) && logic.userId === item.bids[0].userId.id && <FontAwesomeIcon icon={faAward} className="user-items__icon" size="3x"/>}
                            </dd>
                        </dl>
                        <ul data-uk-accordion>
                            <li>
                            <a className="uk-accordion-title" href="#">Historial Bids</a>
                            <div className="uk-accordion-content">
                                <ul  className="uk-list uk-list-striped">
                                    {item.bids && item.bids.length > 0 && item.bids.map(bid => 
                                        <li key={bid.id}>
                                        <div className="uk-width-auto">
                                            <p className={logic.userId === bid.userId.id ?"uk-margin-remove uk-text-bold" : "uk-margin-remove"}>{bid.userId.name} - {logic.getFormat(bid.amount)}</p>
                                        </div>
                                        <div className="uk-width-expand">
                                            <p className="uk-margin-remove">{moment(bid.timeStamp).format('DD MMM YYYY, LT')}</p>
                                        </div>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            </li>
                        </ul>
                    </div>
                </div>
                </div>
            })
            }
        </div> : <NoResults />
        }
    </>
}

export default MyBids