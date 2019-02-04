import React, { Component } from 'react';

class Detail extends Component {

    render() {
        const {Title, Year, Rated, Runtime, Plot, Genre, Actors, Poster} = this.props.detail
        return (
            <section className="detail">
                <button>X</button>
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