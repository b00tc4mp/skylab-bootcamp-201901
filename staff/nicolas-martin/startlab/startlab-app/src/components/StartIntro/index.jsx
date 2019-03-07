import React from 'react'

function StartIntro({ exercises }) {
    return (
        <ul className="start-intro">
            {exercises.map(({ exercise, completed }, index) => 
                <li className={`${completed}`} key={index}>{exercise.title}</li>)}
        </ul>
    )
}

export default StartIntro