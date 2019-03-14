'use strict'

import React from 'react'
import './index.sass'
import Feedback from '../Feedback'
import logic from '../../logic'
import LineArtist from '../LineArtist'

function Results({ title, results, onItemClick, onToggleFavorite, feedback }) {

    // onSaveComment = () =>{
    //     try{
    //         let text = document.getElementsByClassName(id).value
    //         logic.addCommenttoArtist(id, text)

    //     } catch (error){
    //         console.log(error.message)
    //     }
    // }
    return <section className="results">
        <h3>{title}</h3>
        {feedback && <Feedback message={feedback} level="warn" />}
        <ul>
            {results && results.map(({ id, title, isFavorite }) => 
                <LineArtist id = {id} onItemClick = {onItemClick} title={title}></LineArtist>
        //     <li className="results__item" key={id}><a href="#" onClick={(event) => { event.preventDefault(); return onItemClick(id);}}>{title}</a> <i className={`${isFavorite? 'fas' : 'far'} fa-heart`} onClick={() => onToggleFavorite(id)}></i>
        //     <form>
        //     <textarea className={id} rows="7" cols="35"></textarea>
        //     <button id={id} onClick={this.onSaveComment(id)}>Save</button>
        // </form>
        // </li>
        )}
        </ul>
        
    </section>
}

export default Results