import React from 'react'
import Nav from '../Nav'
import InputsFridge from '../InputsFridge'
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

    render(){
        const {state:{results}} =  this
        
        return <main className="home">
                <Nav user={this.props.user} onLogout={this.handleLogout} />
                {<Route path="/home" render={() =>  logic.userLoggedIn ? <InputsFridge onSearch={this.handleOnSearch}/> : <Redirect to="/" />} />}
                {/* <InputsFridge onSearch={this.handleOnSearch}/> */}
                {/* {results && <Results recipes={this.state.recipes}/>} */}
            </main>

    }
}

export default withRouter(Home)