import React, { Component } from 'react'

class CitySelector extends Component{

    state = { city: null }

    handleInput = event => console.log('afdsadsads')

    
    // handleInput = event => {
    //     this.setState({ [event.target.name]: event.target.value })
    //     console.log(this.state.city)
    // }
    
    render(){
        return <section className="categories">
            <ul className="categories__list">
                <li className="categories__item" name="city" onClick={() => this.handleInput}>Barcelona</li>
                <li className="categories__item" name="city" onClick={() => this.handleInput}>Madrid</li>
                <li className="categories__item" name="city" onClick={() => this.handleInput}>Barcelona</li>
                <li className="categories__item" name="city" onClick={() => this.handleInput}>Barcelona</li>
                <li className="categories__item" name="city" onClick={() => this.handleInput}>Barcelona</li>
                <li className="categories__item" name="city" onClick={() => this.handleInput}>Barcelona</li>
                <li className="categories__item" name="city" onClick={() => this.handleInput}>Barcelona</li>
            </ul>
        </section>
    }
}

export default CitySelector