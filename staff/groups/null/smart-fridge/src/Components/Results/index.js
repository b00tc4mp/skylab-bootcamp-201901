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
                recipes.map(recipe => (
                    <div className= "card">
                         <div className="card-body">       
                            <h5 className="card-title">{recipe.label}</h5>                 
                            <img className="card-img-top" alt="recipe" src={recipe.image}/>
                            <div class="bar">
                            <div small className="bar_calories">Total calories: {Math.round((recipe.totalNutrients.ENERC_KCAL.quantity)/recipes.yield)}</div>
                            </div>
                            <p></p>
                            <div class="bar">
                            <div className="bar_carbs">Total Carbs: {Math.round((recipe.totalNutrients.CHOCDF.quantity)/recipes.yield)}</div>
                            </div>
                            <p></p>
                            <div class="bar">
                            <div className="bar_protein">Total Protein: {Math.round((recipe.totalNutrients.PROCNT.quantity)/recipes.yield)}</div> 
                            </div>
                            <p></p>
                            <div class="bar">
                            <div className="bar_fats">Total Fats: {Math.round((recipe.totalNutrients.FAT.quantity)/recipes.yield)}</div>                              
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
