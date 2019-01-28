class Login extends React.Component {
  state = { email: "", password: "" };

  handleEmailInput = event => {
    this.setState({ email: event.target.value });
  };

  handlePasswordInput = event => {
    this.setState({ password: event.target.value });
  };

  handleLoginSubmit = event => {
    event.preventDefault();

    const {
      state: { email, password },
      props: { onLogin }
    } = this;

    onLogin(email, password);
  };

  render() {
    const { handleLoginSubmit, handleEmailInput, handlePasswordInput } = this;

    return (
      <section className="login">
        <div className="login__content">
          <h3 className="login__title">
            Para continuar, inicia sesión en Spotify.
          </h3>
          <form onSubmit={handleLoginSubmit} className="login__form">
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

            <button className="login__btn btn btn__green btn__block">
              Login
            </button>
          </form>
          <div className="divider"></div>
          <p className="login__register-text">
              No tienes cuenta? haz click <a href="#">aquí</a>
          </p>
        </div>
      </section>
    );
  }
}
