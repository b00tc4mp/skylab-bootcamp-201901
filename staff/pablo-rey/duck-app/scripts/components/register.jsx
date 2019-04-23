function Register ({literals, selectedLanguage, errorMessage, onRegister}) {
  function handleRegister (e) {
    e.preventDefault();

    const name = e.target.name.value;
    const surname = e.target.surname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    onRegister(name, surname, email, password);
  };

  return (
    <form onSubmit={handleRegister} className="register">
      <h2 className="register__title">
        {literals[selectedLanguage].title}
      </h2>

      {!!errorMessage && <Feedback cssClass="register" errorMessage={errorMessage} />}

      <ul className="register__inputs">
        <li>
          <input
            className="register__input input"
            type="text"
            name="name"
            placeholder={literals[selectedLanguage].name}
          />
        </li>
        <li>
          <input
            className="register__input input"
            type="text"
            name="surname"
            placeholder={literals[selectedLanguage].surname}
          />
        </li>
        <li>
          <input
            className="register__input input"
            type="text"
            name="email"
            placeholder={literals[selectedLanguage].email}
          />
        </li>
        <li>
          <input
            className="register__input input"
            type="password"
            name="password"
            placeholder={literals[selectedLanguage].password}
          />
        </li>
      </ul>

      <button className="btn register__button">
        {literals[selectedLanguage].title}
      </button>
    </form>
  );
};
