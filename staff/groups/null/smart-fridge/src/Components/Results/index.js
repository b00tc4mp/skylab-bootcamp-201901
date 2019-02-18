import React, { Component } from 'react'

import './index.sass'
import logic from '../../logic'


class Results extends Component {

    state={favourites: JSON.parse(sessionStorage.getItem('user')).favourites}

    handleOnDetail = recipeUri => {
        this.props.onDetail(recipeUri)
    }
    handleOnFavourite = recipe => {
        // this.isMarked(recipe.recipe.uri)
        this.props.onFavourite(recipe)
    }

    move = (info) => {
        let s = info.split('-')
        if (s.length > 1) {
            let elem = this.refs[info]
            let number =  Number(info.split('-')[1])

            var width = 0;
            var id = setInterval(frame, 20);

            function frame() {
            if (width >= number) {
                clearInterval(id);
            } else {
                width++; 
                elem && (elem.style.width = width + '%');
            }
            }
        }
    }
    componentDidMount() {
        Object.keys(this.refs).forEach(key => this.move(key))
    }

    render() {

        const user = JSON.parse(sessionStorage.getItem('user'))
        const maxCalories = logic.caloriesCounter(user.gender, user.height, user.weight, user.birthDate, user.lifeStyle)
        const { recipes } = this.props

        return <section className="results">

            <div className="card_columns row m-2 mt-5">
                {

                    recipes.map((recipe, n) => (
                        <div key={recipe.recipe.uri} className='col-12 col-sm-6 col-lg-4 mt-2 results__box'>
                            <div className="card p-2 mt-2">
                                <div className="card-body">
                                    <h5 className="card-title text-center">{recipe.recipe.label}</h5>
                                    <div className='results__image-favorite'>
                                        <img className="card-img-top" alt="recipe" src={recipe.recipe.image}></img>

                                        <i onClick={() => this.handleOnFavourite(recipe)} className={JSON.parse(sessionStorage.getItem('user')).favourites.find(favorite=> favorite.recipe.uri===recipe.recipe.uri)? "far fa-heart fa-heart-red":"far fa-heart" }></i>

                                    </div>

                                    <div className='mt-4 flex'>
                                        <label className='font-weight-bold mb-0 results__nutrients'>Total Calories: <span className='font-weight-normal'>{(((recipe.recipe.totalNutrients.ENERC_KCAL.quantity / recipe.recipe.yield))).toFixed() + 'Kcal'}</span></label>
                                        <div className="progressBarContainer">
                                            <div id="progressBar total" ref={`progressBar${n}-${((recipe.recipe.totalNutrients.ENERC_KCAL.quantity / recipe.recipe.yield) / maxCalories) * 100 }`} className="progressBar">
                                            </div>
                                        </div>
                                        <label className=' mt-3 mb-0  results__nutrients'>Carbohydrates</label>
                                        <div className="progressBarContainer-nutrients">
                                            <div id="progressBar" ref="progressBar" className="progressBar-nutrients" style={{ width: ((recipe.recipe.totalNutrients.CHOCDF.quantity / recipe.recipe.yield) / (recipe.recipe.totalNutrients.ENERC_KCAL.quantity / recipe.recipe.yield)) * 100 * 4 + '%' }}>
                                            </div>
                                        </div>
                                        <label className=' results__nutrients  mb-0'>Proteins</label>
                                        <div className="progressBarContainer-nutrients">
                                            <div id="progressBar" ref="progressBar" className="progressBar-nutrients" style={{ width: ((recipe.recipe.totalNutrients.PROCNT.quantity / recipe.recipe.yield) / (recipe.recipe.totalNutrients.ENERC_KCAL.quantity / recipe.recipe.yield)) * 100 * 4 + '%' }}>
                                            </div>
                                        </div>
                                        <label className='results__nutrients mb-0'>Fats</label>
                                        <div className="progressBarContainer-nutrients">
                                            <div id="progressBar" ref="progressBar" className="progressBar-nutrients" style={{ width: ((recipe.recipe.totalNutrients.FAT.quantity / recipe.recipe.yield) / (recipe.recipe.totalNutrients.ENERC_KCAL.quantity / recipe.recipe.yield)) * 100 * 9 + '%' }}>
                                            </div>
                                        </div>
                                        <div className='row mt-4'>
                                            {recipe.recipe.totalTime ? <div className="results__time font-weight-bold col-6 p-0 ">Cooking time <br /><span className='font-weight-normal'> {recipe.recipe.totalTime} minutes</span></div> : <div className="results__time font-weight-bold col-6 p-0 "></div>}
                                            <div className="col-6 pr-2">
                                                <button className="btn btn-dark inline mt-2" onClick={()=>this.handleOnDetail(recipe.recipe.uri)}>More details</button>
                                            </div>
                                        </div>
                                    </div>
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

