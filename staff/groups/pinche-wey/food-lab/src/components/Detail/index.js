import React from 'react'
import './index.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStartSolid } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'

function Detail({ item: { meals }, onBack, onWaiting, error, wanted, done, notes, forks, onNotes, onForks }) {

    const { idMeal: id, strMeal: title, strCategory: category, strArea: area, strInstructions: steps, strMealThumb: img } = meals[0]

    const star = forks[done.indexOf(id)]

    function handleClick(n) {
        if (n !== forks[star]) {
            let changes = n
           
            onForks(done.indexOf(id), changes, forks)
        }
    }

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
            {done.indexOf(id) !== -1 && <>
                <p>My Notes:</p>
                <div id="rateMe" title="Rate It!">
                    <FontAwesomeIcon onClick={e => {
                        e.stopPropagation()
                        
                        handleClick(1)
                    }} icon={star === 0 ? faStarRegular : faStartSolid} />
                    <FontAwesomeIcon onClick={e => {
                        e.stopPropagation()
                        
                        handleClick(2)
                    }} icon={star <= 1 ? faStarRegular : faStartSolid} />
                    <FontAwesomeIcon onClick={e => {
                        e.stopPropagation()
                        
                        handleClick(3)
                    }} icon={star <= 2 ? faStarRegular : faStartSolid} />
                    <FontAwesomeIcon onClick={e => {
                        e.stopPropagation()
                        
                        handleClick(4)
                    }} icon={star <= 3 ? faStarRegular : faStartSolid} />
                    <FontAwesomeIcon onClick={e => {
                        e.stopPropagation()
                        
                        handleClick(5)
                    }} icon={star <= 4 ? faStarRegular : faStartSolid} />
                </div>
            </>}
            {done.indexOf(id) !== -1 && <textarea id="notes" className="detail__textarea" onBlur={() => {
                let value = document.getElementById("notes").value
                if (value !== notes[done.indexOf(id)]) {

                    let index = done.indexOf(id)
                    let changes = value

                    onNotes(index, changes, notes)
                }
            }
            }>{notes[done.indexOf(id)]}</textarea>}
        </div>
    </section >
}

export default Detail