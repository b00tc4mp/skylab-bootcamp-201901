import React from 'react'
import Nav from '../Nav'
import InputsFridge from '../InputsFridge'
import Results from '../Results'
import logic from '../../logic'
import { withRouter, Route } from 'react-router-dom'
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

    render(){
        const {state:{results}} =  this
        
        return <main className="home">
                <Nav user={this.props.user} onLogout={this.handleUser} />
                <InputsFridge onSearch={this.handleOnSearch}/>
                {/* {results && <Results recipes={this.state.recipes}/>} */}
            </main>

    }
}

export default withRouter(Home)