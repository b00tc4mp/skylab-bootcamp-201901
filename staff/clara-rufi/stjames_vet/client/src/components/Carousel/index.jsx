import React, { Component } from 'react'

import akita from '../images/akita.jpg'
import boyero from '../images/boyero.jpg'
import british from '../images/british.jpeg'
import british_cat from '../images/british_cat.jpg'
import tortoise from '../images/tortoise.jpg'
import './index.sass'


class Carousel extends Component {


    render(){

        return  <div class="container">
        <div id="myCarousel" class="carousel slide" data-ride="carousel">
 
           <div class="carousel-inner">
            <div class="item active">
              <img class="d-block w-100" src={boyero} alt=""></img>
            </div>
            <div class="item">
              <img class="d-block w-100" src={tortoise} alt=""></img>
            </div>
            <div class="item">
              <img class="d-block w-100" src={british_cat} alt=""></img>
            </div>
          
            <div class="item">
              <img class="d-block w-100" src={akita} alt="" ></img>
            </div>
          
            <div class="item">
              <img class="d-block w-100" src={british} alt=""></img>
            </div>
          </div>
          <a class="left carousel-control" href="#myCarousel" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="right carousel-control" href="#myCarousel" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
  
        
        <div className="slogan">
        <p>Your neighborhood vet</p>
        <p>We love like you do</p>
        </div>
     
     </div>
    }
}


export default Carousel