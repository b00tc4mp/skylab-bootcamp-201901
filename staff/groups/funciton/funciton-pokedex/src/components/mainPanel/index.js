import React, { Component } from 'react'
import './index.sass'
import logic from '../../logic'


class MainPanel extends Component  {





render(){
    return <section className='main'>
    <nav className='main__image'>
        <button className="btn btn-dark" onClick = {this.props.logout} >Logout</button>
        <img  src = 'https://media.giphy.com/media/26hisC8akEsnLmmSQ/giphy.gif'></img>
        {/* <img  src = 'https://i.gifer.com/W0w7.gif'></img> */}
        </nav>
        <button className="btn btn-dark" onClick = {this.props.enableFavorites} >Favorites</button>
        <button className="btn btn-dark" onClick = {this.props.enableSearch} >Search</button>
    </section>
}

}

export default MainPanel