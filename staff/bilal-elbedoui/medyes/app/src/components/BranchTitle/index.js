import React from 'react'
import './index.sass'

function BranchTitle({ title, click }) {


    return (

        <a className='branchTitle' onClick={click} >
            <h1>
                {title}
            </h1>

        </a>
    )
}


export default BranchTitle