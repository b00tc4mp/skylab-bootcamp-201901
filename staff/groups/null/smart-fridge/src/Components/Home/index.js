import React from 'react'
import Nav from '../Nav'
import InputsFridge from '../InputsFridge'
import EditProfile from '../EditProfile'
import Results from '../Results'
import logic from '../../logic'
import { withRouter, Route, Redirect } from 'react-router-dom'
import './index.sass'
// import Detail from '../Detail/detail';
import Feedback from '../Feedback'


class Home extends React.Component{

    state={recipes: null,  searchFeedback: null}

    handleOnSearch= (query, calories, diet, health) => {
        try {
            logic.search(query, calories, diet, health)
                .then(recipes=> {
                    this.setState({recipes}, ()=> this.props.history.push('/home/recipes'))        
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

    render(){
        const {state:{ recipes, searchFeedback}} =  this
        
        return <main className="home">
                <Nav user={this.props.user} onLogout={this.handleLogout} editProfile={this.handleEditProfileButton} />
                {<Route exact path="/home" render={() =>  logic.userLoggedIn ? <InputsFridge onSearch={this.handleOnSearch}/> : <Redirect to="/" />} />}
                {<Route path="/home/profile" render={() =>  logic.userLoggedIn ? <EditProfile onEditProfile={this.handleEditProfile} cancelButton={this.handleCancelButton}/> : <Redirect to="/" />} />}
                {<Route path="/home/recipes" render={() => logic.userLoggedIn ? <Results recipes={recipes}/> : <Redirect to = "/" />} />/* {results && <Results recipes={this.state.recipes}/>} */}
                {/* {<Route path="/home/search/detail" render={() => logic.userLoggedIn ? <Detail recipe={recipes}/> : <Redirect to = "/"/>}/>} */}
                {/* {!error && <Feedback/>} */}
                {<Route path="/home/feedback" render={()=> (logic.userLoggedIn && searchFeedback)?<Feedback onGoBackSearch={this.onGoBacktosearch} message={searchFeedback}/>:<Redirect to="/home" /> }/>}
               
            </main>
    }
}
    
export default withRouter(Home)