import React, { useState, useEffect } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'

import Language from '../Language'

import { data } from 'sail-away-data'
import logic from '../../logic'
import UserCard from '../UserCard'

import Feedback from '../Feedback'

import './index.sass'

function Users(props) {

    let [languages, setLanguages] = useState([])
    let [talents, setTalents] = useState([])
    let [users, setUsers] = useState([])
    let [user, setUser] = useState(null)
    let [feedback, setfeedback] = useState('')

    let [counter, setCounter] = useState(1)

    function handleChange(event, index) {
        let newTalent = event.target.value

        if (index === talents.length - 1) talents = newTalent === 'Select talent' ? [...talents] : [...talents, event.target.value]
        else talents.splice(index, 1, newTalent)

        console.log(talents)
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

    }, [])

    useEffect(() => {
        setLanguages(languages)
        setTalents(talents)
        setUsers(users)
    }, [languages, talents, users])

    async function handleSearch() {
        try {
            setfeedback('')
            let findedUsers = await logic.searchUseres(talents, languages)
            findedUsers.length ? setUsers(findedUsers) : setfeedback('No results for this parameters. Try something different :)')
            getUserLogged()
            setLanguages([])
            setTalents([])


        } catch (error) {
            console.error(error)
        }
    }

    function handleDelteTalent(index) {
        setCounter(--counter)
        talents.splice(index, 1)

        setTalents(talents)
        console.log(languages)
    }

    return (<section className='users'>
        <div className='users__background'>

            <div className='users__search'>
                <div className='users__search-item'>
                    <h5>Talents</h5>
                    <main className="talents">
                        {
                            [...Array(counter)].map((count, index) =>
                                <div>
                                    <select name="talents" onChange={event => handleChange(event, index)} key={counter} value={talents[index]} className='languages__language'>
                                        <option value={'Select talent'} key={'select talent'}>Select talent</option>
                                        {
                                            data.talents.map(talent => talent.offers.map(talent => <option value={talent} key={talent}>{talent}</option>))
                                        }
                                    </select>
                                    <button onClick={() => handleDelteTalent(index)} className="fas fa-times languages__deleteButton"></button>
                                </div>
                            )

                        }
                        {counter < 8 && <button className='languages__addButton' onClick={() => setCounter(++counter)}>Add talent</button>}
                    </main>

                </div>

                <div className='users__search-item'>
                    <h5>Language</h5>
                    <Language getLanguages={languages => setLanguages(languages)} initialLanguages={[]} />

                </div>
            </div>
            <button onClick={handleSearch} className='users__search-button'> Search </button>
        </div>
        {feedback ? <Feedback message={feedback} /> : <div />}
        {!feedback ? <UserCard users={users} /> : <div />}

    </section>)
}

export default withRouter(Users)