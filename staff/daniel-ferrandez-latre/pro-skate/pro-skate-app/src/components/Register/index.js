import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../../logic'

function Register ({history}) {
  const [messageError, setErrorMessage] = useState(null)

  if (logic.isUserLoggedIn) history.push('/home')


  async function handleSubmit (event) {
    event.preventDefault()
    const {
      name: { value: name },
      surname: { value: surname },
      email: { value: email },
      password: { value: password },
      age: { value: age }
    } = event.target
    try {
      debugger
      await logic.registerUser(name, surname, email, password, age)
      history.push('/login')
    } catch (error) {
      setErrorMessage(error.message)
    }
    console.log(messageError)
  }


  return (

    <body>
    <section className="container">
      <section className="columns">
        <section className="column is-half"></section>
        <section className="column is-half">
    <form onSubmit={handleSubmit}>

      <div className='field'>
        <label className='label'>Name</label>
        <div className='control'>
          <input className='input' name='name' type='text' placeholder='Name' />
        </div>
      </div>

      <div className='field'>
        <label className='label'>Surname</label>
        <div className='control'>
          <input className='input' name='surname' type='text' placeholder='Surname' />
        </div>
      </div>

      <div className='field'>
        <label className='label'>Email</label>
        <div className='control'>
          <input className='input' name='email' type='email' placeholder='email' />
        </div>
      </div>

      <div className='field'> 
        <label className='label'>Password</label>
        <div className='control'>
          <input className='input' name='password' type='password' placeholder='password' />
        </div>
      </div>
   
      <div className='field'> 
        <label className='label'>Age</label>
        <div className='control'>
          <input className='input' name='age' type='number' placeholder='age' />
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
    </section>
      </section>
    </section>
    </body>
  )
}

export default withRouter(Register)