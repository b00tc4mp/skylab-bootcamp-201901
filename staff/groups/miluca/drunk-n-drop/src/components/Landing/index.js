
import Slider from "react-slick";
import React, { Component } from 'react'


class Landing extends Component {
  render() {
    var settings = {
      dots: false,
      autoplay: true
    };
    return (
      <div className="container">
        <Slider {...settings}>
          <div>
          <img src="https://cdn.funcheap.com/wp-content/uploads/2016/11/2bfcacf2-c580-4b60-aa95-8b5616d5c3501.jpg"/>
          </div>
          <div>
          <img src="https://theculturetrip.com/wp-content/uploads/2015/08/27126168565_fde7898595_k.jpg"/>
          </div>
          <div>
          <img src="https://themadrex.com/wp-content/uploads/2018/04/cocktail-857393_1280.jpg"/>
          </div>
        
        </Slider>
      </div>
    );
  }
}


export default Landing