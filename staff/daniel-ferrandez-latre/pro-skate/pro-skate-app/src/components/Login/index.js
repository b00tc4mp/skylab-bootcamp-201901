import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import logic from "../../logic";

function Login({ history }) {
  const [messageError, setErrorMessage] = useState(null);

  if (logic.isUserLoggedIn) history.push("/home");

  async function handleSubmit(event) {
    event.preventDefault();
    const {
      email: { value: email },
      password: { value: password }
    } = event.target;
    try {
      debugger;
      await logic.loginUser(email, password);
      history.push("/");
    } catch (error) {
      setErrorMessage(error.message);
    }
    console.log(messageError);
  }

  return (
    <body>
      <section className='container'>
        <section className='columns'>
          <section className='column is-half' />
          <section className='column is-half'>
            <form onSubmit={handleSubmit}>
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

              <p className='control'>
                <button className='button is-info is-outlined'>Register</button>
              </p>

              {messageError && (
                <div className='message-body'>
                  <p>{messageError}</p>
                </div>
              )}
            </form>
          </section>
        </section>
      </section>
    </body>
  );
}

export default withRouter(Login);
