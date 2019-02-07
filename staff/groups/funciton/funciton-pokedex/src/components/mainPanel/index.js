import React, { Component, Fragment } from 'react'
import './index.sass'
import logic from '../../logic'


class MainPanel extends Component  {





render(){
    return <Fragment>
        <nav className='main navbar navbar-dark bg-dark'>
        <img className="imagefunciton" src={require('../../funcitons-pokedex-title.png')}></img>
        <button className="btn btn-dark" onClick = {this.props.logout} >Logout</button>
        <button className="btn btn-dark" onClick = {this.props.enableFavorites} >Favorites</button>
        <button className="btn btn-dark" onClick = {this.props.enableSearch} >Search</button>
        </nav>
        </Fragment>
}

}

export default MainPanel