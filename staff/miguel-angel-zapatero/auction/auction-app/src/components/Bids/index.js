import React, {useState} from 'react'

function Bids({bids, onBid, isClosed}) {
    const [amount, setAmount] = useState(null)

    function handleSubmit(e){
        e.preventDefault()
        
        onBid(amount)
    }
    
    return <>
        <ul>
            {bids && bids.map((bid, index)=>
                <li key={index}>{bid.userId.name}-{bid.amount}</li>
            )}
        </ul>
        <form onSubmit={handleSubmit}>
            <input type="text" name="amount" required onChange={e=>setAmount(e.target.value)}/>
            <button className={isClosed ? "disable": "btn-default"}>Place Bid</button>
        </form>
    </>
}

export default Bids
