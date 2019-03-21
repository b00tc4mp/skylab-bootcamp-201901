import React from 'react'
import { withRouter} from 'react-router-dom'

import Search from '../Search'

import './index.sass'

function Landing(props) {
    
    const { search } = props

    return (<main className="landing">
        <div className='lookingFor'>
            <div className='lookingFor__item'>
                <p className='lookingFor__label'>A Boat</p>
                <div className='search'>
                    <Search search={search} />
                </div>
            </div>
            <button className='lookingFor__crew' onClick={() => props.history.push('/users')}>
                A Crew
            </button>
            <h2 className='landing__title'>Find your next sailing adventure!</h2>
        </div>
    </main>)
}

export default withRouter(Landing)