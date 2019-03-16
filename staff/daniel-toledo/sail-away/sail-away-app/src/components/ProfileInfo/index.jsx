'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Link } from 'react-router-dom'

import SlideShow from '../SlideShow'
import BoatInfo from '../BoatInfo'

import logic from '../../logic'

import './index.sass'

function ProfileInfo(props) {

    const { id } = props.match.params
    let [user, setUser] = useState(null)


    async function getUser(id) {
        try {
            let showUser = await logic.retrieveUser(id)
            setUser(showUser)

        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        getUser(id)

    }, [user])


    return (<section className="profileInfo">
        {user && <div>

            <div className='profileInfo__header-background'>
                <div className='profileInfo__header'>

                    <div className='profileInfo__picture'>
                        <SlideShow pictures={user.pictures} />

                    </div>
                    <div className='profileInfo__names'>
                        <h2>{user.name} {user.surname}</h2>

                    </div>
                </div>
            </div>

            <div className='profileInfo__info'>

                <h3 className='profileInfo__titleSection'>General Info</h3>
                <div className='row'>
                    <h5 className='col-2'>gender</h5>
                    <p className='col-2'>{user.gender}</p>
                </div>

                <div className='row'>
                    <h5 className='col-2'>nationality</h5>
                    <p className='col-2'>{user.nationality}</p>
                </div>

                <h5>age</h5>

                <h3 className='profileInfo__titleSection'>Description</h3>
                <p>{user.description}</p>

                <h3 className='profileInfo__titleSection'>Boats</h3>
                {user.boats.length &&
                    user.boats.map(boat =>
                        <BoatInfo boat={boat} key={boat.id} />
                    )
                }

                <h3 className='profileInfo__titleSection'>More...</h3>
                <div>
                    <h3 >Talents</h3>
                    <div className='profileInfo__talents'>
                        {
                            user.talents.map(talent =>
                                <span key={talent} className='btn profileInfo__talent'>{talent}</span>
                            )
                        }
                    </div>
                    <div className='profileInfo__experience'>

                        <h3>Experience</h3>
                        <div className='experience' style={{ width: '200px' }}>
                            <div className='experienceBar' style={{ width: `${Number(user.experience) / 10000 * 100}%` }}></div>
                        </div>
                    </div>

                    <h3>Languages</h3>
                    {
                        user.languages.map(language =>
                            <span key={language} className='m-1 btn profileInfo__language'>{language}</span>
                        )
                    }
                </div>

            </div>

        </div>}

    </section>)
}


export default withRouter(ProfileInfo)