import React, { Fragment, useState, useEffect } from 'react'
import './index.sass'
import logic from '../../logic'

export default function JoinEvent ({ reservationName, setJoinEvent, selectedEvent, phone, userInEvent, setEventInfo }) {
    const [join, setJoin] = useState()

    useEffect(() => {
        logic.retrieveUser()
            .then(({user}) => {
                if (userInEvent.includes(user.id)) setJoin(false)
                else setJoin(true)
            })
    }, [])
    
    function handleJoinEvent () {
        logic.joinEvent(selectedEvent)
            .then(event => {
                //if (event) set feedback to event joined!
                setJoinEvent(false)
            })
    }

    return (
        <Fragment>
            <div className='join-event' onClick={e => {e.preventDefault(); setJoinEvent(false)}}>
                <div className='join-event__panel'>
                    {join ? <div className='join-event__join'>
                        <h2 className='join-event__title'>Join event</h2>
                        <p align='center' className='join-event__how'>If you wish to join this event, please call the restaurant where the event is held and add one person to the reservation.</p>
                        <p align='center' className='join-event__how'>Do this before joining the event to make sure there is enough place for one more person.</p>
                        <div className='join-event__div'>
                            <p>Reservation name: </p>
                            <p className='join-event__name'>{reservationName}</p>
                        </div>
                        <div className='join-event__div2'>
                            <p>Restaurant phone number: </p>
                            <a className='join-event__phone' href={phone}>{phone}</a>
                        </div>
                    </div> : <div className='join-event__join'>
                        <h2 className='join-event__title'>Leave event</h2>
                        <p align='center' className='join-event__how'>If you wish to leave this event, please call the restaurant and update the reservation</p>
                        <div className='join-event__div'>
                            <p>Reservation name: </p>
                            <p className='join-event__name'>{reservationName}</p>
                        </div>
                        <div className='join-event__div2'>
                            <p>Restaurant phone number: </p>
                            <a className='join-event__phone' href={phone}>{phone}</a>
                        </div>
                    </div>}
                    <div className='join-event__buttons'>
                        <button className='join-event__buttons-cancel' onClick={e => {e.preventDefault(); setJoinEvent(false)}}>cancel</button>
                        {join ? <button className='join-event__buttons-confirmation' onClick={handleJoinEvent}>join event</button> : <button className='join-event__buttons-confirmation' onClick={handleJoinEvent}>leave event</button>}
                    </div>  
                </div>  
            </div>   
        </Fragment>
    )
}