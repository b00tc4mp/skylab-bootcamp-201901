import React, { Component } from "react";
import './index.sass'


function Register({ onRegister, error }) {

  function handleSubmit(event) {
    event.preventDefault();

    const {
      name: { value: name },
      surname: { value: surname },
      email: { value: email },
      confirmEmail: { value: confirmEmail },
      password: { value: password },
      confirmPassword: { value: confirmPassword },
      confirmAge: { checked: confirmAge },
      confirmConditions: { checked: confirmConditions }
    } = event.target

    onRegister(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)
  };


  return (
    <section className="register">
      <div className='register__containter'>
      
        <h2 className='register__title'>Register</h2>
        <form className='register__form' onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="name" required />
          <input type="text" name="surname" placeholder="surname" required />
          <input type="text" name="email" placeholder="email" required />
          <input type="text" name="confirmEmail" placeholder="email confirmation" required />
          <input type="password" name="password" placeholder="password" required />
          <input type="password" name="confirmPassword" placeholder="password confirmation" required />
          <label>Confirm age: <input type="checkbox" name="confirmAge" required /></label>
          <label>Confirm conditions: <input type="checkbox" name="confirmConditions" required /></label>

          <button className='register__form-button'>Register</button>

          {error && <span className='register__form-error'>{error}</span>}
        </form>
      </div>
    </section>
  );

}

export default Register;
