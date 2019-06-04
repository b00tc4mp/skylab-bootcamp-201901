import React from 'react';



function MyTickets(props) {

    let tickets = []
    let ticketsProccesed = []


    const { data } = props

    function handleDetail(id) {
        debugger
        alert(id)
    }

    function handleDelete(id) {
        debugger
        alert(id)
    }

    ticketsProccesed = data.map(({ date, _id, items }) => {
        return <div key={_id} class="box">
            TICKET DATE :{date}

            {
                items.map(item => {
                    return <div class="box">
                       <p>name: {item.name}</p> 
                       <p> price:{item.Euro}</p>
                    </div>
                })
            }
            <button className="button is-link" onClick={() => handleDetail(_id)}>Detail</button>
            <button className="button is-danger" onClick={() => handleDelete(_id)}>Delete</button>
        </div>
    })


    return <div>
        <div class="box"><button class="button is-danger" >Delete All Tickets</button></div>
        {ticketsProccesed}
    </div>

}


export default MyTickets