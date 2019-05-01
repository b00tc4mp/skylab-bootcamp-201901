import Slider from "react-slick";
import React from 'react'

function Detail({ detail }) {


    const { id, name, image, instructions, glass, ingredients } = detail

    var settings = {
        dots: false,
        autoplay: true
    };

    return <>
        <ul key={id}>
            <li >
                <h2>{name}</h2>
                <img src={image} />
                <span>{instructions}</span>
                <span>{glass}</span>

            </li>
            <ul>

                {
                    ingredients && ingredients.map(({ measure, image, ingredientName }) => {
                        return <div className="container" key={ingredientName}>
                            <Slider {...settings}>
                                <div>
                                    <img src={image}/>
                                </div>
                                <div>
                                    <img src="https://theculturetrip.com/wp-content/uploads/2015/08/27126168565_fde7898595_k.jpg" />
                                </div>
                                <div>
                                    <img src="https://themadrex.com/wp-content/uploads/2018/04/cocktail-857393_1280.jpg" />
                                </div>

                            </Slider>
                        </div>

                    })
                }

            </ul>
        </ul>

    </>


}

export default Detail