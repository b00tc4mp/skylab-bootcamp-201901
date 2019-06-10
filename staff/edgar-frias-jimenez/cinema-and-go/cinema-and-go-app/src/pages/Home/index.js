import React, { useState, useEffect } from 'react'
import appLogic from '../../logic'
import GoogleMaps from '../../components/Maps'
import CustomMarker from '../../components/Marker'
import CinemaModal from '../../components/CinemaModal'
import { Circle } from '@react-google-maps/api'

const Home = () => {
    const [cinemaPoi, setCinemaPoi] = useState(null)
    const [ modalVisible, setModalVisible ] = useState(false)
    const [currentMarker, setCurrentMarker] = useState(null)

    const handleCloseModal = () => {
        console.log('handle close click')
        setModalVisible(false)
    }

    const handlePopulate = () => {
        appLogic.populateDb()
    }

    const defaultPos = localStorage.getItem('userLocation').split(',').map(item => parseFloat(item))

    const userPosition = {
        lng: defaultPos[0],
        lat: defaultPos[1]
    }

    const threshold = 5500

    useEffect(() => {
        const cinemas = async () => {
            if(defaultPos) {
                const cinemaPoints = await appLogic.retrieveNearestCinemas(userPosition, threshold)
                localStorage.setItem('cinemaPoints', JSON.stringify(cinemaPoints))
                return setCinemaPoi(cinemaPoints)
            }
        }
        cinemas()
    },[])

    return (
        <section className="home">
            {modalVisible && <CinemaModal onClose={handleCloseModal} id={currentMarker} />}

            <section className="home__content">

            <button className="populate" onClick={handlePopulate}> Populate! </button>

            {defaultPos &&
                <section className="maps">
                    <GoogleMaps
                        customZoom={14.5}
                    >
                        <Circle
                            center={{
                                lat: defaultPos[0],
                                lng: defaultPos[1]
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
                            customPosition={defaultPos}
                        />

                        {cinemaPoi &&
                            cinemaPoi.map (
                                ({ location, _id: id }) =>
                                    <CustomMarker
                                        key={id}
                                        customPosition={location.coordinates}
                                        customHandler={() => {
                                            setCurrentMarker(id)
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
