import React from 'react'
import { EventsForm } from '../../components/EventsForm'
import { Redirect } from 'react-router-dom'
import logic from '../../logic'

export function StoreCreateEvent () {
  if (logic.isUserLoggedIn && logic.isUserAdmin) {
    return (
      <div>
        <EventsForm />
      </div>
    )
  } else {
    return <Redirect to='/' />
  }
}
