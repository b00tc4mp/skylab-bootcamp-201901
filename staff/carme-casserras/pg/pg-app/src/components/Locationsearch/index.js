import React, { useState } from 'react'
import './index.sass'
import logic from '../../logic'


const nameLocation = {

    0: 'Poblenou',
    1: 'Glories',
    2: 'Plaça Catalunya',
    3: 'Plaça Urquinaona',
    4: 'Sants',
    5: 'Sagrada Familia',
    6: 'Gracia',
    7: 'Sant Andreu',
    8: 'Gotic'
}

function LocationSearch() {

    const [query, setQuery] = useState(null)

    const handleQuery = e => {
        const { value } = e.target
        setQuery(value)
    }

    const renderLocation = () => (
        <div>
            {
                Object.keys(nameLocation).map(cat => {
                    const id = nameLocation[cat]

                    return (

                        <div key={id}>
                            <input type="checbox" onchange={handleQuery} value={id} name={id} />
                            <label htmlFor={id}>
                                <h1>{id}</h1>
                                <img />
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
            <div>
                <iframe src="https://www.google.com/maps/d/embed?mid=16P1m6IsdnoO_Jb9whdflYnq3tsAF8lfy" width="640" height="480"></iframe>
            </div>
        </div>
    )
}
export default LocationSearch
