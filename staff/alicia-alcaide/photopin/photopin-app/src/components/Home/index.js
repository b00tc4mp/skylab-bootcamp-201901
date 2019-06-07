import React from 'react'
import literals from './literals'
import YourMaps from '../YourMaps'

function Home({ lang }) {

    const { title } = literals[lang]


    return <section className="home">
        <div className="uk-position-center">
            <YourMaps lang={lang} />
        </div>
    </section>

}

export default Home