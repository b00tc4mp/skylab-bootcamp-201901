import React, { Component } from 'react'
import logic from '../../logic'
import SelectCategory from '../SelectCategory'
import Category from '../Category'
import { Route, withRouter } from 'react-router-dom'


class Menu extends Component {

    state = { error: null, sushi: [], category: null }

    handleCategory = category => {
        try {
            logic.retrieveProductsByCategory(category)
                .then((res) => { this.setState({ sushi: res, category }, () => { this.props.history.push(`/menu/${category}`) }) })
                .catch(error =>
                    this.setState({ error: error.message })
                )

        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    handleLoginNavigation = () => this.props.history.push('/login')

    handleCart = id => {
        
        try {
            logic.addToCart(id)
            .catch(error =>
                this.setState({ error: error.message })
            )

        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    componentDidMount() {
        const category = this.props.location.pathname.split('/menu/')
        this.handleCategory(category[1])
    }

    render() {
        const {
            state: { error, sushi, category },
            handleCategory,
            handleLoginNavigation,
            handleCart
        } = this

        return <>
            <SelectCategory onCategory={handleCategory} currentCategory={category} error={error} />
            <Route exact path="/menu/:category" render={() => <Category products={sushi} onLogin={handleLoginNavigation} addCart={handleCart} error={error} />} /> 
        </>
    }
}

export default withRouter(Menu)