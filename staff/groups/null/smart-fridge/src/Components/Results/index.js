import React, { Component } from 'react'
// import search from '../'
import './index.sass'
import logic from '../../logic'


class Results extends Component{

    move=() => {
        var elem = document.getElementById("progressBar");
        var text = document.getElementById("progressText") 
        var width = 0;
        var id = setInterval(frame, 20);
        function frame() {
          if (width >= 33) {
            clearInterval(id);
          } else {
            width++; 
            elem.style.width = width + '%';
            text.style.marginLeft = width + '%';
            text.innerHTML = width * 1  + '%';
          }
        }
    }
    
    follow=()=> {
        const elem = document.getElementById("slider")
        const follower = document.getElementById("range-follow")
        follower.style.width = (elem.value * (elem.offsetWidth - 16)) / elem.max + 'px' 
    }

    render() {

        const user= JSON.parse(sessionStorage.getItem('user'))
        const maxCalories= logic.caloriesCounter(user.gender, user.height, user.weight, user.birthDate, user.lifeStyle)
        console.log(maxCalories)
        const { recipes } = this.props

        return <section className="results">
            <h3><u>Recipes:</u></h3>
            <div className="card_columns">  

            {





                recipes.map(recipe => (
                    <div className= "card">
                         <div className="card-body">       
                            <h5 className="card-title">{recipe.recipe.label}</h5>                 
                            <img className="card-img-top" alt="recipe" src={recipe.recipe.image}/>
                            <div onClick={this.move.bind(this)}>
                                <div class="progressBarContainer">
                                    <div id="progressBar" class="progressBar">
                                        <p class="progressText" id="progressText">60%</p>
                                    </div>
                                </div>

                                <div class="progressBarContainer">
                                    <div id="progressBar" class="progressBar">
                                        <p class="progressText" id="progressText">60%</p>
                                    </div>
                                </div>

                                
                            </div>
                            <label>Total Calories</label>
                                <div id="range-follow" class="range-follow">
                                    <input class="slider" id="slider" onmousemove="follow()" type="range" min="0" max="100" value={Math.round((recipe.recipe.totalNutrients.ENERC_KCAL.quantity)/recipe.recipe.yield)} />
                                </div>
                            <p></p>
                            <label>Total carbohydrates:</label>
                                <div id="range-follow" class="range-follow">
                                    <input class="slider" id="slider" onmousemove="follow()" type="range" min="0" max="100" value={Math.round((recipe.recipe.totalNutrients.CHOCDF.quantity)/recipe.recipe.yield)} />
                                </div>
                            <p></p>
                            <label>Total protein:</label>
                                <div id="range-follow" class="range-follow">
                                    <input class="slider" id="slider" onmousemove="follow()" type="range" min="0" max="100" value={Math.round((recipe.recipe.totalNutrients.PROCNT.quantity)/recipe.recipe.yield)}/>
                                </div>
                            <label>Total fats:</label>
                                <div id="range-follow" class="range-follow">
                                    <input class="slider" id="slider" onmousemove="follow()" type="range" min="0" max="100" value= {Math.round((recipe.recipe.totalNutrients.FAT.quantity)/recipe.recipe.yield)}/>
                                </div>
                    </div>
                    </div>
                ))
            }
               
            </div>
        </section>
        }
        
                    
    }                

export default Results
