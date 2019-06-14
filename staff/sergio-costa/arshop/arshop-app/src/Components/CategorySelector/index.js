import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './index.sass'

class CategorySelector extends Component {

    handleCLick = e => {

        const { props: { onClickCategory } } = this

        onClickCategory(e.target.value)
    }

    render() {
        return <section className="city">
            <ul className="city__list">
                <li className="city__item"><button className="city__btn" name="city" value="vehicle" onClick={e => this.handleCLick(e)}>Vehicle</button></li>
                <li className="city__item"><button className="city__btn" name="city" value="living place" onClick={e => this.handleCLick(e)}>Living place</button></li>
                <li className="city__item"><button className="city__btn" name="city" value="electronic" onClick={e => this.handleCLick(e)}>Electronic</button></li>
            </ul>
        </section>
    }
}

export default withRouter(CategorySelector)