import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import logic from '../../logic'
import './index.sass'
import Feedback from '../Feedback'
import CitySelector from '../CitySelector'

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
                    if(this.state.image !== null) return logic.uploadProductImg(id, { image })
                })
                .then(() => this.props.history.push('/'))
                .catch(({ message }) => this.setState({ feedback: message }))
        } catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    goToCity = () => {
        this.props.history.push('/select/city')
    }

    goToCategory = () => {
        this.props.history.push('/select/category')
    }

    onClean = () => {
        console.log('cleaned')
        this.props.history.push('/')
    }

    componentWillMount() {
        this.setState({ city: this.props.city })
        this.setState({ category: this.props.category })

        console.log('will mount')
    }

    componentWillReceiveProps(props){
        console.log(props.city)
    }

    render() {

        const { handleInput, handleFormSubmit, goToCity, goToCategory } = this

        return <section className="uploadProduct">
            <div className="uploadProduct__header">
                <div onClick={() => this.onClean()}>
                    <i className="fas fa-long-arrow-alt-left profile__icons--back uploadProduct__logo"></i>
                </div>
                <h3 className="uploadProduct__title">Your Product</h3>
            </div>
            <div className="form__inputrow">
                <div className="upload">
                    <input type="file" id="files" name="files" className="input-file ng-pristine ng-valid ng-touched" onChange={e => this.setState({ image: e.target.files[0] })} />
                    <label for="files">
                        <span className="add-image">
                            Add <br /> Image
                            </span>
                        <output id="list"></output>
                    </label>
                </div>
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
                    <input className="form__input" type="text" name="city" value={this.state.city} onChange={handleInput} onFocus={() => goToCity()} />
                </div>
                <div className="form__inputrow">
                    <label className="form__label--input">Category</label>
                    <input className="form__input" type="text" name="category" value={this.state.category} onChange={handleInput} onFocus={() => goToCategory()} />
                </div>
                <div className="form__button">
                    <button className="form__btn">Upload Product</button>
                </div>
                {/* <div className="form__img">
                        <input className="form__img--input" type="file" name="image" onChange={e => this.setState({ image: e.target.files[0] })} />
                </div> */}
            </form>
            {this.state.feedback && <Feedback message={this.state.feedback} />}
        </section>
    }
}

export default withRouter(UploadProduct)