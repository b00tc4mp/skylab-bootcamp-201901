import React, { useState, useEffect } from 'react'
import logic from '../../logic'

export function Events () {
  const [events, setEvents] = useState([])
  const [deletedEvent, setDeletedEvent] = useState(null)
  const [disableButton, setDisableButton] = useState(false)

  useEffect(function () {
    async function getEvents () {
      const events = await logic.retrieveEvents()
      setEvents(events)
    }

    getEvents()
  }, [deletedEvent])

  const renderDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(date).toLocaleDateString('en-EN', options)
  }

  const deleteEvent = async (eventId) => {
    await logic.deleteEvent(eventId)
    setDeletedEvent(eventId)
    setDisableButton(false)
  }

  return (
    <div>
      <h1 className='title-event'>Don't Miss Our Upcoming <span className='getato-event'>Getato</span> Events! </h1>
      {
        events.map(function (e) {
          return (
            <article className='g-Event' key={e.id}>
              <figure className='image is-128x128'>
                <img alt={e.title} className='is-rounded' src={e.image} />
              </figure>
              <div>
                <h1 className='subtitle is-marginless'>{e.title}</h1>
                <strong>{renderDate(e.date)}</strong>
                <p>{e.description}</p>
              </div>
              {logic.__userIsAdmin__ && !disableButton && <button className='button is-primary' onClick={(event) => {
                event.preventDefault()
                setDisableButton(true)
                deleteEvent(e.id)
              }}>delete event</button>}
            </article>
          )
        })
      }
    </div>
  )
}
