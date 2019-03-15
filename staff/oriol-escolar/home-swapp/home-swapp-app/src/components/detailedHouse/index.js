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
            try {
                const thisHouse = await logic.retrieveHouse(houseId)
                this.setState({ thisHouse })

            } catch{
                this.setState({ thisHouse: "" })

            }
        }

    }



    render() {

        const { state: { thisHouse }, props: { } } = this

        console.log(thisHouse)
        return <div className="detailedHouse" >

            {thisHouse ? <h1> {thisHouse.adress.city}</h1> : <h1> House not found</h1>}

            {thisHouse && <div className="detailedHouse__content">

                <h2> {thisHouse.owner} </h2>
                <img src={thisHouse.images[0]} />
                <p> {thisHouse.description}</p>
                <div>
                    <h3>Information</h3>
                    <p> Pets allowed: <span>{thisHouse.info.petsAllowed} </span> </p>
                    <p> Smokers allowed: <span>{thisHouse.info.smokersAllowed} </span> </p>
                    <p> Number of beds: <span>{thisHouse.info.numberOfBeds} </span> </p>

                </div>

                <div>
                    <h3>Adress</h3>
                    <p> Country: <span>{thisHouse.adress.country} </span> </p>
                    <p> City: <span>{thisHouse.adress.city} </span> </p>
                    <p> Street: <span>{thisHouse.adress.street} {thisHouse.adress.number} </span> </p>

                </div>


            </div>}

        </div>
    }


}

export default withRouter(DetailedHouse)