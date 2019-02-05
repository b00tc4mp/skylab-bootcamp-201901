import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import './index.css';

import Header from '../Header';
import Aside from '../Aside';
import Results from '../Results';
import Footer from '../Footer';

class App extends Component {
    render() {
        return (
            <HashRouter>
                <main className="app">
                    <Aside />
                    <div className="wrapper">
                        <Header />
                        <div className="container">
                            <Route path="/search/:query" render={props => <Results query={props.match.params.query} />} />
                        </div>
                        <Footer />
                    </div>
                </main>
            </HashRouter>
        );
    }
}

export default App;
