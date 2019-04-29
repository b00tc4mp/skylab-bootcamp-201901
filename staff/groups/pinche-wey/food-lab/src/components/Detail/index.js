import React from 'react'
import './index.sass'

function Detail({ item: { meals }, onBack, onWaiting, error, wanted, done, notes, onNotes }) {

    const { idMeal: id, strMeal: title, strCategory: category, strArea: area, strInstructions: steps, strMealThumb:img } = meals[0]

    return <section className="detail" key={id}>
        <div className="detail__title">
            <h2>{title}</h2>
            <button onClick={() => onBack()}>Go Back</button>
            {wanted.indexOf(id) === -1 && done.indexOf(id) === -1 && <button onClick={() => onWaiting(id)}>I want to cook it!</button>}
            {wanted.indexOf(id) !== -1 && <button onClick={() => onWaiting(id)}>I do not want to cook it!</button>}
            {wanted.indexOf(id) !== -1 && <button onClick={() => onWaiting(id, true)}>I done it!</button>}
        </div>
        <span>{error}</span>
        <img src={img} />
        <p>{steps}</p>
        <span>Category: {category} Area:{area}</span>
        <div className="detail__myNotes">
            {done.indexOf(id) !== -1 && <p>My Notes:</p>}
            {done.indexOf(id) !== -1 && <textarea id="notes" className="detail__textarea" onBlur={() => {
                let value = document.getElementById("notes").value
                if (value !== notes[done.indexOf(id)]) {

                    let index = done.indexOf(id)
                    let changes = value
                    console.log(index)
                    console.log(changes)
                    console.log(notes[index])
                    onNotes(index, changes, notes)
                }
            }
            }>{notes[done.indexOf(id)]}</textarea>}
        </div>
    </section >
}

export default Detail