class Register extends React.Component {
  state = {
    name: "",
    surname: "",
    email: "",
    password: "",
    passwordConfirm: ""
  };

  handleNameInput = event => {
    this.setState({ name: event.target.value });
  };

  handleSurnameInput = event => {
    this.setState({ surname: event.target.value });
  };

  handleEmailInput = event => {
    this.setState({ email: event.target.value });
  };

  handlePasswordInput = event => {
    this.setState({ password: event.target.value });
  };

  handlePasswordConfirmInput = event => {
    this.setState({ passwordConfirm: event.target.value });
  };

  handleRegisterSubmit = event => {
    event.preventDefault();

    const {
      state: { name, surname, email, password, passwordConfirm },
      props: { onRegister }
    } = this;

    onRegister(name, surname, email, password, passwordConfirm);
  };

  handleClickLoginButton = event => {
    const {
        props: { onClickLoginButton }
    } = this;
    onClickLoginButton();
  }

  render() {
    const {
      handleClickLoginButton,
      handleRegisterSubmit,
      handleNameInput,
      handleSurnameInput,
      handleEmailInput,
      handlePasswordInput,
      handlePasswordConfirmInput, 
      props: {feedback}
    } = this;
    
    return (
      <section className="login">
        <div className="login__content">
          <h3 className="login__title">
            Regístrate con tu dirección de correo electrónico
          </h3>
          <form onSubmit={handleRegisterSubmit} className="login__form">
            <div className="login__row">
              <label htmlFor="name" className="login__label">
                Nombre
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Nombre"
                onChange={handleNameInput}
                className="login__input"
              />
            </div>
            <div className="login__row">
              <label htmlFor="surname" className="login__label">
                Apellidos
              </label>
              <input
                type="text"
                name="surname"
                id="surname"
                placeholder="Apellidos"
                onChange={handleSurnameInput}
                className="login__input"
              />
            </div>
            <div className="login__row">
              <label htmlFor="email" className="login__label">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={handleEmailInput}
                className="login__input"
              />
            </div>
            <div className="login__row">
              <label htmlFor="password" className="login__label">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={handlePasswordInput}
                className="login__input"
              />
            </div>
            <div className="login__row">
              <label htmlFor="passwordConfirm" className="login__label">
                Password
              </label>
              <input
                type="password"
                name="passwordConfirm"
                id="passwordConfirm"
                placeholder="Confirmar password"
                onChange={handlePasswordConfirmInput}
                className="login__input"
              />
            </div>

            <button className="login__btn btn btn__green btn__block">
              Register
            </button>
          </form>
          <div className="divider" />
          <p className="login__register-text">
            ¿Ya tienes cuenta? <a href="#" onClick={handleClickLoginButton}>Entra</a>
          </p>
        </div>
        {feedback && (<Feedback message={feedback} />)}
      </section>
    );
  }
}
