import React, { Component } from 'react'
import {Route , withRouter,Redirect} from 'react-router-dom'
import Search from '../Search'
import Results from '../Results'
import Categories from '../Categories'
import logic from '../../logic'

class Home extends Component {
    //state = { events: null,results: []  }

    // handleSearch = query =>{
    //     try {
    //         logic.listEventsByQuery(query)
    //             .then(results => {
    //                 debugger
    //                 console.log(results)
    //                 this.setState({ results })
    //                 this.props.history.push(`/results/${query}`)               
    //             })
    //             .catch( ({error}) => {
    //                 this.setState({ results: null })
    //                 console.log(error)
    //             }) 
    //     } catch ({message}) {
    //         this.setState({ results: null})
    //     }
    // }

    render() {
        return (
            <section className="home">
                <h1 className="home__title">Home</h1>
                {logic.isUserLoggedIn ? <Search  /> : '' } 
                {/* <Route path='/home' component={Categories} /> */}
                { <Categories />}
            </section>
        )
    }
}

export default withRouter(Home)