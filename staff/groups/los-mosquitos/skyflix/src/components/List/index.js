import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import logic from '../../logic'

function List({ movieList, onItem }) {


    return (
        <div>

            <h1>Movies that I have to see</h1>
            <ul>



                {
                    movieList.map(({ id, title, poster_path: image }) => {
                        let imagePath
                        imagePath = `https://image.tmdb.org/t/p/w300/${image}`
                        return <li key={id} onClick={() => onItem(id)}>
                            <div>

                                <FontAwesomeIcon icon={faTrashAlt} onClick={e => {
                                    e.stopPropagation()
                                    
                                    logic.removeFromMovieUserList(id)
                                }}
                                />

                            </div>
                            <h2>{title}</h2>
                            <img src={imagePath} />



                        </li>
                    })
                }

            </ul>
        </div>
    )

}

export default List