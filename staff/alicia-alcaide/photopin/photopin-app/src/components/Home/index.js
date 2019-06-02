import React from 'react'
import literals from './literals'
import YourMaps from '../YourMaps'
//import './index.sass'

function Home({ lang }) {

    const { title } = literals[lang]

    return <main className="home">
        <YourMaps lang={lang}/>
    </main>

}

export default Home