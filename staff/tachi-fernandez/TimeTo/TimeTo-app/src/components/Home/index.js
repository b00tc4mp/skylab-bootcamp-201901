import React, { Component } from 'react'
import {Route , withRouter,Redirect} from 'react-router-dom'
import Search from '../Search'
import Results from '../Results'
import Categories from '../Categories'
import logic from '../../logic'

class Home extends Component {

    render() {
        return (
            <section className="home">
                {logic.isUserLoggedIn ? <Search  /> : '' } 
                {/* <Route path='/home' component={Categories} /> */}
                { <Categories />}
            </section>
        )
    }
}

export default withRouter(Home)