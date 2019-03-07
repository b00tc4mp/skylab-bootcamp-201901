import React, { Component } from 'react'



class LandingPage extends Component {

    state={

        query:""


    }


    handleInput = event => this.setState({ [event.target.name]: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { query}, props: { onSearch } } = this

        onSearch(query)
    }

    render() {

        const{handleFormSubmit,handleInput} = this

        return <section className="LandingPage">


            <h2> Where do you want to go? </h2>
            <form className="LandingPage-form" onSubmit={handleFormSubmit}>

                <input required type="text" name= "query" placeholder="" onChange={handleInput}></input>

                <button>Search</button>


            </form>



        </section>






    }



}


export default LandingPage