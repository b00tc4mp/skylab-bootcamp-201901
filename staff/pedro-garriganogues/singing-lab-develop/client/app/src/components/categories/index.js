import React, { Component } from 'react'
import logic from '../../logic'
import Footer from '../footer'
import './index.css'
import ListItems from './../list-items'

class Categories extends Component {

    constructor() {
        super()
        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        logic.listCategories()
            .then(categories => this.setState({ categories }))
    }

    render() {
        return (
            <main>
                <h2 className="main-title">Categories</h2>
                <hr/>

                <ListItems
                    btnShow
                    items={this.state.categories}
                />
            <Footer/>
            </main>
        )
    }

}

export default Categories