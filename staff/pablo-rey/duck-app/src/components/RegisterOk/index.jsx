import React from 'react'

function RegisterOk({ onNavLogin }) {
  function handleClick(e) {
    e.preventDefault();
    onNavLogin();
  }

  return (
    <section className="registerSuccessful">
      User successfully registered, you can proceed to{" "}
      <a href="" onClick={handleClick}>
        Login
      </a>
      .
    </section>
  );
}

export default RegisterOk;