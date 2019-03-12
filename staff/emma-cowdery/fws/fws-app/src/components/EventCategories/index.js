import React, { Fragment, useState, useEffect } from 'react'
import './index.sass'
import { withRouter, Route, Redirect } from 'react-router-dom'
import logic from '../../logic'
import EventsNav from '../EventsNav'
import NavBar from '../NavBar'
import SelectedCategory from '../SelectedCategory'

export default withRouter( function EventCategories (props) {
    const [selectedCategory, setSelectedCategory] = useState('event-categories')
    const [viewCategory, setViewCategory] = useState(false)
    const categories = ['American', 'Arabian', 'Asian', 'Bar', 'Breakfast', 'Burguers', 'Burritos', 'Chicken', 'Chinese', 'Dessert', 'Healthy', 'Indian', 'Italian', 'Japanese', 'Juices', 'Kebab', 'Mediterranean', 'Mexican', 'Oriental', 'Pasta', 'Pizza', 'Poke', 'Salads', 'Sandwitches', 'South American', 'Spanish', 'Sushi', 'Tapas', 'Thai', 'Vegan', 'Vegetarian']

    return (
        <Fragment>
            <NavBar/>
            <EventsNav setViewCategory={setViewCategory}/>
            {!viewCategory && categories.map(category => <div onClick={e => {e.preventDefault(); setSelectedCategory(category); setViewCategory(true)}}><p>{category}</p></div>)}
            {viewCategory && <SelectedCategory selectedCategory={selectedCategory} setViewCategory={setViewCategory}/>}
            {/* {selectedCategory && <SelectedCategory selectedCategory={selectedCategory}/>} */}
        </Fragment>
    )
})