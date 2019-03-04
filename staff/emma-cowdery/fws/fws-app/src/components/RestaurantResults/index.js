import React,  { Fragment, useState } from 'react'
import Navbar from '../NavBar'

export default function RestaurantResults() {
    const [results, setResults] = useState()

    function setResults(results) {
        setResults(results)
    }

    return (
        <Fragment>
            <Navbar setResults={setResults}/>
            <main>
                <p>Results</p>
            </main>
        </Fragment>
    )
}