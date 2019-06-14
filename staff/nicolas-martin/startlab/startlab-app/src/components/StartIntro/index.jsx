import React from 'react'

function StartIntro({ exercises, idActiveExercise }) {

    return (
        <section className="start__intro">
            <h1 className="start__intro__title title is-4">{exercises.length} exercises</h1>
            {
                exercises.map(({ exercise, completed }, index) =>
                <p className={`start__intro__exercise ${completed? 'done' : 'todo' } ${(idActiveExercise === exercise._id)? 'activeExercise' : ''}`} key={index}>
                    {exercise.title} 
                    <i className='material-icons'>{completed? 'done_outline' : '' }</i>
                </p>

            )}
        <hr /></section>
    )
}

export default StartIntro