import React, { Component } from 'react'
import literals from './literals'
import { Route, withRouter, Redirect, Switch, Link } from 'react-router-dom'
import logic from '../../logic';
import StopLine from '../StopLine';
import ResultsLine from '../ResultsLine';
import StopLine2 from '../StopLine2';
import StopLine3 from '../StopLine3';

class LineSearch extends Component {
    state = { error: null, line_id: null, lines: [], stop: null, directions: [], direction: null , favs:[]}

    handleLineSearch = line_id => {
        line_id = Number(line_id)
        return logic.retrieveBusLineRoute(line_id)
            .then((directions) =>
                this.setState({ error: null, directions, line_id }, () => this.props.history.push('/byidline/directions'))
            )
            .catch(error =>
                this.setState({ error: error.message })
            )
    }

    handleDirectionSearch = direction_id => {
        logic.retrieveBusStops(this.state.line_id, direction_id)
            .then((lines) =>
                this.setState({ error: null, lines }, () => this.props.history.push('/byidline/stops'))
            )
            .catch(error =>
                this.setState({ error: error.message })
            )
    }

    handleStopSearch = stop_id => {
        stop_id = Number(stop_id)

        return logic.upcomingBusesByStopAndLine(stop_id, this.state.line_id)
            .then((stop) =>
                this.setState({ error: null, stop }, () => this.props.history.push('/byidline/results'))
            )
            .catch(error =>
                this.setState({ error: error.message })
            )
    }
    handleFav = id =>
        logic.toggleFavStop(id)
            .then(() => logic.retrieveFavStops())
            .then(favs => this.setState({ favs }))

    render() {
        const {
            handleLineSearch,
            handleDirectionSearch,
            handleStopSearch,
            handleFav,
            state: { lines, error, stop, directions, favs },
            props: { lang, items}
        } = this

        const { back } = literals[lang]

        return <main>
            <Switch>
                <Route exact path="/byidline" render={() => logic.isUserLoggedIn ? <StopLine lang={lang} items={items} onSearch={handleLineSearch} error={error} /> : <Redirect to="/" />} />
                <Route path="/byidline/directions" render={() => logic.isUserLoggedIn ? <StopLine2 lang={lang} items={directions} onSearch={handleDirectionSearch} error={error} /> : <Redirect to="/" />} />
                <Route path="/byidline/stops" render={() => logic.isUserLoggedIn ? <StopLine3 lang={lang} items={lines} onSearch={handleStopSearch} error={error} /> : <Redirect to="/" />} />
                <Route path="/byidline/results" render={() => logic.isUserLoggedIn ? <ResultsLine lang={lang} onFav={handleFav} stop={stop} error={error} /> : <Redirect to="/" />} />
                <Redirect to="/" />
            </Switch>
        </main>
    }
}

export default withRouter(LineSearch)