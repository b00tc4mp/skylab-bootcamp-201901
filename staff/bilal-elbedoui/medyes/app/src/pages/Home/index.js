import React, {useState} from 'react'
import './index.sass'



import BranchTitle from '../../components/BranchTitle'

function Home() {

    const handleBranch = () => {
        alert('HOLA')
    }


    return (
        <section className='home'>
            <BranchTitle title={'Tituloooo 1'} click={handleBranch} />
            <BranchTitle title={'Tituloooo 2'} click={handleBranch} />
            <BranchTitle title={'Tituloooo 3'} click={handleBranch} />
            <BranchTitle title={'Tituloooo 4'} click={handleBranch} />
        </section>
    )
}


export default Home