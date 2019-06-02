import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import logic from '../../logic/index'

export function LoginForm ({ onLogin }) {
  const [messageError, setMessageError] = useState(null)

  async function _handleSubmit (event) {
    event.preventDefault()
    setMessageError(null)

    const {
      email: { value: email },
      password: { value: password }
    } = event.target

    try {
      await logic.authenticateUser(email, password)
      window.location.href = '/create-your-order'
    } catch (error) {
      setMessageError(error.message)
    }
  }

  console.log(logic.isUserAdmin)
  if (logic.isUserLoggedIn) {
    return <Redirect to='/' />
  }

  return (
    <form onSubmit={_handleSubmit}>
      <div className='field'>
        <p className='control has-icons-left has-icons-right'>
          <input className='input' name='email' type='email' placeholder='Email' />
          <span className='icon is-small is-left'>
            <i className='fas fa-envelope' />
          </span>
          <span className='icon is-small is-right'>
            <i className='fas fa-check' />
          </span>
        </p>
      </div>
      <div className='field'>
        <p className='control has-icons-left '>
          <input className='input' name='password' type='password' placeholder='Password' />
          <span className='icon is-small is-left'>
            <i className='fas fa-lock' />
          </span>
        </p>
      </div>
      <div className='field'>
        <p className='control'>
          <button className='button is-info is-outlined'>
            Login
          </button>
        </p>
      </div>
      {
        messageError && <div className='message-body'>
          <p>{messageError}</p>
        </div>
      }
    </form>
  )
}
