import React from 'react'
import { withRouter} from 'react-router-dom'

import Search from '../Search'

import './index.sass'

function Landing(props) {
    
    const { search } = props

    return (<main className="landing">
        <h2 className='landing__title'>Find your next sailing adventure!</h2>
        <div className='lookingFor'>
            <div className='lookingFor__item row'>
                <p className='lookingFor__label col-12 col-sm-3'>A Boat</p>
                <div className='search col-12 col-sm-9'>
                    <Search search={search} />
                </div>
            </div>
            <button className='lookingFor__crew' onClick={() => props.history.push('/users')}>
                A Crew
            </button>
        </div>
    </main>)
}

export default withRouter(Landing)