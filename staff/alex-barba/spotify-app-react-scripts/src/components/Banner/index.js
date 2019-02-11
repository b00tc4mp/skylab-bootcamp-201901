import React from 'react';

class Banner extends React.Component {

    render() {
        return <section className="hero is-light is-bold">
        <div className="hero-body">
            <div className="container has-text-centered">
                <h1 className="title">Spotify App</h1>
                <h1 className="subtitle is-6">by Àlex Barba</h1>
            </div>
        </div>
    </section>
    }
}

export default Banner;