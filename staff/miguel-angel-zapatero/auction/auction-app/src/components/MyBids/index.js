import React, {useState, useEffect, Fragment} from 'react'
import logic from '../../logic';
import NoResults from '../NoResults';
import moment from 'moment'
import handleErrors from '../../common/handleErrors'
import './index.sass'

function MyBids({onItem}) {
    const [userItems, setUserItems] = useState(null)

    useEffect(()=>{
        handleRetrieveUserItemsBids()
    },[])

    async function handleRetrieveUserItemsBids() {
        try {
            if (logic.isUserLoggedIn) {
                const userItemsBids = await logic.retrieveUserItemsBids() 
                
                setUserItems(userItemsBids)
            }
        } catch (error) {
            handleErrors(error)
        }
    }

    return <>
        <h2 className="uk-text-center">MY BIDS</h2>
        <div className="uk-flex uk-flex-center">
            {userItems && userItems.map(item => {
                return <>
                <div key={item.id}> 
                <Fragment>
                <div className="uk-card uk-card-default item" onClick={() => onItem(item.id)}>
                    <div className="uk-card-media-top">
                        <img src="https://images.unsplash.com/photo-1532667449560-72a95c8d381b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60" alt={item.title}/>
                    </div>
                    <div className="uk-card-body">
                        {moment().isAfter(item.finishDate) && <div className="uk-card-badge uk-label uk-label-danger">Closed</div>}
                        
                        <h3 className="uk-text-center uk-card-title uk-text-lead">{item.title}</h3>
                        <dl>
                            <hr className="uk-divider-icon"/>
                            <dd className="uk-text-center uk-text-uppercase uk-text-small">
                            Closing Date: {moment(item.finishDate).format('DD MMM YYYY')} | {moment(item.finishDate).format('LT')}
                            </dd>
                        </dl>
                        <ul  className="uk-list uk-list-striped">
                            {item.bids && item.bids.length > 0 && item.bids.map((bid, index) => 
                                <li className="user-items__bids" key={`${index}-itembids`}>
                                <div>{bid.amount} €</div><div>{moment(bid.timeStamp).format('DD MMM YYYY, LT')}</div>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                </Fragment>
                </div>
                </>
            })
            }
            {!userItems && <NoResults />}
            
        </div>
    </>
}

export default MyBids