import React from 'react'
import { Link } from 'react-router-dom'

export default ({ items }) => (
    <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle dropdown-categories" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Categories</button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <Link to={`/products/`} className="dropdown-item" href="" >Products</Link>
            {items.map(item => {
                return <Link to={`/categories/${item._id}`} className="dropdown-item" href="" key={item._id}>{item.name}</Link>
            })}
        </div>
    </div>
);