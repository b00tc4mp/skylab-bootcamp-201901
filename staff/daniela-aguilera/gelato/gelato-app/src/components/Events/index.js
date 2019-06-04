import React, { useState, useEffect } from 'react'
import logic from '../../logic'

export function Events () {
  const [events, setEvents] = useState([])

  //   useEffect(async function () {
  //     const events = await logic.retrieveEvents()
  //     setEvents(events)
  //   }, [])

  return (
    <div>
      {
        events.map(function (e) {
          return (
            <h1>{e.type}</h1>
          )
        })
      }
    </div>
  )
}
