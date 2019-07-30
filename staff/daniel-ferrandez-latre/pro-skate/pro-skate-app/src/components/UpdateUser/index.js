import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../../logic/index'

function Update ({history}) {
  const [messageError, setErrorMessage] = useState(null)
  const [userBd, setUserBd] = useState(null)

  useEffect( () => {
    async function retrieveUserBd (){
      const retrieve = await logic.retrieveUser(logic.__userToken__)
      setUserBd(retrieve)
    }
    retrieveUserBd()
  }, []);


  async function handleSubmit (event) {
    event.preventDefault()
    const {
      name: { value: name },
      surname: { value: surname },
      email: { value: email },
      age: { value: age }
    } = event.target
    try {
      await logic.updateUser(logic.__userToken__, name, surname, email, age)
      history.push('/home')
    } catch (error) {
      setErrorMessage(error.message)
    }
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
          <input className='input' name='name' type='text' placeholder={userBd.name} />
        </div>
      </div>

      <div className='field'>
        <label className='label'>Surname</label>
        <div className='control'>
          <input className='input' name='surname' type='text' placeholder={userBd.surname} />
        </div>
      </div>

      <div className='field'>
        <label className='label'>Email</label>
        <div className='control'>
          <input className='input' name='email' type='email' placeholder={userBd.email} />
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
          <input className='input' name='age' type='number' placeholder={userBd.age} />
        </div>
      </div>

      <p className='control'>
        <button className='button is-info is-outlined'>
          Update
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

export default withRouter(Update)