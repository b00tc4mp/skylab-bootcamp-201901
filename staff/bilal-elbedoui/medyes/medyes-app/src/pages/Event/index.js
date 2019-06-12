import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import styles from './index.css';
import logic from '../../logic'
import NavBar from '../../components/NavBar'


export function Event({ match }) {

    const [events, setEvents] = useState(null)
    const [response, setResponse]= useState(null)



    useEffect(function () {
        
        return (async function getEvents() {
            const { id } = match.params
            const _event = await logic.retrieveEvent(id)

            setEvents(_event)
            
        })()
    }, [])

    const handleSharePost = (event) => {
        debugger
        event.preventDefault()

        const { id } = match.params

        const { text:{ value: text }
        
        } = event.target

        return (async()=>{
            try{
                const {data: {message}} = await logic.publishComment(id,text)
                setResponse(message)
            }catch(error){
                return error
            }
        })()

}


if (!!events && logic.isUserLoggedIn) {
    return (
        <div className='body'>
            <header className='header'>
                <h3 className="brand"><NavBar /></h3>
            </header>
            <main class="wrapper">
                <div>
                    <h3>{events.title}</h3>
                </div>
                <div class="detail_image">
                    <img src={events.image} />
                </div>
                <div class="detail_content">
                    <p class="repesentant_name">{events.representant.fullname}</p>
                    <p class="repesentant_name">{events.representant.email}</p>
                </div>
                <div>
                    <time>{events.date}</time>
                    <p>{events.location.city},  {events.location.country}</p>
                    <p>{events.numberTicketsAvailable}</p>
                </div>
                <div class="content">
                    {events.description}
                </div>
            </main>
            <section className="publishPost">
                <form className="form" onSubmit={handleSharePost}> 
                    <textarea rows="4" cols="50" name="text">
                    </textarea >
                    <button>Make your question</button>
                </form>
            </section>
            {
                            !!response && <div className='message-body'>
                                <p>{response}</p>
                            </div>
                        }
            <section className="comments">
                {events && events.comments.length >= 1 && events.comments.map(e => {                    
                    return (
                        <div className="comment">
                            <p>{e.roleAuthor}, date: {e.date}</p>
                            <div>
                                {e.text}
                            </div>
                        </div>
                    )
                })
                }
            </section>
        </div>

    )

} else return null

}
