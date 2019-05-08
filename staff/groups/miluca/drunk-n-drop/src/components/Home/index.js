import Slider from "react-slick";
import React, { Component } from 'react'
import { Route, withRouter, Redirect, Switch } from 'react-router-dom'
import Landing from '../Landing'
import Populars from '../Populars'
import logic from '../../logic'
import './index.sass'
import Navbar from '../Navbar'
import Login from '../login'
import Search from '../search'
import Detail from '../Detail'
import CocktailResults from '../CocktailResults'
import Register from '../Register'
import Favorites from '../Favorites'




class Home extends Component {

  state = { home:true, populars: [], toggleLogin: false, islogedIn:false,error:null, defaultquery: null, register: false, visible: false, details: null ,showFav:null}

  handlePpopular = () => {

    return logic.popularCocktails()
      .then(response => {

        this.setState({ populars: response })

      })
  }

  componentWillMount(){
    this.setState({ islogedIn: logic.isUserLoggedIn})
  }

  handleLogout = () => {
    logic.logoutUser()
    this.setState({ islogedIn: false })
    this.handlePpopular()
  }


  toggleFavorites = (id) => {

    if(this.state.islogedIn)logic.toggleFavoriteCocktail(id)

  }

  returnFavorites = () => {

    return logic.retriveFavorites()
      .then(response => {
     
        this.setState({ populars: response })
      })
      .catch(response =>{
        
        alert(response)
      })

  }

  goToSearch = () => {
    this.props.history.push("/Home")
  }

  onRegister = (name, username, password) => {
    this.setState({ register: true })
      try {
        logic.registerUser(name, username, password)
          .then(() =>
            this.setState({ error: null ,register: false  })
          )
  
      } catch ({ message }) {
        this.setState({ error: message })
      }
    
  
  }

  handleDetail = (id) => {

    return logic.cocktailDetail(id)
      .then(response => {
        this.setState({ details: response, visible: true })

      })
  }

  handleHome = (home) =>{
    this.setState({ visible: home})
  }

  LoginVisibleHandler = () => {
    this.setState({ toggleLogin: !this.state.toggleLogin })

  }
  componentDidMount = () => {
    this.handlePpopular()
  }

  handleLogin = (username, password) => {
    try {
      logic.loginUser(username, password)
        .then(() =>
          logic.retrieveUser()

        )
        .then(({ name }) => {
          this.setState({ name, error: null })
          this.setState({ toggleLogin: !this.state.toggleLogin })
          this.setState({ islogedIn : true})
        })
        .catch(error =>
          this.setState({ error: error.message })
        )
    } catch ({ message }) {
      alert(message)
    }
  }


  render() {
    const {
      state: { populars, toggleLogin, islogedIn, defaultquery, register, visible, details,showFav,error },
      handleLogin,
      LoginVisibleHandler,
      onRegister,
      handleDetail,
     toggleFavorites,
     handleLogout,
     returnFavorites
    } = this

    return <>
      {showFav && islogedIn && <Favorites/>}
      {visible &&<Detail detail={details} favClick={toggleFavorites} />}
      {defaultquery && !visible && <CocktailResults default={defaultquery} loginControl={islogedIn}/>}
      {toggleLogin && <Login togglelogin={LoginVisibleHandler} onLogin={handleLogin} />}
      <Navbar isHome={this.state.home}/>
      {!register && !visible && <Landing />}
      {register && <Register onRegister={onRegister} error={error}/>}
      
      {!islogedIn && <nav class="level is-mobile bar">
        <p class="level-item has-text-centered">
          <a onClick={() => onRegister()} class="link is-info  regist-login">Register</a>
        </p>
        <p class="level-item has-text-centered">
          <a onClick={() => { if (!islogedIn) this.LoginVisibleHandler() }} class="link is-info  regist-login">
            Login
                    </a>
        </p>
        <p class="level-item has-text-centered">
          <a onClick={() => this.goToSearch()} class="link is-info  regist-login">
            Search
        </a>
        </p>
      </nav>}
      {islogedIn && <nav class="level is-mobile bar">
      <p class="level-item has-text-centered">
        <a onClick={() => returnFavorites()} class="link is-info  regist-login">Favorites</a>
      </p>
      <p class="level-item has-text-centered">
        <a onClick={() => handleLogout()} class="link is-info  regist-login">
          Logout
        </a>
      </p>
      <p class="level-item has-text-centered">
        <a onClick={() => this.goToSearch()} class="link is-info  regist-login">
          Search
      </a>
      </p>
      </nav>}
      {!register && !visible && <Populars pops={populars} onDetail={handleDetail} />}

      

    </>
  }
}


export default withRouter(Home)