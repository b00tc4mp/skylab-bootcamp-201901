import React, { Fragment, useState } from 'react'
import logic from '../../logic'
import { Loading } from '../Loading'

export function EventsForm () {
  const [image, setImage] = useState([])
  const [isEventInserted, setIsEventInserted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function _hadleSubmit (event) {
    event.preventDefault()
    const {
      title: { value: title },
      description: { value: description },
      date: { value: date }
    } = event.target

    setIsLoading(true)
    await logic.createEvent(title, description, date, image)
    setIsEventInserted(true)
    setIsLoading(false)
  }

  const renderForm = () => (
    <form onSubmit={_hadleSubmit}>
      <div className='field'>
        <label className='label'>Title</label>
        <div className='control'>
          <input className='input' name='title' type='text' placeholder='Text input' />
        </div>
      </div>
      <div className='field'>
        <label className='label'>Date</label>
        <div className='control'>
          <input className='input' type='date' name='date' placeholder='Date' />
        </div>
      </div>

      <div className='field'>
        <label className='label'>Image</label>
        <div className='control'>
          <input className='' name='image' type='file' onChange={e => setImage(e.target.files[0])} />
        </div>
      </div>

      <div className='field'>
        <label className='label'>Description</label>
        <div className='control'>
          <textarea className='textarea' name='description' placeholder='Textarea' />
        </div>
      </div>

      <div className='field is-grouped'>
        <div className='control'>
          <button className='button is-link'>Save</button>
        </div>
      </div>
    </form>
  )

  const renderEventInserted = () => (
    <Fragment>
      <div className='notification is-warning'>
      Event inserted!
      </div>
      <button className='button' onClick={() => setIsEventInserted(false)}>
        Insert another event
      </button>
    </Fragment>
  )

  return (
    <section className='g-Layout'>
      {isLoading && <Loading />}
      {isEventInserted && renderEventInserted()}
      {!isLoading && !isEventInserted && renderForm()}
    </section>
  )
}
