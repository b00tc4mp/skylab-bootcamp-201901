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
        this.setState({ results: results })

    }


    listresults(userHouses) {

        console.log(userHouses)
        return userHouses.map(house => {

            return HouseCard(house)
        });
    }



    render() {

        const { listresults, state: { user, results }, } = this


        return <div className="results" >
            <h1 className="results__title">{this.props.match.params.query.toUpperCase()}</h1>

            <div className="results__content">


                {results && listresults(results)}


            </div>

        </div>
    }


}

export default withRouter(SearchResults)