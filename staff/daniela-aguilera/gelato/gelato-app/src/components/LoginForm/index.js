import React from 'react'

export function LoginForm ({ onLogin }) {
  function _handleSubmit (event) {
    event.preventDefault()

    const {
      email: { value: email },
      password: { value: password }
    } = event.target

    onLogin(email, password)
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
        <p className='control has-icons-left'>
          <input className='input' name='password' type='password' placeholder='Password' />
          <span className='icon is-small is-left'>
            <i className='fas fa-lock' />
          </span>
        </p>
      </div>
      <div className='field'>
        <p className='control'>
          <button className='button is-success'>
            Login
          </button>
        </p>
      </div>
    </form>
  )
}
