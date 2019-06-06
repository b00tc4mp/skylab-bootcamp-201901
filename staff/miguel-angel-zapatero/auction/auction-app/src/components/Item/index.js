import React, {useState, useEffect} from 'react'
import { Link, withRouter } from 'react-router-dom'
import ItemDetail from '../ItemDetail'
import Bids from '../Bids'
import BidsInfo from '../BidsInfo'
import CountDown from '../CountDown'
import logic from '../../logic';
import moment from 'moment'

function Item({item, getItem, itemId, history}) {

    const [bids, setBids] = useState(null)
    const [amount, setAmound] = useState(null)
    const [city, setCity] = useState(null)
    const [totalBids, setTotalBids] = useState(0)
    const [date, setDate] = useState(null)
    const [now, setNow] = useState(null)
    const [isClosed, setIsClosed] = useState(null)

    useEffect(() => {
        getItem(itemId)
    }, [itemId])

    useEffect(() => { 
        const interval = 1000
        const auction = setInterval(async () => {
            try {
                const _bids = await logic.retrieveItemBids(itemId)
                const { bids: arrBids } = _bids

                setBids(arrBids)
                setCity(item.city)
                setTotalBids(arrBids.length)
                arrBids.length ? setAmound(arrBids[0].amount) : setAmound(item.startPrice)
                setIsClosed(moment().isSameOrAfter(_bids.finishDate))
                setDate(_bids.finishDate)
                setNow(moment())

                if(isClosed) clearInterval(auction)
            } catch ({message}) {
                clearInterval(auction)
                alert(message)
                history.push("/notfound")
            }
        }, interval); 

        return () => clearInterval(auction)
    }, [item]);

    async function handleBid(amount) {
        try {
            amount = Number(amount)
            await logic.placeBid(item.id, amount)
        } catch ({message}) {
            alert(message)
        }
    }

    return <>
        { item && <> 
        <ItemDetail item={item}/>
        <Link to="/">Back</Link>
        {isClosed === null ? <span>Loading...</span> : isClosed ? <span>Closed</span> : <CountDown nowDate={now} endDate={date}/>}
        <BidsInfo currentAmount={amount} totalBids={totalBids} date={date} city={city} />
        <Bids bids={bids} onBid={handleBid} isClosed={isClosed}/> 
        </>}
    </>
}

export default withRouter(Item)