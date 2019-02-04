import React, { Component } from 'react'
// import search from '../'
import './index.sass'


class Result extends Component{
    
    render() {

        const { recipes } = this.props

        return <section className="results">
            <h3><u>Recipes:</u></h3>
            <div className="card_columns">  

            {
                recipes.map(recipes => (
                    <div className= "card">
                         <div className="card-body">       
                            <h5 className="card-title">{recipes.hits.label}</h5>                 
                            <img className="card-img-top" alt="recipe" src={recipes.hits.image}/>
                            <div class="bar">
                            <div small className="bar_calories">Total calories: {Math.floor(Math.round(recipes.hits.totalNutrients.ENERC_KCAL.quantity))}</div>
                            </div>
                            <p></p>
                            <div class="bar">
                            <div className="bar_carbs">Total Carbs: {Math.floor(Math.round(recipes.hits.totalNutrients.CHOCDF.quantity))}</div>
                            </div>
                            <p></p>
                            <div class="bar">
                            <div className="bar_protein">Total Protein: {Math.floor(Math.round(recipes.hits.totalNutrients.PROCNT.quantity))}</div> 
                            </div>
                            <p></p>
                            <div class="bar">
                            <div className="bar_fats">Total Fats: {Math.floor(Math.round(recipes.hits.totalNutrients.FAT.quantity))}</div>                              
                            </div>
                        </div>
                    </div>
                    ))
            }  
            </div>
        </section>
        }
                    
    }                

export default Result
