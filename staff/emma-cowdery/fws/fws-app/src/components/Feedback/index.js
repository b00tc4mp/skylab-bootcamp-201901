import React, { Fragment, useState, useEffect} from 'react'
import './index.sass'

export default function Feedback ({feedback, type, level, setFeedback}) {

    return (
        <Fragment>
            <div className={`feedback feedback__${type} feedback__${level}`}>
                {type === 'banner' && <i className="fas fa-times feedback__times" onClick={e => {e.preventDefault(); setFeedback()}}></i>}
                <p className='feedback__txt'>{feedback}</p>
            </div>
        </Fragment>
    )
}