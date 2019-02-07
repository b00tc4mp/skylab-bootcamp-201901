import React from 'react'
import Nav from '../Nav'
import InputsFridge from '../InputsFridge'
import EditProfile from '../EditProfile'
import Results from '../Results'
import Detail from '../Detail'
import logic from '../../logic'
import { withRouter, Route, Redirect } from 'react-router-dom'
import './index.sass'

import FeedbackSearch from '../FeedbackSearch'
import Favourites from '../Favourites'



class Home extends React.Component{

    state={recipes: null,  
        searchFeedback: null, 
        recipe: null, 
        queryList: null, 
        ingredientsList: null, 
        sincronSearchFeedback: null, 
        favouritesFeedback: null,
        favourites: null,
        editProfileFeedback: null}

    handleOnSearch= (query, calories, diet, health,) => {
        let queryList=query.split('+') //To get query in array
        try {
            logic.search(query, calories, diet, health)
                .then(recipes=> {
                    this.setState({recipes, queryList}, ()=> this.props.history.push('/home/recipes'))        
                })
                .catch(({message})=> {
                    this.setState({searchFeedback:message}, ()=> this.props.history.push('/home/feedback'))
                })

        }catch(error){
            this.setState({ sincronSearchFeedback: error.message })
               
        }
    }

    handleLogout= () => {
        logic.logout()
       this.props.history.push('/')
    }

    handleEditProfileButton = () => {
        this.props.history.push('/home/profile')
    }

    handleCancelButton = () => {
        this.props.history.push('/home')
    }

    handleEditProfile = data =>{
        try {
            logic.update(sessionStorage.getItem('user-id'), sessionStorage.getItem('user-api-token') ,data)
                .then (() => logic.retrieve(sessionStorage.getItem('user-id'), sessionStorage.getItem('user-api-token')))
                .then (user => {
                    this.props.history.push(`/home`)
                })
                .catch(error => this.setState({ editProfileFeedback: error.message }))

        } catch (error) {
            this.setState({ editProfileFeedback: error.message })
        }

    }

    handleGoBackSearch=()=>{
        this.props.history.push('/home')
        this.setState({recipes:null, searchFeedback: null})
    }

    handleEditInputs=()=>{
        this.props.history.push('/home')
        this.setState({recipes: null})
    }

    handleOnDetail = recipeUri => {

        const {state: {recipes}} =this
     
        try{
            let recipe=logic.detail(recipeUri, recipes)
     
            let ingredientsList=logic.generateLists(recipe.ingredientLines, this.state.queryList)
            this.setState({recipe, ingredientsList})
            this.props.history.push('/home/detail')

        }catch(error){
            console.error(error)
        }
    }

    handleBackToRecipes = () =>{
        this.prop.history.push('/home/recipes')
    }

    handleGoBackHome = () => {
        this.props.history.push('/home')
    }

    handleOnFavourites = recipe => {
        let id = sessionStorage.getItem('user-id')
        let token = sessionStorage.getItem('user-api-token')
        logic.retrieve(id, token)
            .then(() => logic.toggleFavourite(id, token, recipe))
            .then(() => this.setState({ favourites: JSON.parse(sessionStorage.getItem('user')).favourites}))
    }

    handleGoToFavourites = () => {
        this.setState({ favourites: JSON.parse(sessionStorage.getItem('user')).favourites}, ()=> this.props.history.push('/home/favourites'))
    }

    render(){

        const {state:{ recipes, searchFeedback, recipe, ingredientsList, favourites, favouritesFeedback, sincronSearchFeedback}} =  this
        
        return <main className="home">
                <Nav className='fixed' user={this.props.user} onLogout={this.handleLogout} goToFavourites={this.handleGoToFavourites} editProfile={this.handleEditProfileButton} results={this.state.recipes} editInputs = {this.handleEditInputs} />
                {<Route exact path="/home" render={() =>  logic.userLoggedIn ? <InputsFridge onSearch={this.handleOnSearch} sincronSearchFeedback={sincronSearchFeedback}/> : <Redirect to="/" />} />}
                {<Route path="/home/profile" render={() =>  logic.userLoggedIn ? <EditProfile onEditProfile={this.handleEditProfile} cancelButton={this.handleCancelButton} feedback={this.props.editProfileFeedback}/> : <Redirect to="/" />} />}
                {<Route exact path="/home/recipes" render={() => (logic.userLoggedIn&& recipes) ? <Results recipes={recipes} onFavourite={this.handleOnFavourites} onDetail ={this.handleOnDetail}/> : <Redirect to = "/" />} />}
                {<Route exact path="/home/detail" render={() => (logic.userLoggedIn && recipe)? <Detail recipe={recipe} ingredients={ingredientsList} backToRecipes={this.handleBackToRecipes} /> : <Redirect to = "/home/search" />} />}
                {<Route path="/home/feedback" render={()=> (logic.userLoggedIn && searchFeedback)?<FeedbackSearch goBackSearch={this.handleGoBackSearch} message={searchFeedback}/>:<Redirect to="/home" /> }/>}
                {<Route path="/home/favourites" render={() => (logic.userLoggedIn && favourites)? <Favourites favourites={favourites} goBackHome={this.handleGoBackHome} onFavouriteTrue={this.handleOnFavourites} message={favouritesFeedback}/>:<Redirect to="/home"/> }/>}

            </main>
    }

}

export default withRouter(Home)