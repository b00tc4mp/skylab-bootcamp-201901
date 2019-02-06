import React from 'react'
import Nav from '../Nav'
import InputsFridge from '../InputsFridge'
import EditProfile from '../EditProfile'
import Results from '../Results'
import logic from '../../logic'
import { withRouter, Route, Redirect } from 'react-router-dom'
import './index.sass'
import Detail from '../Detail/detail';


class Home extends React.Component{

    state={recipes: null}

    handleOnSearch= (query, calories, diet, health) => {
        try {
            logic.search(query, calories, diet, health)
                .then(recipes=> {
                    this.setState({recipes}, ()=> this.props.history.push('/home/search'))
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

    handleEditInputs=()=>{
        this.props.history.push('/home')
        this.setState({recipes: null})
    }

    render(){
        const {state:{ recipes, onDetails }} =  this
        
        return <main className="home">
                <Nav className='fixed' user={this.props.user} onLogout={this.handleLogout} editProfile={this.handleEditProfileButton} results={this.state.recipes} editInputs = {this.handleEditInputs} />
                {<Route exact path="/home" render={() =>  logic.userLoggedIn ? <InputsFridge onSearch={this.handleOnSearch}/> : <Redirect to="/" />} />}
                {<Route path="/home/profile" render={() =>  logic.userLoggedIn ? <EditProfile onEditProfile={this.handleEditProfile} cancelButton={this.handleCancelButton}/> : <Redirect to="/" />} />}
                {<Route path="/home/search" render={() => recipes ? <Results recipes={recipes}/> : <Redirect to = "/home" />}/>/* {results && <Results recipes={this.state.recipes}/>} */}
                {<Route path="/home/search/detail" render={() => onDetails ? <Detail recipes={recipes}/> : <Redirect to = "/home"/>}/>}
            </main>}

export default withRouter(Home)