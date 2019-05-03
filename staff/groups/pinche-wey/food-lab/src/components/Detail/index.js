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
        <div className="detail-container">
            <div className='detail-container-sup' >
                <div className='detail__img' >
                    <img src={img} />
                </div>

                <div className='detail__nav'>
                    <div>
                        <button className="detail__button" onClick={() => onBack()}>Go Back</button>
                        {wanted.indexOf(id) !== -1 && <button onClick={() => onWaiting(id)}>Remove from boiling!</button>}
                        {wanted.indexOf(id) === -1 && done.indexOf(id) === -1 && <button onClick={() => onWaiting(id)}>I want to cook it!</button>}
                        {wanted.indexOf(id) !== -1 && <button onClick={() => onWaiting(id, true)}>Cocked!</button>}
                    </div>
                    <div className='detail__ingredients'>
                        <h3>Ingredients:</h3>
                        {meals[0].strIngredient1 && <p>{meals[0].strMeasure1}: {meals[0].strIngredient1}</p>}
                        {meals[0].strIngredient2 && <p>{meals[0].strMeasure2}: {meals[0].strIngredient2}</p>}
                        {meals[0].strIngredient3 && <p>{meals[0].strMeasure3}: {meals[0].strIngredient3}</p>}
                        {meals[0].strIngredient4 && <p>{meals[0].strMeasure4}: {meals[0].strIngredient4}</p>}
                        {meals[0].strIngredient5 && <p>{meals[0].strMeasure5}: {meals[0].strIngredient5}</p>}
                        {meals[0].strIngredient6 && <p>{meals[0].strMeasure6}: {meals[0].strIngredient6}</p>}
                        {meals[0].strIngredient7 && <p>{meals[0].strMeasure7}: {meals[0].strIngredient7}</p>}
                        {meals[0].strIngredient8 && <p>{meals[0].strMeasure8}: {meals[0].strIngredient8}</p>}
                        {meals[0].strIngredient9 && <p>{meals[0].strMeasure9}: {meals[0].strIngredient9}</p>}
                        {meals[0].strIngredient10 && <p>{meals[0].strMeasure10}: {meals[0].strIngredient10}</p>}
                        {meals[0].strIngredient11 && <p>{meals[0].strMeasure11}: {meals[0].strIngredient11}</p>}
                        {meals[0].strIngredient12 && <p>{meals[0].strMeasure12}: {meals[0].strIngredient12}</p>}
                    </div>

                </div>
            </div>

            <h2 className="detail__desc-title" >{title}</h2>
            <div className='detail__desc' >
                <h3>Instructions:</h3>
                <p className='detail_desc-instructions'>{steps}</p>
            </div>
            <div className='detail__tags-cont'>
                {area && <p className='detail__tags'>{area}</p>}
                {category && <p className='detail__tags'>{category}</p>}
            </div>



        </div>




        <span>{error}</span>
        <div className="detail__myNotes">
            {done.indexOf(id) !== -1 && <>
                <p className="detail__myNotes-title" >Puntuation:</p>
                <div id="rateMe" title="Rate It!">
                    <FontAwesomeIcon className='detail__myNotes-star' onClick={e => {
                        e.stopPropagation()

                        handleClick(1)
                    }} icon={star === 0 ? faStarRegular : faStartSolid} />
                    <FontAwesomeIcon className='detail__myNotes-star' onClick={e => {
                        e.stopPropagation()

                        handleClick(2)
                    }} icon={star <= 1 ? faStarRegular : faStartSolid} />
                    <FontAwesomeIcon className='detail__myNotes-star' onClick={e => {
                        e.stopPropagation()

                        handleClick(3)
                    }} icon={star <= 2 ? faStarRegular : faStartSolid} />
                    <FontAwesomeIcon className='detail__myNotes-star' onClick={e => {
                        e.stopPropagation()

                        handleClick(4)
                    }} icon={star <= 3 ? faStarRegular : faStartSolid} />
                    <FontAwesomeIcon className='detail__myNotes-star' onClick={e => {
                        e.stopPropagation()

                        handleClick(5)
                    }} icon={star <= 4 ? faStarRegular : faStartSolid} />
                </div>
            </>}
            {done.indexOf(id) !== -1 && <textarea id="notes" placeholder="My notes" className="detail__myNotes-textarea" onBlur={() => {
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