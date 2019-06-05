import React, { useEffect, useState, Fragment } from 'react'
import cx from 'classnames'

import logic from '../../logic'

export function UserProfile ({ history }) {
  const [user, setUserName] = useState([])
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState({ type: undefined, msg: undefined })

  useEffect(function () {
    async function retrieveUser () {
      const userDetails = await logic.retrieveUserBy()
      setUserName(userDetails)
    }

    if (loading === false) {
      retrieveUser()
    }
  }, [loading])

  async function _handleUpdateSubmit (event) {
    event.preventDefault()

    const {
      name: { value: name },
      surname: { value: surname },
      email: { value: email },
      password: { value: password }
    } = event.target

    try {
      setLoading(true)
      await logic.updateUser({ name, surname, email, password })
      setNotification({ type: 'success', msg: "You're profile has been updated!" })
    } catch (e) {
      setNotification({ type: 'danger', msg: 'Something went wrong updating your profile' })
    }
    setLoading(false)
  }

  async function handleDeleteSubmit (event) {
    await logic.deleteUser()
    // this will redirect to the
    history.replace('/')
  }

  const buttonClassName = cx('button is-primary', {
    'is-loading': loading
  })

  const notificationClassName = cx('message', {
    'is-danger': notification.type === 'danger',
    'is-success': notification.type === 'success'
  })

  return (
    <Fragment>
      <div>
        <h1><strong>Update your profile, {user.name}</strong></h1>
        {
          notification.msg && <article className={notificationClassName}>
            <div className='message-body'>
              {notification.msg}
            </div>
          </article>
        }
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
        <p>You can also delete your user, but we will be very sad</p> <i className='far fa-frown' />
        <button onClick={handleDeleteSubmit}>Delete my profile</button>
      </section>
    </Fragment>
  )
}
