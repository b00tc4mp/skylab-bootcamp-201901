import React from 'react';
import Toast from '../Toast'



function MyTickets({ data,
    noTicketsFound,
    deleteTicket,
    addTicket,
    getTicketDetail,
    ticketOkDeleted,
    deleteAllTickets }) {

    let ticketsProccesed = []
   




    function handleToDetail(e) {

        getTicketDetail(e.target.value)
    }


    function handleToDeleteAllTickets() {

        deleteAllTickets()
    }


    function handleToDeleteTicket(e) {
       
        deleteTicket(e.target.value)
    }

    if (data) {
       
    
        ticketsProccesed = data.map(({ date, _id, items }) => {
            return <div class="box">
                TICKET DATE :{date}

                {
                    items.map(item => {
                        return <div  class="box">
                            <p>name: {item.name}</p>
                            <p> price:{item.Euro}</p>
                        </div>
                    })
                }
                <button className="button is-link"  value={_id} onClick={handleToDetail}>Detail</button>
                <button className="button is-danger"  value={_id} onClick={handleToDeleteTicket}>Delete</button>
            </div>
        })
    }


    return <div>
        {data &&
            <div class="box">
                <button class="button is-danger" onClick={handleToDeleteAllTickets} >Delete All Tickets</button>
                <button className="button is-success" onClick={() => addTicket()}>Add Ticket</button>
            </div>}
        {ticketOkDeleted &&
            <Toast error={ticketOkDeleted} toastType="is-danger" />}
        {noTicketsFound &&
            <span>
                <div class="box">No Tickets Found</div>
                <button className="button is-success" onClick={() => addTicket()}>Add Ticket</button>
            </span>}
        {ticketsProccesed}
    </div>

}


export default MyTickets