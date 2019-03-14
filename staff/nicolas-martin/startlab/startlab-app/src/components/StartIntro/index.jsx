import React from 'react'

function StartIntro({ exercises }) {

    return (
        <section className="start__intro">
            {exercises.map(({ exercise, completed }, index) => <li className={`${completed}`} key={index}>{exercise.title}</li>)}
        </section>
    )
}

export default StartIntro