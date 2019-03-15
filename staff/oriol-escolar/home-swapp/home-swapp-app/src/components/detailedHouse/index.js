import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './index.sass';
import logic from '../../logic'


class DetailedHouse extends Component {


    state = {

        thisHouse: "",
        favorites: ""

    }

    componentDidMount() {

        this.retrieveThisHouse(this.props.match.params.houseId)
        this.setState({ favorites: this.props.userFavs })


    }

    componentDidUpdate(prepProvs) {
        if (prepProvs.favorites !== this.state.favorites) {
            const { favorites } = this.props
            this.setState({ favorites })
        }

    }

    componentWillReceiveProps(props) {

        this.setState({ favorites: props.favorites })
        this.retrieveThisHouse(props.match.params.houseId)

    }

    toggleFavorite = () => {

    }



    async retrieveThisHouse(houseId) {
        if (houseId) {
            try{
                const thisHouse = await logic.retrieveHouse(houseId)
                this.setState({ thisHouse })

            }catch{
                this.setState({ thisHouse:"" })

            }
        }

    }



    render() {

        const { state: { thisHouse }, props: { } } = this

        console.log(thisHouse)
        return <div className="results" >
            {thisHouse ?  <h1> {thisHouse.adress.city}</h1> : <h1> House not found</h1>}

            {thisHouse && <div className="results__content">

                    <h2> </h2>


            </div>}

        </div>
    }


}

export default withRouter(DetailedHouse)