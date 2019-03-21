import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './index.sass';



class LandingPage extends Component {

    state = {

        query: ""


    }


    handleInput = event => this.setState({ [event.target.name]: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()
        const { state: { query }, props: { history } } = this
        if(query){
    
            history.push(`/search/${query}`)

        }
    }

    render() {

        const { handleFormSubmit, handleInput } = this

        return <section className="landingPage">


            <h2> Where do you want to go? </h2>
            <form className="landingPage-form" onSubmit={handleFormSubmit}>

                <input className="landingPage-form__input" required type="text" name="query" placeholder="" onChange={handleInput}></input>

                <button className="landingPage-form__button">Search</button>


            </form>



        </section>






    }



}


export default withRouter(LandingPage)