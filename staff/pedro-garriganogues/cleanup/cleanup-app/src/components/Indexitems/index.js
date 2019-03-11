import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

export default ({ items }) => (

    <div >
        {items.map(item => (
            <ul className="product">
                <Link to={`product/${item._id}`}>
                    <div>
                        <img className="image" id={`img-${item._id}`} src={item.image} alt="404" />
                    </div>
                </Link>
                <div>
                    <br />
                    <h3>{item.name}</h3>
                    <br />
                    <p className="description" >{item.description}</p>
                    <br />
                    <Link className="button" to={`product/${item._id}`}>Buy me</Link>

                </div>
            </ul>
        ))}
    </div>

);