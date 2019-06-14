import React, { Fragment } from 'react'
import './index.sass'
import { withRouter } from 'react-router-dom'
import EventsNav from '../EventsNav'
import NavBar from '../NavBar'

export default withRouter( function EventCategories (props) {

    return (
        <Fragment>
            <NavBar setShowRightBar={props.setShowRightBar} setShowDropdown={props.setShowDropdown}/>
            <div className='event-categories'>
                <EventsNav/>
                <div className='event-categories__elements'>
                    <div className='event-categories__food event-categories__american' onClick={e => {e.preventDefault(); props.history.push('/category/American')}}>
                        <div className='event-categories__div1'></div>
                        <div className='event-categories__div2'>
                            <p className='event-categories__title'>American</p>
                        </div>
                    </div>
                    <div className='event-categories__food event-categories__arabian' onClick={e => {e.preventDefault(); props.history.push('/category/Arabian')}}>
                        <div className='event-categories__div1'></div>
                        <div className='event-categories__div2'>
                            <p className='event-categories__title'>Arabian</p>
                        </div>
                    </div>
                    <div className='event-categories__food event-categories__bar' onClick={e => {e.preventDefault(); props.history.push('/category/Bar')}}>
                        <div className='event-categories__div1'></div>
                        <div className='event-categories__div2'>
                            <p className='event-categories__title'>Bar</p>
                        </div>
                    </div>
                    <div className='event-categories__food event-categories__breakfast' onClick={e => {e.preventDefault(); props.history.push('/category/Breakfast')}}>
                        <div className='event-categories__div1'></div>
                        <div className='event-categories__div2'>
                            <p className='event-categories__title'>Breakfast</p>
                        </div>
                    </div>
                    <div className='event-categories__food event-categories__chinese' onClick={e => {e.preventDefault(); props.history.push('/category/Chinese')}}>
                        <div className='event-categories__div1'></div>
                        <div className='event-categories__div2'>
                            <p className='event-categories__title'>Chinese</p>
                        </div>
                    </div>
                    <div className='event-categories__food event-categories__healthy' onClick={e => {e.preventDefault(); props.history.push('/category/Healthy')}}>
                        <div className='event-categories__div1'></div>
                        <div className='event-categories__div2'>
                            <p className='event-categories__title'>Healthy</p>
                        </div>
                    </div>
                    <div className='event-categories__food event-categories__indian' onClick={e => {e.preventDefault(); props.history.push('/category/Indian')}}>
                        <div className='event-categories__div1'></div>
                        <div className='event-categories__div2'>
                            <p className='event-categories__title'>Indian</p>
                        </div>
                    </div>
                    <div className='event-categories__food event-categories__italian' onClick={e => {e.preventDefault(); props.history.push('/category/Italian')}}>
                        <div className='event-categories__div1'></div>
                        <div className='event-categories__div2'>
                            <p className='event-categories__title'>Italian</p>
                        </div>
                    </div>
                    <div className='event-categories__food event-categories__japanese' onClick={e => {e.preventDefault(); props.history.push('/category/Japanese')}}>
                        <div className='event-categories__div1'></div>
                        <div className='event-categories__div2'>
                            <p className='event-categories__title'>Japanese</p>
                        </div>
                    </div>
                    <div className='event-categories__food event-categories__kebab' onClick={e => {e.preventDefault(); props.history.push('/category/Kebab')}}>
                        <div className='event-categories__div1'></div>
                        <div className='event-categories__div2'>
                            <p className='event-categories__title'>Kebab</p>
                        </div>
                    </div>
                    <div className='event-categories__food event-categories__mexican' onClick={e => {e.preventDefault(); props.history.push('/category/Mexican')}}>
                        <div className='event-categories__div1'></div>
                        <div className='event-categories__div2'>
                            <p className='event-categories__title'>Mexican</p>
                        </div>
                    </div>
                    <div className='event-categories__food event-categories__south-american' onClick={e => {e.preventDefault(); props.history.push('/category/South American')}}>
                        <div className='event-categories__div1'></div>
                        <div className='event-categories__div2'>
                            <p className='event-categories__title'>South american</p>
                        </div>
                    </div>
                    <div className='event-categories__food event-categories__spanish' onClick={e => {e.preventDefault(); props.history.push('/category/Spanish')}}>
                        <div className='event-categories__div1'></div>
                        <div className='event-categories__div2'>
                            <p className='event-categories__title'>Spanish</p>
                        </div>
                    </div>
                    <div className='event-categories__food event-categories__thai' onClick={e => {e.preventDefault(); props.history.push('/category/Thai')}}>
                        <div className='event-categories__div1'></div>
                        <div className='event-categories__div2'>
                            <p className='event-categories__title'>Thai</p>
                        </div>
                    </div>
                    <div className='event-categories__food event-categories__vegetarian' onClick={e => {e.preventDefault(); props.history.push('/category/Vegetarian')}}>
                        <div className='event-categories__div1'></div>
                        <div className='event-categories__div2'>
                            <p className='event-categories__title'>Vegetarian</p>
                        </div>
                    </div>
                    <div className='event-categories__food event-categories__vegan' onClick={e => {e.preventDefault(); props.history.push('/category/Vegan')}}>
                        <div className='event-categories__div1'></div>
                        <div className='event-categories__div2'>
                            <p className='event-categories__title'>Vegan</p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
})