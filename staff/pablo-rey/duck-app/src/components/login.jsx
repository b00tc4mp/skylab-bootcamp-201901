function Login({ literals, selectedLanguage, errorMessage, ...props }) {
  const handleLogin = e => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    props.onLogin(email, password);
  };

  return (
    <form onSubmit={handleLogin} className="login">
      <h2 className="login__title">
        {literals[selectedLanguage].title}
      </h2>

      {!!errorMessage && (
        <Feedback cssClass="register" errorMessage={errorMessage} />
      )}

      <ul className="login__inputs">
        <li>
          <input
            className="login__input input"
            type="text"
            name="email"
            placeholder={literals[selectedLanguage].email}
          />
        </li>
        <li>
          <input
            className="login__input input"
            type="password"
            name="password"
            placeholder={literals[selectedLanguage].password}
          />
        </li>
      </ul>

      <button className="btn login__button">
        {literals[selectedLanguage].title}
      </button>
    </form>
  );
}
