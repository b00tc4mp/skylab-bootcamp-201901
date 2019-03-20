import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './index.sass';
import logic from '../../logic'
import HouseCard from '../HouseCard'


class SearchResults extends Component {


    state = {

        results: "",
        favorites: ""

    }

    componentDidMount() {

        this.retrieveResults(this.props.match.params.query)
        this.setState({ favorites: this.props.userFavs })


    }

    componentWillReceiveProps(props) {

        this.setState({ favorites: props.userFavs })
        this.retrieveResults(props.match.params.query)

    }

    toggleFavorite = (house) => {

        const { state: { favorites }, props: { updateInfo } } = this
        
        let index = favorites.findIndex(fav => fav.id === house.id)

        if (index < 0) {
            favorites.push(house)
        } else {
            favorites.splice(index, 1)
        }
        this.setState({ favorites })
        updateInfo()

    }



    async retrieveResults(query) {

        const results = await logic.searchByQuery(query)

        if (results.length)
            this.setState({ results: results })
        else this.setState({ results: "" })


    }


    listresults = (results, updateInfo,retrieveHouse) => {
       

        if (this.state.favorites) {

            return results.map(house => {
                
                let index = this.state.favorites.filter(fav => fav.id == house.id)
                
                return  <HouseCard key={house.id} house={house} updateInfo={updateInfo} toggleFavorite={this.toggleFavorite} isFav={!!index.length} retrieveHouse={retrieveHouse} origin='search' />
            })

        }else{

            return results.map(house => {
                return  <HouseCard key={house.id} house={house} retrieveHouse={retrieveHouse} origin='search' />
            })
        }
    }




    render() {

        const { listresults, state: { results }, props: { updateInfo,retrieveHouse } } = this


        return <div className="results" >
            {results ? <h1 className="results__title">{this.props.match.params.query.toUpperCase()}</h1> : <h1> No results for {this.props.match.params.query.toUpperCase()} </h1>}

            <div className="results__content">


                {results && listresults(results, updateInfo,retrieveHouse)}


            </div>

        </div>
    }


}

export default withRouter(SearchResults)