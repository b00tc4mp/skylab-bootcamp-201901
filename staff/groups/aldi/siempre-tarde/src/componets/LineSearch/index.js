import React, { Component } from 'react'
import literals from './literals'
import { Route, withRouter, Redirect, Switch, Link } from 'react-router-dom'
import logic from '../../logic';
import StopLine from '../StopLine';
import ResultsLine from '../ResultsLine';

class CodeSearch extends Component {
    state = { error: null, line: null, lines:[] , stop: null}

    handleSearch = stop_id =>
        logic.upcomingBusesByStop(stop_id)
            .then((lines) =>
                this.setState({ error:null, line: null, lines, stop:stop_id},() => this.props.history.push('/byidline/results'))
            )
            .catch(error =>
                this.setState({ error: error.message })
            )


    render() {
        const {
            handleSearch,
            state: { lines, error, stop },
            props: { lang }
        } = this

        const {back} = literals[lang]

        return <main>
            <Switch>
            <Route exact path="/byidline" render={() => logic.isUserLoggedIn ? <StopLine lang={lang} items={lines} onSearch={handleSearch} error={error}/> : <Redirect to="/" />} />
            <Route path="/byidline/results" render={() => logic.isUserLoggedIn ? <ResultsLine lang={lang} items={lines} stop={stop} error={error}/> : <Redirect to="/" />} />
            <Redirect to="/" />
            </Switch>
        </main>
    }
}

export default withRouter(CodeSearch)