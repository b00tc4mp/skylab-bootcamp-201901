import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import logic from '../../logic'

export function RegisterForm ({ onRegister }) {
  const [messageError, setErrorMessage] = useState(null)

  async function _handleSubmit (event) {
    event.preventDefault()

    const {
      name: { value: name },
      surname: { value: surname },
      email: { value: email },
      password: { value: password }
    } = event.target
    try {
      await logic.registerUser(name, surname, email, password)
      window.location.href = '/'
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  if (logic.isUserLoggedIn) {
    return <Redirect to='/' />
  }

  return (
    <form onSubmit={_handleSubmit}>

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

      <p className='control'>
        <button className='button is-info is-outlined'>
          Register
        </button>
      </p>
      {
        messageError && <div className='message-body'>
          <p>{messageError}</p>
        </div>
      }
    </form>
  )
}
