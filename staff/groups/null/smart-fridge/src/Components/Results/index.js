import React, { Component } from 'react'

// import search from '../'
import './index.sass'
import logic from '../../logic'


class Results extends Component{

onDetails= () =>{
    this.props.history.push('home/search/detail')
}

    render() {

        const user= JSON.parse(sessionStorage.getItem('user'))
        const maxCalories= logic.caloriesCounter(user.gender, user.height, user.weight, user.birthDate, user.lifeStyle)
        console.log(maxCalories)
        const { recipes } = this.props
        const maxFats= (maxCalories*30)/100
        const maxProtein= (maxCalories*30)/100
        const maxCarhohidrates= (maxCalories*40)/100


        return <section className="results">
            <div className="card_columns">  

            {
                recipes.map(recipe => (
                    <div className= "card col-lg-5">
                         <div className="card-body">       
                            <h5 className="card-title">{recipe.recipe.label}</h5>               
                            <img className="card-img-top" alt="recipe" src={recipe.recipe.image}></img><i class="far fa-heart"></i>  
                            <label>Total Calories:</label>
                                <div class="progressBarContainer">
                                    <div id="progressBar total" ref="progressBar"class="progressBar" style={{width: ((recipe.recipe.totalNutrients.ENERC_KCAL.quantity/ recipe.recipe.yield) / maxCalories)*100 + '%'}}>
                                    <p class="progressText" ref="progressText" id="progressText" style={{marginLeft: ((recipe.recipe.totalNutrients.ENERC_KCAL.quantity/ recipe.recipe.yield) / maxCalories)*100 + '%'}}>{(((recipe.recipe.totalNutrients.ENERC_KCAL.quantity/ recipe.recipe.yield) / maxCalories)*100).toFixed(2) + '%'}</p>
                                    </div>
                                </div>
                            <label>Total carbohydrates:</label>
                                <div class="progressBarContainer">
                                    <div id="progressBar" ref="progressBar"class="progressBar" style={{width: ((recipe.recipe.totalNutrients.CHOCDF.quantity/ recipe.recipe.yield) / maxCarhohidrates)*100 + '%'}}>
                                    <p class="progressText" ref="progressText" id="progressText" style={{marginLeft: ((recipe.recipe.totalNutrients.CHOCDF.quantity/ recipe.recipe.yield) / maxCarhohidrates)*100 + '%'}}>{(((recipe.recipe.totalNutrients.CHOCDF.quantity/ recipe.recipe.yield) / maxCarhohidrates)*100).toFixed(2) + '%'}</p>
                                    </div>
                                </div>
                            <label>Total protein:</label>
                                <div class="progressBarContainer">
                                    <div id="progressBar" ref="progressBar"class="progressBar" style={{width: ((recipe.recipe.totalNutrients.PROCNT.quantity/ recipe.recipe.yield) / maxProtein)*100 + '%'}}>
                                    <p class="progressText" ref="progressText" id="progressText" style={{marginLeft: ((recipe.recipe.totalNutrients.PROCNT.quantity/ recipe.recipe.yield) / maxProtein)*100 + '%'}}>{(((recipe.recipe.totalNutrients.PROCNT.quantity/ recipe.recipe.yield) / maxProtein)*100).toFixed(2) + '%'}</p>
                                    </div>
                                </div>
                            <label>Total fats:</label>
                            <div class="progressBarContainer">
                                    <div id="progressBar" ref="progressBar"class="progressBar" style={{width: ((recipe.recipe.totalNutrients.FAT.quantity/ recipe.recipe.yield) / maxFats)*100 + '%'}}>
                                    <p class="progressText" ref="progressText" id="progressText" style={{marginLeft: ((recipe.recipe.totalNutrients.FAT.quantity/ recipe.recipe.yield) / maxFats)*100 + '%'}}>{(((recipe.recipe.totalNutrients.FAT.quantity / recipe.recipe.yield) /maxFats)*100).toFixed(2) + '%'}</p>
                                    </div>
                            </div>
                            <div className="time">Total time: {recipe.recipe.totalTime}<span>minutes</span></div>            
                                <button className="btn btn-dark inline" onClick= {this.onDetails} type="submit">More details</button>
                                
                            <a className= "link_recipe" href={recipe.recipe.url}>Go to recipe</a>
                        </div>
                    </div>            
                ))
                }
                
            </div>
            </section>
            }

                        
    }                

export default Results                
                        
        