'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Link } from 'react-router-dom'

import SlideShow from '../SlideShow'
import BoatInfo from '../BoatInfo'
import Boat from '../Boat'
import Talents from '../Talents'
import Experience from '../Experience'
import Language from '../Language'

import { data, mongoose, models } from 'sail-away-data'
import logic from '../../logic'

import './index.sass'

function ProfileInfo(props) {

    const { id } = props.match.params
    let [user, setUser] = useState(null)


    async function getUser(id) {
        try {
            let showUser = await logic.retrieveUser(id)
            setUser(showUser)
            debugger

        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        getUser(id)
        debugger
    }, [user])


    return (<section className="edit-profile">
        {user && <div>

            <div className='d-flex'>
                <div className='edit-profile__picture'>
                    <SlideShow pictures={user.pictures} />

                </div>
                <div>
                    <h2>{user.name} {user.surname}</h2>

                </div>
            </div>

            <h3 className='text-center'>General Info</h3>
            <h5>gender</h5>
            <p>{user.gender}</p>

            <h5>nationality</h5>
            <p>{user.nationality}</p>

            <h5>age</h5>

            <h3 className='text-center'>Description</h3>
            <p>{user.description}</p>

            <h3 className='text-center'>Boats</h3>
            {user.boats.length &&
                user.boats.map(boat =>
                    <BoatInfo boat={boat} />
                )
            }

            <div>
                <h3>Talents</h3>
                <div>
                    {
                        user.talents.map(talent =>
                            <span key={talent} className='m-1 btn btn-info'>{talent}</span>
                        )
                    }
                </div>
                <h3>Experience- {user.experience} </h3>
                <div className='experience' style={{ width: '200px' }}>
                    <div className='experienceBar' style={{ width: `${Number(user.experience) / 10000 * 100}%` }}></div>
                </div>
                <h3>Sailing titles</h3>
                <h3>Language</h3>
                {
                    user.languages.map(language =>
                        <span key={language} className='m-1 btn btn-outline-dark'>{language}</span>
                    )
                }
            </div>

            <button onClick={() => props.history.push('/home')}>go Home</button>
        </div>}

    </section>)
}


export default withRouter(ProfileInfo)