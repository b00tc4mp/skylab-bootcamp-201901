import React from 'react'
import Nav from '../Nav'
import InputsFridge from '../InputsFridge'
import EditProfile from '../EditProfile'
import Results from '../Results'
import logic from '../../logic'
import { withRouter, Route, Redirect } from 'react-router-dom'
import './index.sass'


class Home extends React.Component{

    state={recipes: null}

    handleOnSearch= (query, calories, diet, health) => {
        try {
            logic.search(query, calories, diet, health)
                .then(recipes=> {
                    this.setState({recipes})
                    console.log(this.state.recipes)
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
        const {state:{results}} =  this
        
        return <main className="home">
                <Nav user={this.props.user} onLogout={this.handleLogout} editProfile={this.handleEditProfileButton} />
                {<Route exact path="/home" render={() =>  logic.userLoggedIn ? <InputsFridge onSearch={this.handleOnSearch}/> : <Redirect to="/" />} />}
                {<Route path="/home/profile" render={() =>  logic.userLoggedIn ? <EditProfile onEditProfile={this.handleEditProfile} cancelButton={this.handleCancelButton}/> : <Redirect to="/" />} />}
                {/* <InputsFridge onSearch={this.handleOnSearch}/> */}
                {/* {results && <Results recipes={this.state.recipes}/>} */}
            </main>

    }
}

export default withRouter(Home)