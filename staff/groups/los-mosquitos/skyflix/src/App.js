import React, {Component} from 'react'
import i18n from './common/i18n'
import LanguageSelector from './components/language-selector'
import Register from './components/Register'
import logo from './logo.svg'
import './App.css'


class App extends Component {

  state = { lang: i18n.language }

  handleLanguageChange = lang => this.setState({ lang: i18n.language = lang }) 

  handleRegister = (fullname, email, password, confirmPassword) => {
    //Todo
  }


  render() {
   
    return <>
      <LanguageSelector lang={this.state.lang} onLanguageChange={this.handleLanguageChange}/>
      <Register lang={this.state.lang}/>
    </>
  }    

}



export default App;
