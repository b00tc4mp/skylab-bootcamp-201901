import React from 'react'

function StartIntro({ exercises }) {

    return (
        <section className="start__intro">
            {exercises.map(({ exercise, completed }, index) => 
                <h4 className={`subtitle`} key={index}>
                    <i className='material-icons'>{completed? 'done_outline' : 'arrow_right' }</i>{exercise.title}
                </h4>)}
        </section>
    )
}

export default StartIntro