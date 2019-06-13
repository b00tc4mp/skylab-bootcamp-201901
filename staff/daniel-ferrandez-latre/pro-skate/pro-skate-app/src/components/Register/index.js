import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../../logic/index'

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
      <section className="columns is-one-is-offset-one-fifth-touch">
      
        <section className="column">
    <form onSubmit={handleSubmit}>

      <div className='field'>
        <label className='label is-size-5 is-radiusless'>Name</label>
        <div className='control'>
          <input className='input is-medium is-radiusless' name='name' type='text' placeholder='Name' />
        </div>
      </div>

      <div className='field'>
        <label className='label is-size-5 is-radiusless'>Surname</label>
        <div className='control'>
          <input className='input is-medium is-radiusless' name='surname' type='text' placeholder='Surname' />
        </div>
      </div>

      <div className='field'>
        <label className='label is-size-5 is-radiusless'>Email</label>
        <div className='control'>
          <input className='input is-medium is-radiusless' name='email' type='email' placeholder='email' />
        </div>
      </div>

      <div className='field'> 
        <label className='label is-size-5 is-radiusless'>Password</label>
        <div className='control'>
          <input className='input is-medium is-radiusless' name='password' type='password' placeholder='password' />
        </div>
      </div>
   
      <div className='field'> 
        <label className='label is-size-5 is-radiusless'>Age</label>
        <div className='control'>
          <input className='input is-medium is-radiusless' name='age' type='number' placeholder='age' />
        </div>
      </div>

      <p className='control'>
        <button className='button is-danger is-info is-outlined is-size-8 is-radiusless is-fullwidth'>
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