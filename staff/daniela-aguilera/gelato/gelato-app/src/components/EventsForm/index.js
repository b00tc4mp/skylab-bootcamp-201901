import React, { useState } from 'react'
import logic from '../../logic'

export function EventsForm () {
  const [image, setImage] = useState([])

  async function _hadleSubmit (event) {
    event.preventDefault()
    const {
      title: { value: title },
      description: { value: description }
    } = event.target

    await logic.createEvent(title, description, image)
  }

  return (

    <form onSubmit={_hadleSubmit}>
      <div className='field'>
        <label className='label'>Title</label>
        <div className='control'>
          <input className='input' name='title' type='text' placeholder='Text input' />
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
}
