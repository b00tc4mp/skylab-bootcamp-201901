import React, {useState, useEffect} from 'react'
import { Link, withRouter } from 'react-router-dom'
import ItemDetail from '../ItemDetail'
import Bids from '../Bids'
import BidsInfo from '../BidsInfo'
import CountDown from '../CountDown'
import logic from '../../logic';
import moment from 'moment'
import handleErrors from '../../common/handleErrors';

function Item({item, getItem, itemId, history, onLogout}) {
    const [bids, setBids] = useState(null)
    const [amount, setAmound] = useState(null)
    const [city, setCity] = useState(null)
    const [totalBids, setTotalBids] = useState(0)
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [now, setNow] = useState(null)
    const [isClosed, setIsClosed] = useState(null)
    const [isUpcoming, setIsUpcoming] = useState(null)
    const [quickBid, setQuickBid] = useState(null)
    const [isWin, setIsWin] = useState(false)

    useEffect(() => {
        getItem(itemId)
    }, [itemId])

    useEffect(() => { 
        const interval = 1000
        const auction = setInterval(async () => {
            try {
                if(!logic.isUserLoggedIn) {
                    clearInterval(auction)
                    onLogout()
                }
                
                if(itemId.length === 24) {
                    const _bids = await logic.retrieveItemBids(itemId)
                    const { bids: arrBids } = _bids
                    
                    if(arrBids.length && logic.userId === arrBids[0].userId.id) setIsWin(true)
                    else setIsWin(false)
                    
                    setBids(arrBids)
                    setCity(item.city)
                    setTotalBids(arrBids.length)
                    arrBids.length ? setAmound(arrBids[0].amount) : setAmound(item.startPrice)
                    setIsClosed(moment().isAfter(_bids.finishDate))
                    setIsUpcoming(moment().isBefore(_bids.startDate))
                    setStartDate(_bids.startDate)
                    setEndDate(_bids.finishDate)
                    setNow(moment())

                    if(arrBids.length) {
                        if (arrBids.length >= 1 && arrBids.length < 10) {
                            setQuickBid(arrBids[0].amount + 100)
                        } else if (arrBids.length >= 10 && arrBids.length < 15) {
                            setQuickBid(arrBids[0].amount + 500)
                        } else if (arrBids.length >= 15) {
                            setQuickBid(arrBids[0].amount + 1000)
                        }
                    } else setQuickBid(item.startPrice + 100)

                    if(isClosed) clearInterval(auction)
                } else {
                    history.push('/404')
                }
            } catch (error) {
                handleErrors(error)
                history.push('/404')
            }
        }, interval); 

        return () => clearInterval(auction)
    }, [item]);

    async function handleBid(amount) {
        try { 
            await logic.placeBid(item.id, Number(amount))
        } catch (error) {
            handleErrors(error)
        }
    }

    return <>
        { item && <>
        <div className="uk-grid-match uk-grid-small" data-uk-grid>
            <div className="uk-width-1-2@m"> 
                <ItemDetail item={item}/>
            </div>
            <div className="uk-width-1-2@m uk-text-center">
                <div className="uk-card uk-card-default uk-card-body">
                {isUpcoming === null || isClosed === null ? <div data-uk-spinner></div> : isUpcoming ? 
                    <><span className="uk-label uk-label-primary">Upcoming</span>
                    <CountDown nowDate={now} startDate={startDate} />
                    <hr className="uk-divider-icon"/>
                    <Link className="uk-button uk-button-primary" to="/">Back to home</Link></> :
                    isClosed ? 
                    <><span className="uk-label uk-label-danger">Closed</span>
                    <hr className="uk-divider-icon"/>
                    <Link className="uk-button uk-button-danger" to="/">Back to home</Link></> : 
                    <><CountDown nowDate={now} endDate={endDate}/>
                    <BidsInfo currentAmount={amount} totalBids={totalBids} date={endDate} city={city} win={isWin}/>
                    <Bids bids={bids} onBid={handleBid} isClosed={isClosed} quickBid={quickBid}/>
                    </>
                }
                </div>
            </div>
        </div>
        </>}
    </>
}

export default withRouter(Item)