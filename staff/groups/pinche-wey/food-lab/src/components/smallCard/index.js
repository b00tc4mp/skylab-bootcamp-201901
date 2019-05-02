import React from 'react'
import logic from '../../logic';
import './index.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'


function SmallCard({ toPaint, onItem, done, forks }) {
   
    // recibe un array y devuelve el mismo array mezclando 
    // en orden aleatorio sus elementos
    function shuffle(a, newLen) {
        let j, x, i
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1))
            x = a[i]
            a[i] = a[j]
            a[j] = x
        }
        a.length = newLen
    }

    // sólo llamamos a shuffle si toPaint !== null && su longitud es mayor que 5
    if ((toPaint) && (toPaint.length > 5)) {
        shuffle(toPaint, 5)
    }

    return <div>
        {
            toPaint && toPaint.map(({ idMeal: id, strMeal: title, strMealThumb: img }) => {
                return <span className="smallCard__container" key={id} onClick={() => onItem(id)}>
                    <div className='smallCard__img'>
                        <img src={img} />
                    </div>
                    <h4 className='smallCard__title' >{title}</h4>
                    <>
                        {done.indexOf(id) > 0 && <FontAwesomeIcon icon={forks[done.indexOf(id)] === 0 ? faStarRegular : faStarSolid} />}
                        {done.indexOf(id) > 0 && <FontAwesomeIcon icon={forks[done.indexOf(id)] <= 1 ? faStarRegular : faStarSolid} />}
                        {done.indexOf(id) > 0 && <FontAwesomeIcon icon={forks[done.indexOf(id)] <= 2 ? faStarRegular : faStarSolid} />}
                        {done.indexOf(id) > 0 && <FontAwesomeIcon icon={forks[done.indexOf(id)] <= 3 ? faStarRegular : faStarSolid} />}
                        {done.indexOf(id) > 0 && <FontAwesomeIcon icon={forks[done.indexOf(id)] <= 4 ? faStarRegular : faStarSolid} />}
                    </>
                </span>
            })
        }
    </div>
}

export default SmallCard