import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import logic from "../../logic/index";

function Login({ history }) {
  const [messageError, setErrorMessage] = useState(null);

  if (logic.isUserLoggedIn) history.push("/");

  async function handleSubmit(event) {
    event.preventDefault();
    const {
      email: { value: email },
      password: { value: password }
    } = event.target;
    try {
      await logic.loginUser(email, password);
      history.push("/");
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <body>
      <section className='container'>
        <section className='columns'>
          <section className='column'>
            <form onSubmit={handleSubmit}>
              <div className='field'>
                <label className='label is-size-5 is-radiusless'>Email</label>
                <div className='control'>
                  <input className='input is-medium is-radiusless' name='email' type='email' placeholder='email' />
                </div>
              </div>

              <div className='field'>
                <label className='label is-size-5'>Password</label>
                <div className='control'>
                  <input className='input is-medium is-radiusless' name='password' type='password' placeholder='password' />
                </div>
              </div>

              <p className='control'>
                <button className='button is-danger is-info is-outlined is-size-8 is-radiusless is-fullwidth'>Login</button>
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
