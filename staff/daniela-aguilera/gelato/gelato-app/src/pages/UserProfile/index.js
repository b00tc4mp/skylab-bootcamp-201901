import React, { useEffect, useState, Fragment } from 'react'
import cx from 'classnames'

import logic from '../../logic'

export function UserProfile () {
  const [user, setUserName] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(function () {
    async function retrieveUser () {
      const userDetails = await logic.retrieveUserBy()

      console.log(userDetails)
      setUserName(userDetails)
    }

    retrieveUser()
  }, [])

  async function _handleUpdateSubmit (event) {
    event.preventDefault()
    setLoading(true)
    const {
      name: { value: name },
      surname: { value: surname },
      email: { value: email },
      password: { value: password }
    } = event.target

    const response = await logic.updateUser({ name, surname, email, password })
    setLoading(false)

    console.log(response)
  }

  async function handleDeleteSubmit (event) {
    await logic.deleteUser()
  }

  const buttonClassName = cx('button is-primary', {
    'is-loading': loading
  })

  return (
    <Fragment>
      <div>
        <h1><strong>Update your profile, {user.name}</strong></h1>

        <form onSubmit={_handleUpdateSubmit}>
          <div className='field'>
            <label className='label'>Name</label>
            <div className='control'>
              <input className='input' name='name' type='text' placeholder='e.g Daniela' />
            </div>
          </div>

          <div className='field'>
            <label className='label'>Surname</label>
            <div className='control'>
              <input className='input' name='surname' type='text' placeholder='e.g Aguilera' />
            </div>
          </div>

          <div className='field'>
            <label className='label'>Email</label>
            <div className='control'>
              <input className='input' name='email' type='email' placeholder='e.g. daniela@gmail.com' />
            </div>
          </div>

          <div className='field'>
            <label className='label'>Password</label>
            <div className='control'>
              <input className='input' name='password' type='password' placeholder='Password' />
            </div>
          </div>
          <button className={buttonClassName}>Update</button>
        </form>
      </div>
      <section>
        <p>You can also delete your user, but we will be very sad</p>
        <button onClick={handleDeleteSubmit}>Delete my profile</button>
      </section>
    </Fragment>
  )
}
