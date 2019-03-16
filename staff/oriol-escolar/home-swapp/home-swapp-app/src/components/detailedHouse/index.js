import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './index.sass';
import logic from '../../logic'


class DetailedHouse extends Component {


    state = {

        thisHouse: "",
        favorites: "",
        lat: "",
        lng: ""

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
                return this.setState({ thisHouse })
                // .then(()=> this.retrieveLocation())

            } catch{
                this.setState({ thisHouse: "" })

            }
        }

    }

    retrieveLocation = () => {

        const { state: { thisHouse: { adress: { number, city, street, country } } } } = this

        return logic.retrievePoint(number, street, city, country)
            .then(location => this.setState({ lat: location.lat, lng: location.lng }))

    }


    render() {

        const { state: { thisHouse }, props: { } } = this

        console.log(thisHouse)
        return <div className="detailedHouse" >

            <button>BACK</button>
            {thisHouse ? <h1> {thisHouse.adress.city}</h1> : <h1> House not found</h1>}

            {thisHouse && <div className="detailedHouse__content">

                <div className='detailedHouse__content-infoBlock'>
                    <div className='detailedHouse__content-infoBlock-1'>

                        <h2> {thisHouse.owner} </h2>
                        <img src={thisHouse.images[0]} />
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

                    </div>

                    <div className='detailedHouse__content-infoBlock-2'>

                        <p> {thisHouse.description}</p>

                    </div>
                </div>

                {/* mapa */}

            </div>}

        </div>
    }


}

export default withRouter(DetailedHouse)