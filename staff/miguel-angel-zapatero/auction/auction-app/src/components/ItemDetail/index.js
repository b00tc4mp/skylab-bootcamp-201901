import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Bids from '../Bids'
import logic from '../../logic';

function ItemDetail({item}) {

    const [bids, setBids] = useState(null)
    // const [amount, setAmound] = useState(item.startPrice)

    useEffect(() => {
        handleRetrieveBids()
    }, []);

    async function handleBid(amount) {
        debugger
        try {
            amount = Number(amount)
            await logic.placeBid(item._id, amount)
        } catch ({message}) {
            alert(message)
        }
    }

    function handleRetrieveBids() {
        const interval = 1000
        debugger
        setInterval(async () => {
            try {
                const _bids = await logic.retrieveItemBids(item._id)
                setBids(_bids)
            } catch ({message}) {
                alert(message)
            }
        }, interval); 
    }

    return <>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        <Link to="/">Back</Link>
        <Bids bids={bids} onBid={handleBid} />
    </>
}

export default ItemDetail