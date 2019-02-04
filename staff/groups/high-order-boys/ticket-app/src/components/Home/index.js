import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header/index'
import Footer from '../Footer/index'

class Home extends Component {

    componentDidMount() {
        console.log('holaa')
    }

    render() {

        return <section>
            <header>
                <Header />
            </header>

            <div>
                <h1>HOME</h1>
            </div>
            <footer>
                <Footer />
            </footer>
        </section>
    }
}

export default Home