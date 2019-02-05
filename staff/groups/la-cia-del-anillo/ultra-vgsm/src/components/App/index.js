import React, { Component } from 'react';

import { Route } from 'react-router-dom';
import './index.css';

import Header from '../Header';
import Aside from '../Aside';
import Results from '../Results';
import Footer from '../Footer';
import Games from '../Games';
import GameInfo from '../GameInfo';


class App extends Component {
    render() {
        return (
                <main className="app">
                    <Aside />
                    <div className="wrapper">
                        <Header />
                        <div className="container">
                            <Route path="/search/:query" render={props => <Results query={props.match.params.query} />} />
                            <Route path="/games/:platformId" component={Games} />
                        </div>
                        <Footer />
                    </div>
                </main>
        );
    }
}

export default App;
