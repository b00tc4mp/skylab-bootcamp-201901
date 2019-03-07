import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

export default ({ items, btnShow = false }) => (
    <ul >
        <div >
            {items.map(item => (
                <li key={item._id}>
                    <Link to={`product/${item._id}`}>
                        <div>
                            <img id={`img-${item._id}`} src={item.image} alt="404" />
                            <div>
                                <h5 >{item.name}</h5>
                                {btnShow && <p >{item.description}</p>}
                            </div>
                        </div>
                    </Link>
                </li>
            ))}
        </div>
    </ul>
);