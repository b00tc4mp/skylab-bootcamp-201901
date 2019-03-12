import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import logic from '../../logic'
import './index.sass'
import Feedback from '../Feedback';

class UploadProduct extends Component {

    state = { tittle: null, description: null, price: null, category: null, city: null, image: null, feedback: null }

    handleInput = event => this.setState({ [event.target.name]: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { tittle, description, price, category, city, image } } = this

        try {
            logic.createProduct({ tittle, description, price, category, city, image })
                .then(({ id }) => {
                    this.setState({ feedback: '' })
                    return id
                })
                .then(id => {
                    console.log(id)
                    console.log(image)
                    return logic.uploadProductImg(id, {image})
                })
                .then(() => this.props.history.push('/'))
                .catch(({ message }) => this.setState({ feedback: message }))
        } catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    render() {

        const { handleInput, handleFormSubmit } = this

        return <section className="uploadProduct">
            <div className="uploadProduct__header">
                <Link to="/">
                    <i className="fas fa-times uploadProduct__logo"></i>
                </Link>
                <h3 className="uploadProduct__title">Your Product</h3>
            </div>
            <form className="form" onSubmit={handleFormSubmit}>
                <div className="form__inputrow">
                    <label className="form__label--input">Tittle</label>
                    <input className="form__input" type="text" name="tittle" onChange={handleInput} />
                </div>
                <div className="form__inputrow">
                    <label className="form__label--input">Description</label>
                    <input className="form__input" type="text" name="description" onChange={handleInput} />
                </div>
                <div className="form__inputrow">
                    <label className="form__label--input">Price</label>
                    <input className="form__input" type="number" name="price" onChange={handleInput} />
                </div>
                <div className="form__inputrow">
                    <label className="form__label--input">City</label>
                    <input className="form__input" type="text" name="city" onChange={handleInput} />
                </div>
                <div className="form__inputrow">
                    <label className="form__label--input">Category</label>
                    <ul className="form__list">
                        <li className="form__item">
                            <input type="radio" id="1" name="category" value="vehicle" onChange={handleInput} />
                            <label className="form__label" for="1">Vehicle</label>
                        </li>
                        <li className="form__item">
                            <input type="radio" id="2" name="category" value="living room" onChange={handleInput} />
                            <label className="form__label" for="2">Living Room</label>
                        </li>
                        <li className="form__item">
                            <input type="radio" id="3" name="category" value="electronic" onChange={handleInput} />
                            <label className="form__label" for="3">Electronic</label>
                        </li>
                    </ul>
                    <div className="form__img">
                        <input className="form__img--input" type="file" name="image" onChange={e => this.setState({image: e.target.files[0]})} />
                    </div>
                </div>
                <div className="form__button">
                    <button className="form__btn">Upload Product</button>
                </div>
            </form>
            {this.state.feedback && <Feedback message={this.state.feedback} />}
        </section>
    }
}

export default withRouter(UploadProduct)