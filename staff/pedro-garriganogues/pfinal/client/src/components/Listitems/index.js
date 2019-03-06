import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'
// import { Animated } from "react-animated-css"

export default ({ items, btnShow = false, productDetail = false }) => (
    <ul >
        <div >
            {items.map(item => (
                <li key={item._id}>
                    {/* <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}> */}
                    <div style={{ width: '18rem' }}>
                        <img id={`img-${item._id}`} src={item.image} alt="404" />
                        <div c>
                            <h5 >{item.name}</h5>
                            {btnShow && <p >{item.description}</p>}
                        </div>
                    </div>
                    {/* </Animated> */}
                </li>
            ))}
        </div>
    </ul>
);