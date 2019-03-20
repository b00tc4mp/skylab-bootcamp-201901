'use strict'

import React from 'react'

import './index.sass'


function Feedback({message}) {

    return (<main className="feedback">
        <div className='feedback__container'>
           <p>{message}</p>
        </div>
    </main>)
}

export default Feedback