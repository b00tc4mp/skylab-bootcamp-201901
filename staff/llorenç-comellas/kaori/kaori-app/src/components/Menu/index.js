import React, { Component } from 'react'
import logic from '../../logic'
import SelectCategory from '../SelectCategory'
import Category from '../Category'
import { Route, withRouter, Redirect } from 'react-router-dom'


class Menu extends Component {

    state = { error: null, sushi: [] }

    handleCategory = category => {
        try {
            logic.retrieveProductsByCategory(category)
                .then((res) => { this.setState({ sushi: res }, () => {this.props.history.push(`/menu/${category}`) }) })
                .catch(error =>
                    this.setState({ error: error.message })
                )
 
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }    
    
    handleLoginNavigation = () => this.props.history.push('/login')

    handleCart = id =>{
        try {
            logic.addToCart(id)
            
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    render() {
        const {
            state: { error, sushi },
            handleCategory,
            handleLoginNavigation,
            handleCart
            
        } = this

        return <>
            <Route path="/menu" render={() => <SelectCategory  onCategory={handleCategory} error={error} />} />
            <Route exact path="/menu/:category" render={() => <Category products={sushi} onLogin={handleLoginNavigation} addCart={handleCart} error={error} />} />
            
        </>
    }
}

export default withRouter(Menu)