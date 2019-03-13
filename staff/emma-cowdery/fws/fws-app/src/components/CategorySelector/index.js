import React from 'react'
import './index.sass'

export default function CategorySelector ({ setRestaurantCategory }) {
    const categories = ['American', 'Arabian', 'Asian', 'Bar', 'Breakfast', 'Burguers', 'Burritos', 'Chicken', 'Chinese', 'Dessert', 'Healthy', 'Indian', 'Italian', 'Japanese', 'Juices', 'Kebab', 'Mediterranean', 'Mexican', 'Oriental', 'Pasta', 'Pizza', 'Poke', 'Salads', 'Sandwitches', 'South American', 'Spanish', 'Sushi', 'Tapas', 'Thai', 'Vegan', 'Vegetarian']
    return (
        <select onChange={e => {e.preventDefault(); setRestaurantCategory(e.target.value)}}>
            {categories.map(category=> <option value={category}>{category}</option>)}
        </select>
    )
}