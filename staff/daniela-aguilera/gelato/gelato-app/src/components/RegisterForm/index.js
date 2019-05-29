import React from 'react'

export function RegisterForm ({ onRegister }) {
  function _handleSubmit (event) {
    event.preventDefault()

    const {
      name: { value: name },
      surname: { value: surname },
      email: { value: email },
      password: { value: password }
    } = event.target

    onRegister(name, surname, email, password)
  }

  return (
    <form disabled onSubmit={_handleSubmit}>

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
        <button className='button is-success'>
                Register
        </button>
      </p>
    </form>
  )
}
