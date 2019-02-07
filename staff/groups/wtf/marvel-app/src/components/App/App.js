import React, { Component } from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import Landing from '../Landing'
import Home from '../Home'
import Footer from '../Footer'
import logic from '../Logic'
import LanguageSelector from '../LanguageSelector'
import i18n from '../../i18n'



class App extends Component {

  state = {selectedLanguage: 'en'}

  handleLanguageSelected = event => {
    this.setState({
        selectedLanguage: event.target.value
    })
}

  handleLogOut = () => {
    logic.logout()
    this.props.history.push('/')
  }

  componentWillMount() {
    this.props.history.listen(() => {
    if(this.props.location.pathname === '/' && logic.userLoggedIn) this.props.history.push('/home/search')
    });
  }

  render() {
    const { handleLogOut, handleLanguageSelected, state:{selectedLanguage}}= this
    
    return<main>
        <LanguageSelector selectedLanguage={selectedLanguage} languages={['en', 'es']} onLanguageSelected={handleLanguageSelected} />
        <Route path='/' render={()=> <Landing login={i18n[selectedLanguage].login} register={i18n[selectedLanguage].register} welcome__title={i18n[selectedLanguage].welcome__title} welcome__subtitle={i18n[selectedLanguage].welcome__subtitle} goBack={i18n[selectedLanguage].goBack} email={i18n[selectedLanguage].email} password={i18n[selectedLanguage].password} name={i18n[selectedLanguage].name} surname={i18n[selectedLanguage].surname} confirmPassword={i18n[selectedLanguage].confirmPassword}   />}/>
        <Route path='/home/search' render={() => logic.userLoggedIn ? <Home onLogout={handleLogOut} home={i18n[selectedLanguage].home} favourites={i18n[selectedLanguage].favourites} youtube={i18n[selectedLanguage].youtube} logOut={i18n[selectedLanguage].logOut} searchBtn={i18n[selectedLanguage].searchBtn} searchInput={i18n[selectedLanguage].searchInput} topCharacters={i18n[selectedLanguage].topCharacters} topComics={i18n[selectedLanguage].topComics} favs__feedback={i18n[selectedLanguage].favs__feedback} favs__title={i18n[selectedLanguage].favs__title} seeComics={i18n[selectedLanguage].seeComics} moreInfo={i18n[selectedLanguage].moreInfo} price={i18n[selectedLanguage].price} characters={i18n[selectedLanguage].characters}/> : <Redirect to="/" />} />
        <Route path='/home/search' render={()=> <Footer/>}/>
      </main>  
  }
}

export default withRouter(App)
