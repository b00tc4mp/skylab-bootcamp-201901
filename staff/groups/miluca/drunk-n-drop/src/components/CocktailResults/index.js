import { BrowserRouter as Router, Route, Link, Prompt, Switch, withRouter } from "react-router-dom";
import React, { Component } from 'react'
import logic from '../../logic'
import Search from '../search'
import Results from '../Results'
import Detail from '../Detail'
//components

import Navbar from "../Navbar";
import SearchTitle from '../SearchTitle'

class CocktailResults extends Component {

  state = {errorSearch: null , results: [] , query:'',details:[],  islogedIn:false }

  componentDidMount(){
    this.handleSearch(this.state.query)
  }
  
  handleSearch = (query) => {
    
     return logic.cocktailbyName(query)
     .then(response => {
       this.setState({query:`Search: ${query}`})
       this.setState({results : response})
     })
     .catch(response =>{
        this.setState({errorSearch :response.message})
        this.setState({query:`${response.message}`})
     })

  }

  loginControl=()=>{
    this.setState({islogedIn:true})
  }
  
  handleDetail = (id) =>{
  
    return logic.cocktailDetail(id)
    .then(response =>{
      this.setState({details : response, visible :true})
      
    })
  }
  
  toggleFavorites = (id) => {

    if(this.state.islogedIn)logic.toggleFavoriteCocktail(id)

  }



  handleCategorySearch = (query) => {

/*     logic.searchByCategory(query).then(res => {
      console.log(res)
    }) */
    return logic.searchByCategory(query)
    .then(response => {
      this.setState({query:`Category: ${query}`})
      console.log(response)
      this.setState({results : response})
    })
    .catch(response =>{
       this.setState({errorSearch :response.message})
       this.setState({query:`${response.message}`})
    })
 }

  
  render() {
    const {
      state: { errorSearch, results ,details,visible},
      handleSearch,
      handleFavorites,
      handleDetail,
      handleCategorySearch,
      toggleFavorites
      
    } = this


    return <Router>
        
        {visible &&<Detail detail={details} favClick={toggleFavorites}/>}
        <Navbar categorySearch={handleCategorySearch}/> 
        {!visible&&<Search onSearch={handleSearch} error={errorSearch}/>}
        {!visible&&<SearchTitle query={this.state.query} error={this.state.error}/>}
        {!visible&&<Results items={results} onFavorites={handleFavorites} onDetail={handleDetail} />}
{/*         <Favorites favs={favoriteList} giveFav={returnFavorites}/>
        <button>Login</button>
        <button>register</button>
        <Populars pops={populars} givePop={handlePpopular}  onFavorites={handleFavorites} onDetail={handleDetail}/>
        <Favorites favs={favoriteList} giveFav={returnFavorites} onDetail={handleDetail}/>
        <Register onRegister={handleRegister} error={error} />
        <Login onLogin={handleLogin} error={error} /> */}
       
    </Router>

  }
}




export default withRouter(CocktailResults)
