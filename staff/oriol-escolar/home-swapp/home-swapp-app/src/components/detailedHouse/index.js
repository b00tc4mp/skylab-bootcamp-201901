import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import MapConainer from '../googleMap'
import './index.sass';
import ImageGallery from 'react-image-gallery';

import logic from '../../logic'


class DetailedHouse extends Component {


    state = {

        thisHouse: null,
        user: null,
        favorites: null,
        location: null

    }

    componentDidMount() {
        if (!this.state.thisHouse) {
            this.retrieveThisHouse(this.props.match.params.houseId)
        }
        if (!this.state.favorites || this.state.favorites !== this.props.userFavs) {
            this.setState({ favorites: this.props.userFavs })
            if (this.state.user !== this.props.user)
                this.setState({ user: this.props.user })

        }


    }

    componentDidUpdate(prepProvs) {
        if (prepProvs.favorites !== this.state.favorites) {
            const { favorites } = this.props
            this.setState({ favorites })
        }

        if (this.state.user !== prepProvs.user) {
            this.setState({ user: prepProvs.user })

        }

    }

    componentWillReceiveProps(props) {

        if (!this.state.thisHouse) {
            this.retrieveThisHouse(props.match.params.houseId)

        }

        if (!this.state.user !== props.user) {
            this.setState({ user: props.user })

        }

    }

    toggleFavorite = () => {

    }


    retrieveThisHouse(houseId) {
        console.log('ksbadhsandsadjsn')
        if (houseId) {
            const { state: { thisHouse } } = this
            if (!thisHouse)

                return logic.retrieveHouse(houseId)
                    .then(house => {
                        const thisHouse = house;
                        this.setState({ thisHouse })
                        const { adress: { number, street, city, country } } = thisHouse
                        return logic.retrievePoint(number, street, city, country)
                            .then(location => {

                                this.setState({ location })

                            })
                            .catch(() => true)

                    })
                    .catch(() => this.setState({ thisHouse: "ayayay" }))


        }

    }


    imageViewer = () => {

        const { state: { thisHouse } } = this

        if (thisHouse) {

            let newImages = []

            for (const image of thisHouse.images) {


                let newImage = {

                    original: image,
                    thumbnail: image
                }

                newImages.push(newImage)

            }


            return <ImageGallery items={newImages} />

        }


    }

    contactButton = ()=> {


        this.props.contactButton(this.state.thisHouse.ownerId)

    }


    goBack() {

        window.history.back()
    }

    render() {

        const { state: { thisHouse, user, location }, props: { }, goBack, imageViewer,contactButton } = this

        return <div className="detailedHouse" >

            <button className="detailedHouse__BackButton" onClick={goBack}>BACK</button>
            {thisHouse ? true : <h1> House not found</h1>}

            {thisHouse && <div className="detailedHouse__content">

                <div className='detailedHouse__content-infoBlock'>
                    <div className='detailedHouse__content-infoBlock-1'>

                        <h2> {thisHouse.owner} </h2>
                        <div>

                            {imageViewer()}
                            {/* <img className='image' src={thisHouse.images[0]} /> */}

                        </div>
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

                        {user && <button className="detailedHouse__content-infoBlock-1__Contact" onClick={contactButton}>Contact</button>}

                    </div>

                    <div className='detailedHouse__content-infoBlock-2'>

                        <p> {thisHouse.description}</p>

                    </div>
                </div>


                {location && <MapConainer className='map' lat={location.lat} lng={location.lng} > </MapConainer>}
            </div>
            }

        </div>
    }


}

export default withRouter(DetailedHouse)