import React, { useState, useEffect } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'

import Language from '../Language'

import { data } from 'sail-away-data'
import logic from '../../logic';
import SlideShow from '../SlideShow';

function Users(props) {

    let [languages, setLanguages] = useState([])
    let [talents, setTalents] = useState([])
    let [users, setUsers] = useState([])
    let [user, setUser] = useState(null)
    let isFavorite

    let [counter, setCounter] = useState(1)

    function handleChange(event) {
        let newTalent = event.target.value
        talents = newTalent === 'Select talents' ? [...talents] : [...talents, event.target.value]

        setTalents(talents)
    }

    async function getUserLogged() {
        try {
                let userLogged = await logic.retrieveUserLogged()
                setUser(userLogged)
        } catch (error) {
                console.error(error)
        }
    }

    useEffect(() => {
        getUserLogged()
    }, [])

    useEffect(() => {
        setLanguages(languages)
        setTalents(talents)
        setUsers(users)
    }, [languages, talents, users])

    async function handleSearch() {
        try {
            debugger
            let findedUsers = await logic.searchUseres(talents, languages)
            setLanguages([])
            setTalents([])
            setUsers(findedUsers)

        } catch (error) {
            console.error(error)
        }
    }

    async function toggleFavorite(crewId) {
        try {
                let userUpdated = await logic.toggleCrewFavorite(crewId)
                setUser(userUpdated)
        } catch (error) {
                console.error(error)
        }
}

    return (<section>
        <div className='searc-users'>
            <h3 className='text-center'>Looking for</h3>
            <h5>Talents</h5>
            <main className="talents">
                {
                    [...Array(counter)].map((input, index) =>
                        <select name="talents" onChange={handleChange} >
                            <option value={'select talent'} key={'select talent'}>select talent</option>
                            {
                                data.talents.map(talent => {
                                    return talent.offers.map(talent => <option value={talent} key={talent}>{talent}</option>)

                                })
                            }
                        </select>
                    )

                }
                <button onClick={() => setCounter(++counter)}>Add talent</button>
                <button onClick={() => setCounter(--counter)}>Delete talent</button>

            </main>
            <h5>Sailing titles</h5>
            <h5>Language</h5>
            <Language getLanguages={languages => setLanguages(languages)} initialLanguages={[]} />
            <button onClick={handleSearch}> Search </button>
        </div>

        {users.length &&
            <div className='row'>
                {
                    users.map(crew => {
                        if (user) isFavorite = user.favoriteCrew.includes(crew.id) ? isFavorite = "danger" : isFavorite = "default"
                        return (<section className='col-12 col-md-6 col-lg-4'>
                            <div>
                                <button onClick={() => props.history.push(`/user/${crew.id}`)}>more</button>
                                <button>contact</button>

                                <button onClick={() => toggleFavorite(crew.id)} className={`favorite btn btn-outline-${isFavorite} col-1 fas fa-heart`}></button>
                            </div>
                            <div>
                                <SlideShow pictures={crew.pictures} />
                            </div>
                            <div>
                                <p>{crew.name} {crew.surname}</p>
                            </div>
                        </section>)
                    })
                }
            </div>}


    </section>)
}

export default withRouter(Users)