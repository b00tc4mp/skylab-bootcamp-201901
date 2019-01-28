class App extends React.Component {

  handleLogin = (email, password) => {
    
    try {
      logic.login(email, password, user => {
        console.log(user);

        // this.setState({ loginFeedback: '' })
      });
    } catch ({ message }) {
      // this.setState({ loginFeedback: message })
      console.error(message)
    }
  };

  render() {
    const { handleLogin } = this;

    return <Login onLogin={handleLogin} />;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
