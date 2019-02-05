import React, { Component } from 'react';

class Detail extends Component {

    onClose = () => {
        const { onVideoClose } = this.props
        onVideoClose()
    }

    render() {
        const {detail: {Title, Year, Rated, Runtime, Plot, Genre, Actors, Poster}} = this.props
        const {onClose}  = this
        return (
            <section className="detail">
                <button onClick={onClose}>X</button>
                <h3>{Title}</h3>
                <p className="detail__year">{Year}</p>
                <p className="detail__rated">{Rated}</p>
                <p className="detail__runtime">{Runtime}</p>
                <p className="detail__plot">{Plot}</p>
                <p className="detail__genre">{Genre}</p>
                <p className="detail__actors">{Actors}</p>
                <img src={Poster} className="detail__poster" alt={Title} />
            </section>
        )
    }
}


export default Detail;