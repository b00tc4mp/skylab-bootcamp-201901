import React, {useState} from 'react'

function Bids({bids, onBid, currentAmount}) {
    const [amount, setAmount] = useState(null)
    
    function handleSubmit(e){
        e.preventDefault()
        
        onBid(amount)
    }
    
    return <>
        <ul>
            {bids && bids.map(bid=>
                <li key={bid._id}>{bid.userId.name}-{bid.amount}</li>
            )}
        </ul>
        <form onSubmit={handleSubmit}>
            <input type="text" name="amount" required onChange={e=>setAmount(e.target.value)}/>
            <button>Place Bid</button>
        </form>
    </>
}

export default Bids
