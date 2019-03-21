import React from 'react'
import './index.sass'

export default function CategorySelector ({ setRestaurantCategory }) {
    const categories = ['Any','American', 'Arabian', 'Asian', 'Bar', 'Breakfast', 'Chinese', 'Healthy', 'Indian', 'Italian', 'Japanese', 'Kebab', 'Mexican', 'South American', 'Spanish', 'Thai', 'Vegan', 'Vegetarian']
    
    return (
        <select className='category-selector' onChange={e => {e.preventDefault(); setRestaurantCategory(e.target.value)}}>
            {categories.map(category=> <option key={category} value={category}>{category}</option>)}
        </select>
    )
}