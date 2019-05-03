
import Slider from "react-slick";
import React, { Component } from 'react'
import './index.sass'


class Landing extends Component {
  render() {
    var settings = {
      dots: false,
      autoplay: true
    };
    return (
     
    <div className="container-fluid landing_background">
      <div class="container">
        <Slider {...settings}>             
          <section class="hero is-medium is-primary is-bold container-image2">
            <div class="hero-body">
              <div class="container">
                 <h1 class="title">
                  DRUNK'DROP
                </h1>               
              </div>
             </div>
          </section>
          <section class="hero is-medium is-primary is-bold container-image1">
            <div class="hero-body ">
              <div class="container">                
              <h1 class="title">
                  DRUNK'DROP
                </h1> 
              </div>
            </div>
          </section>
          <section class="hero is-medium is-primary is-bold container-image3">
            <div class="hero-body">
              <div class="container">
              <h1 class="title">
                  DRUNK'DROP
                </h1> 
              </div>
            </div>
          </section>
        </Slider>
      </div>
    </div>    
        

    );
  }
}


export default Landing