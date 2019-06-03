import React,{useState} from 'react';


function TicketDetail({processedTicket}){


    const ticket = processedTicket.map(item=>{
        return<div><p>{item.name}</p><p>{item.Euro}</p></div>
    })

    return <>
    
    <p>yes we did it</p>

        <div>
            {ticket}
        </div>
    
</>

}


export default TicketDetail