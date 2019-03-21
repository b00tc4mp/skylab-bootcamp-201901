import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './index.sass'

class CitySelector extends Component {

    handleCLick = e => {

        const { props: { onClickCity } } = this

        onClickCity(e.target.value)//
    }

    render() {
        return <section className="city">
            <ul className="city__list">
                <li className="city__item"><button className="city__btn" name="city" value="Barcelona" onClick={e => this.handleCLick(e)}>Barcelona</button></li>
                <li className="city__item"><button className="city__btn" name="city" value="Madrid" onClick={e => this.handleCLick(e)}>Madrid</button></li>
                <li className="city__item"><button className="city__btn" name="city" value="Barcelona" onClick={e => this.handleCLick(e)}>Barcelona</button></li>
                <li className="city__item"><button className="city__btn" name="city" value="Barcelona" onClick={e => this.handleCLick(e)}>Barcelona</button></li>
                <li className="city__item"><button className="city__btn" name="city" value="Barcelona" onClick={e => this.handleCLick(e)}>Barcelona</button></li>
            </ul>
        </section>
    }
}

export default withRouter(CitySelector)