import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import './index.sass'
import logic from '../../logic'
import LocationResults from '../Locationresults'

const nameLocation = {

    0: 'Poblenou',
    1: 'Glories',
    2: 'Plaça Catalunya',
    3: 'Sagrada Familia',
    4: 'Enric Granados',
    5: 'Gotic',

    // 6: 'Gracia',
    // 7: 'Sant Andreu',
    // 8: 'Gotic'
}

function LocationSearch() {

    const [query, setQuery] = useState(null)

    const handleSearchByLocation = id => {

        // if (!logic.isUserLoggedIn) props.history.push('./login')
        // else props.history.push('/search/locations/')
    }

    const renderLocation = () => (
        <div>
            {
                Object.values(nameLocation).map(name => {
                    
                    return (

                        <div key={name} onClick={()=> handleSearchByLocation(name)}>
                            <label htmlFor={name}>
                                <h1>{name}</h1>
                            </label>
                        </div>
                    )
                })
            }
        </div>
    )

    return (
        <div>
            <form>
                {renderLocation()}
            </form>
            {query && <LocationResults query={query}/>}
            {/* <div>
                <iframe src="https://www.google.com/maps/d/embed?mid=16P1m6IsdnoO_Jb9whdflYnq3tsAF8lfy" width="640" height="480"></iframe>
            </div> */}
        </div>
    )
}
export default withRouter(LocationSearch)
