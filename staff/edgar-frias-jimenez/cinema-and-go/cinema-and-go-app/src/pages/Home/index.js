import React, { useEffect, useState } from 'react'
import appLogic from '../../logic'
import GoogleMaps from '../../components/Maps'
import Marker from '../../components/Marker'

const Home = () => {

    const [locate, setLocate] = useState(null)

    const setCurrentPosition = () => {
        try{
            appLogic.handleInitialLocation()
                .then(res => {
                    setLocate(res.reverse())
                })
        } catch ({ message }) {
            console.log(message)
        }
    }

    useEffect(() => {
        setCurrentPosition()
    },[])

    const threshold = 1500

    const cinemas = async () => {
        if(locate) {
            const userPosition = {
                lat: locate[0],
                lng: locate[1]
            }

            console.log('userPosition', userPosition)

            return await appLogic.retrieveNearestCinemas(userPosition, threshold)
        }
    }

    cinemas()
        .then(cinemaLocations => {
            cinemaLocations.forEach(element => {
                console.log(element.location.coordinates[0], element.location.coordinates[1])
            })
        })
        .catch(console.error)

    return (
        <section className="home">
            <section className="home__content">
            {locate &&
                <section className="maps">
                    <GoogleMaps
                        defaultPos={locate}
                    >
                        <div className="hola" style={{fontSize: '90px', color: 'lime', width: '200px', height: '200px', display: 'block'}}>
                            <p>hola mundo</p>
                        </div>
                        <Marker
                            lat={locate[0]}
                            lng={locate[1]}
                            text="My Marker"
                        />
                    </GoogleMaps>
                </section>
            }
            </section>
        </section>
    )
}

export default Home
