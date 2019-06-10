import React, {useState} from 'react'
import BidsDetail from '../BidsDetail'
import './index.sass'

function Bids({bids, onBid, isClosed, quickBid, userId}) {
    const [amount, setAmount] = useState(null)

    function handleSubmit(e){
        e.preventDefault()

        if(amount) {
            onBid(amount)
            setAmount(null)
            document.getElementsByName("amount")[0].value = ""
        }
        else {
            const _quickBid = e.target.quickbid.value
            onBid(_quickBid)
        }

        document.getElementById("bids").scrollTop = 0
    }
    
    return <>
        <ul id="bids" className="uk-list uk-list-striped bids">
            {bids && bids.map((bid, index) =>
                <BidsDetail key={index} bid={bid} userId={userId}/>
            )}
        </ul>
        <form onSubmit={handleSubmit}>
            <input className="uk-input uk-text-center" type="number" min={quickBid} name="amount" onChange={e=>setAmount(e.target.value)} placeholder="SET YOUR MAXIMUM BID" disabled={isClosed}/>
            <button name="quickbid" value={quickBid} className="uk-button uk-button-primary uk-width-1-1" disabled={isClosed}>Place next Bid: {quickBid} €</button>
        </form>
    </>
}

export default Bids
