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

    return (
        <Fragment>
            <NavBar setShowRightBar={props.setShowRightBar} setShowDropdown={props.setShowDropdown}/>
            <div className='event-categories'>
                <EventsNav setViewCategory={setViewCategory}/>
                {!viewCategory && <div className='event-categories__elements'>
                    <div className='event-categories__food event-categories__american' onClick={e => {e.preventDefault(); setSelectedCategory('American'); setViewCategory(true)}}>
                        <div className='event-categories__div1'></div>
                        <div className='event-categories__div2'>
                            <p className='event-categories__title'>American</p>
                        </div>
                    </div>
                    <div className='event-categories__food event-categories__arabian' onClick={e => {e.preventDefault(); setSelectedCategory('Arabian'); setViewCategory(true)}}>
                        <div className='event-categories__div1'></div>
                        <div className='event-categories__div2'>
                            <p className='event-categories__title'>Arabian</p>
                        </div>
                    </div>
                    <div className='event-categories__food event-categories__bar' onClick={e => {e.preventDefault(); setSelectedCategory('Bar'); setViewCategory(true)}}>
                        <div className='event-categories__div1'></div>
                        <div className='event-categories__div2'>
                            <p className='event-categories__title'>Bar</p>
                        </div>
                    </div>
                    <div className='event-categories__food event-categories__breakfast' onClick={e => {e.preventDefault(); setSelectedCategory('Breakfast'); setViewCategory(true)}}>
                        <div className='event-categories__div1'></div>
                        <div className='event-categories__div2'>
                            <p className='event-categories__title'>Breakfast</p>
                        </div>
                    </div>
                    <div className='event-categories__food event-categories__chinese' onClick={e => {e.preventDefault(); setSelectedCategory('Chinese'); setViewCategory(true)}}>
                        <div className='event-categories__div1'></div>
                        <div className='event-categories__div2'>
                            <p className='event-categories__title'>Chinese</p>
                        </div>
                    </div>
                    <div className='event-categories__food event-categories__healthy' onClick={e => {e.preventDefault(); setSelectedCategory('Healthy'); setViewCategory(true)}}>
                        <div className='event-categories__div1'></div>
                        <div className='event-categories__div2'>
                            <p className='event-categories__title'>Healthy</p>
                        </div>
                    </div>
                    <div className='event-categories__food event-categories__indian' onClick={e => {e.preventDefault(); setSelectedCategory('Indian'); setViewCategory(true)}}>
                        <div className='event-categories__div1'></div>
                        <div className='event-categories__div2'>
                            <p className='event-categories__title'>Indian</p>
                        </div>
                    </div>
                    <div className='event-categories__food event-categories__italian' onClick={e => {e.preventDefault(); setSelectedCategory('Italian'); setViewCategory(true)}}>
                        <div className='event-categories__div1'></div>
                        <div className='event-categories__div2'>
                            <p className='event-categories__title'>Italian</p>
                        </div>
                    </div>
                    <div className='event-categories__food event-categories__japanese' onClick={e => {e.preventDefault(); setSelectedCategory('Japanese'); setViewCategory(true)}}>
                        <div className='event-categories__div1'></div>
                        <div className='event-categories__div2'>
                            <p className='event-categories__title'>Japanese</p>
                        </div>
                    </div>
                    <div className='event-categories__food event-categories__kebab' onClick={e => {e.preventDefault(); setSelectedCategory('Kebab'); setViewCategory(true)}}>
                        <div className='event-categories__div1'></div>
                        <div className='event-categories__div2'>
                            <p className='event-categories__title'>Kebab</p>
                        </div>
                    </div>
                    <div className='event-categories__food event-categories__mexican' onClick={e => {e.preventDefault(); setSelectedCategory('Mexican'); setViewCategory(true)}}>
                        <div className='event-categories__div1'></div>
                        <div className='event-categories__div2'>
                            <p className='event-categories__title'>Mexican</p>
                        </div>
                    </div>
                    <div className='event-categories__food event-categories__south-american' onClick={e => {e.preventDefault(); setSelectedCategory('South American'); setViewCategory(true)}}>
                        <div className='event-categories__div1'></div>
                        <div className='event-categories__div2'>
                            <p className='event-categories__title'>South american</p>
                        </div>
                    </div>
                    <div className='event-categories__food event-categories__spanish' onClick={e => {e.preventDefault(); setSelectedCategory('Spanish'); setViewCategory(true)}}>
                        <div className='event-categories__div1'></div>
                        <div className='event-categories__div2'>
                            <p className='event-categories__title'>Spanish</p>
                        </div>
                    </div>
                    <div className='event-categories__food event-categories__thai' onClick={e => {e.preventDefault(); setSelectedCategory('Thai'); setViewCategory(true)}}>
                        <div className='event-categories__div1'></div>
                        <div className='event-categories__div2'>
                            <p className='event-categories__title'>Thai</p>
                        </div>
                    </div>
                    <div className='event-categories__food event-categories__vegetarian' onClick={e => {e.preventDefault(); setSelectedCategory('Vegetarian'); setViewCategory(true)}}>
                        <div className='event-categories__div1'></div>
                        <div className='event-categories__div2'>
                            <p className='event-categories__title'>Vegetarian</p>
                        </div>
                    </div>
                    <div className='event-categories__food event-categories__vegan' onClick={e => {e.preventDefault(); setSelectedCategory('Vegan'); setViewCategory(true)}}>
                        <div className='event-categories__div1'></div>
                        <div className='event-categories__div2'>
                            <p className='event-categories__title'>Vegan</p>
                        </div>
                    </div>
                    {viewCategory && <SelectedCategory selectedCategory={selectedCategory} setViewCategory={setViewCategory}/>}
                    {/* {selectedCategory && <SelectedCategory selectedCategory={selectedCategory}/>} */}
                </div>}
            </div>
        </Fragment>
    )
})