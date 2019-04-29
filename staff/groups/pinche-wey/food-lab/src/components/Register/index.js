import React, { Component } from "react";


function Register ({onRegister, error}) {
  // ahora register no tiene estado
  // xq sacamos los campos/inputs desde el valor del input cuando se hace el submit

  function handleSubmit (event) {
    event.preventDefault();

    // const name = event.target.name.value
    // const surname = event.target.surname.value
    // const age = event.target.age.value
    // const email = event.target.email.value
    // const password = event.target.password.value
    // const passwordConfirm = event.target.passwordConfirm.value


    const {
        name: { value: name },
        surname: { value: surname },
        email: { value: email },
        confirmEmail: { value: confirmEmail},
        password: { value: password },
        confirmPassword: { value: confirmPassword},
        confirmAge: { checked: confirmAge },
        confirmConditions: { checked: confirmConditions }
    } = event.target

    // para sacar el valor booleano del checkbox => event.target.confirmAge.checkbox

    onRegister(name, surname, email, confirmEmail, password, confirmPassword, confirmAge, confirmConditions)
  };

  
    return (
      <section className="register">
        <h2>Register</h2>
        <form onSubmit={ handleSubmit }>
          <input type="text" name="name" placeholder="name" required />
          <input type="text" name="surname" placeholder="surname" required />
          <input type="text" name="email" placeholder="email" required />
          <input type="text" name="confirmEmail" placeholder="email confirmation" required />
          <input type="password" name="password" placeholder="password" required />
          <input type="password" name="confirmPassword" placeholder="password confirmation" required />
          <label>Confirm age: <input type="checkbox" name="confirmAge" required /></label>
          <label>Confirm conditions: <input type="checkbox" name="confirmConditions" required /></label>

          <button>Register</button>

          <span>{error}</span>
        </form>
      </section>
    );

}

export default Register;
