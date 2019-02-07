import React from 'react'
import Nav from '../Nav'
import InputsFridge from '../InputsFridge'
import EditProfile from '../EditProfile'
import Results from '../Results'
import Detail from '../Detail'
import logic from '../../logic'
import { withRouter, Route, Redirect } from 'react-router-dom'
import './index.sass'
import Feedback from '../Feedback'


class Home extends React.Component{

    state={recipes: null,  searchFeedback: null, recipe: null, queryList: null, ingredientsList: null}

    handleOnSearch= (query, calories, diet, health,) => {
        let queryList=query.split('+') //To get query in array
        try {
            logic.search(query, calories, diet, health)
                .then(recipes=> {
                    this.setState({recipes, queryList}, ()=> this.props.history.push('/home/search'))        
                })
                .catch(({message})=> {
                    this.setState({searchFeedback:message}, ()=> this.props.history.push('/home/feedback'))
                    console.log(message)
                })

        }catch(error){
            console.error(error.message)
    
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
                .catch(({ message }) => this.setState({ registerFeedback: message }))

        } catch ({ message }) {
            this.setState({ registerFeedback: message })
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

    render(){
        const {state:{ recipes, searchFeedback, recipe, ingredientsList}} =  this
        
        return <main className="home">
                <Nav className='fixed' user={this.props.user} onLogout={this.handleLogout} editProfile={this.handleEditProfileButton} results={this.state.recipes} editInputs = {this.handleEditInputs} />
                {<Route exact path="/home" render={() =>  logic.userLoggedIn ? <InputsFridge onSearch={this.handleOnSearch}/> : <Redirect to="/" />} />}
                {<Route path="/home/profile" render={() =>  logic.userLoggedIn ? <EditProfile onEditProfile={this.handleEditProfile} cancelButton={this.handleCancelButton}/> : <Redirect to="/" />} />}
                {<Route exact path="/home/search" render={() => (logic.userLoggedIn&& recipes) ? <Results recipes={recipes} onDetail ={this.handleOnDetail}/> : <Redirect to = "/" />} />}
                {<Route exact path="/home/detail" render={() => (logic.userLoggedIn && recipe)? <Detail recipe={recipe} ingredients={ingredientsList}/> : <Redirect to = "/home/search" />} />}
                {<Route path="/home/feedback" render={()=> (logic.userLoggedIn && searchFeedback)?<Feedback goBackSearch={this.handleGoBackSearch} message={searchFeedback}/>:<Redirect to="/home" /> }/>}
            </main>
    }

}

export default withRouter(Home)