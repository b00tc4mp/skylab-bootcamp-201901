import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Search from '../Search'
import Categories from '../Categories'
import logic from '../../logic'

class Home extends Component {

    render() {
        return (
            <section className="home">
                {logic.isUserLoggedIn ? <Search  /> : '' } 
                { <Categories />}
            </section>
        )
    }
}

export default withRouter(Home)