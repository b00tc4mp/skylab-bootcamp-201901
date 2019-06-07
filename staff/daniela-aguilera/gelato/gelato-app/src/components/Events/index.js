import React, { useState, useEffect } from 'react'
import logic from '../../logic'

export function Events () {
  const [events, setEvents] = useState([])

  useEffect(function () {
    async function getEvents () {
      const events = await logic.retrieveEvents()
      console.log(events)
      setEvents(events)
    }

    getEvents()
  }, [])

  const renderDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(date).toLocaleDateString('en-EN', options)
  }

  return (
    <div>
      <h1 className='title'>Events</h1>
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
            </article>
          )
        })
      }
    </div>
  )
}
