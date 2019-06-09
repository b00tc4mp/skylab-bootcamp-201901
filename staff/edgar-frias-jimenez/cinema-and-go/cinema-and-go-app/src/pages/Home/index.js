import React, { useState } from 'react'
import appLogic from '../../logic'
import GoogleMaps from '../../components/Maps'
import CustomMarker from '../../components/Marker'
import CinemaModal from '../../components/CinemaModal'
import { Circle } from '@react-google-maps/api'

const Home = ({ locate }) => {
    const [cinemaPoi, setCinemaPoi] = useState(null)
    const [ modalVisible, setModalVisible ] = useState(false)

    const handleCloseModal = () => {
        console.log('handle close click')
        setModalVisible(false)
    }

    const threshold = 1500

    const cinemas = async () => {
        if(locate) {
            const userPosition = {
                lat: locate[1],
                lng: locate[0]
            }

            return await appLogic.retrieveNearestCinemas(userPosition, threshold)
        }
    }

    cinemas()
        .then(cinemaLocations => {
            setCinemaPoi(cinemaLocations)
        })
        .catch(console.error)

    return (
        <section className="home">
            {
                modalVisible && <CinemaModal onClose={handleCloseModal} />
            }


            <section className="home__content">
            {locate &&
                <section className="maps">
                    <GoogleMaps
                        customZoom={14.5}
                        defaultPos={locate}
                    >
                        <Circle
                            // optional
                            onLoad={circle => {
                                console.log('Circle onLoad circle: ', circle)
                            }}
                            // optional
                            onUnmount={circle => {
                                console.log('Circle onUnmount circle: ', circle)
                            }}

                            center={{
                                lat: locate[0],
                                lng: locate[1]
                            }}
                            options={{
                                strokeColor: '#ce9234',
                                strokeOpacity: 0.85,
                                strokeWeight: 2,
                                fillColor: '#ffd364',
                                fillOpacity: 0.35,
                                clickable: false,
                                draggable: false,
                                editable: false,
                                visible: true,
                                radius: 1500,
                                zIndex: 1
                            }}
                        />

                        <CustomMarker
                            clickable={false}
                            customPosition={locate}
                        />

                        {cinemaPoi &&
                            cinemaPoi.map (
                                ({ location, _id: id }) =>
                                    <CustomMarker
                                        key={id}
                                        customPosition={location.coordinates}
                                        customHandler={() => {
                                            setModalVisible(true)
                                            console.log('handleClick here', modalVisible)
                                        }}
                                    />
                            )
                        }
                    </GoogleMaps>
                </section>
            }
            </section>
        </section>
    )
}

export default Home
