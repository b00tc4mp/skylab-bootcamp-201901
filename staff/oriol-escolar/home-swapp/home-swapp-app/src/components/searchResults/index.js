import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './index.sass';
import logic from '../../logic'
import HouseCard from '../HouseCard'
import CreateHouseCard from '../createHouseCard'


class SearchResults extends Component {


    state = {

        results: "",
        favorites: ""

    }

    componentDidMount() {
       
        this.setState({ favorites: this.props.userFavs })
        this.retrieveResults(this.props.match.params.query)


    }

    componentWillReceiveProps(props) {

        this.setState({ favorites: props.userFavs })
        this.retrieveResults(props.match.params.query)

    }

    toggleFavorite = (id)=> {

        const { state: { favorites }, props:{updateInfo}} = this

        let index = favorites.indexOf(id)

        favorites.splice(index,1)

        this.setState({favorites})
        updateInfo()

    }



    async retrieveResults(query) {

        const results = await logic.searchByQuery(query)

        if(results.length)
        this.setState({ results: results })
        else this.setState({ results: ""})


    }


    listresults = (results, updateInfo) => {

        return results.map(house => {
            let index = this.state.favorites.indexOf(house)
            if(index<0)
            {
                return <HouseCard house={house} updateInfo={updateInfo} toggleFavorite={this.toggleFavorite} isFav={true} origin='search' />

            }else{
                return <HouseCard house={house} updateInfo={updateInfo} toggleFavorite={this.toggleFavorite} isFav={true} origin='search' />

            }
        });
    }


    

    render() {

        const { listresults, state: { results }, props:{updateInfo} } = this


        return <div className="results" >
            {results ? <h1 className="results__title">{this.props.match.params.query.toUpperCase()}</h1>:<h1> No results for {this.props.match.params.query.toUpperCase()} </h1>}

            <div className="results__content">


                {results && listresults(results,updateInfo )}


            </div>

        </div>
    }


}

export default withRouter(SearchResults)