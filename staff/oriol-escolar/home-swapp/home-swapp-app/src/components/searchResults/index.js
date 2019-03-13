import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './index.sass';
import logic from '../../logic'
import HouseCard from '../HouseCard'
import CreateHouseCard from '../createHouseCard'


class SearchResults extends Component {


    state = {

        results: ""
    }

    componentDidMount() {

        this.retrieveResults(this.props.match.params.query)

    }


    componentWillReceiveProps(props) {
        this.retrieveResults(props.match.params.query)
    }

    async retrieveResults(query) {

        const results = await logic.searchByQuery(query)

        if(results.length)
        this.setState({ results: results })
        else this.setState({ results: ""})


    }



    listresults(userHouses,updateInfo) {

        return userHouses.map(house => {

            return <HouseCard house={house} updateInfo={updateInfo} origin='search'/>
        });
    }



    render() {

        const { listresults, state: { user, results }, props:{updateInfo} } = this


        return <div className="results" >
            {results ? <h1 className="results__title">{this.props.match.params.query.toUpperCase()}</h1>:<h1> No results for {this.props.match.params.query.toUpperCase()} </h1>}

            <div className="results__content">


                {results && listresults(results,updateInfo )}


            </div>

        </div>
    }


}

export default withRouter(SearchResults)