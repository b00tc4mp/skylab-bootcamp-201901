import { BrowserRouter as Router, Route, Link, Prompt, Switch, withRouter } from "react-router-dom";
import Slider from "react-slick";
import React from 'react'
import './index.sass'


function Detail(props) {

    

    const { detail ,favClick} = props

    const { id, name, image, instructions, glass, ingredients } = detail

    var settings = {
        dots: false,
        autoplay: true,
        infinite: true,
        arrows:false
    };
 
    return <div class="columns base" key={id}>
            <div class="column topInfo">
            <h1 class="title , topName">{name}</h1>
                <div class="favDesktop">
                <figure class="topImgae" >
                 <img class="cocktailImage" src={image}/>
                </figure>
                <i class="far fa-star fav" onClick={()=>favClick(id)}></i>
                </div>
            </div>
        <div class ="desktopVersion">
            <div class="centerFlex">
                <div class="column is-two-fifths centerInfo">
                <h1 class="title midName">Ingredients</h1>
                        <Slider {...settings}>
                            {
                                ingredients && ingredients.map(({ measure, image, ingredientName }) => {
                                    return <div className="container slider" key={ingredientName}>
                                        <div class="slider">
                                    
                                            <img class="detailsIngredient  detailsimg" src={image}/>
                                        
                                            <h5 class="title is-5 detailsIngredient ">{ingredientName}</h5>
                                            <h2 class="subtitle detailsIngredient ">{measure}</h2>
                                        </div>
                                        </div>
                                })
                            }
                        </Slider>   
                </div>
            </div>   
          
            <div class="column cocktailInfo">
                    <div class="instructionsInfo">
                        <h6 class="title  detailInfo">Instructions</h6>
                        <h6 class="title is-6 detailInfo">{instructions}</h6>
                    </div>
                    <div class="glassInfo">
                    <h6 class="title detailInfo detailInfoGlass">Glass</h6>
                    <figure class="image is-128x128">
                    <img   class ="glassImage"src="https://images-na.ssl-images-amazon.com/images/I/61kK8NnvtkL._SX466_.jpg"/>
                    </figure>
                    <h6 class="title is-6 detailInfo ">{glass}</h6>
                    </div>
            </div>
    </div>
       

    </div>

}

export default withRouter(Detail)