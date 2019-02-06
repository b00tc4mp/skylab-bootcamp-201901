import React, { Component } from 'react'
import './index.sass'


class MainPanel extends Component  {


render(){
    return <section className='main'>
    
    <img className='main__image' src = 'https://wdcolledge.com/wp-content/uploads/2018/04/placeholder.png'></img>

    <button onClick = {this.props.enableFavorites} >Favorites</button>
    <button onClick = {this.props.enableSearch} >Search</button>
    
    
    
    </section>
}

}

export default MainPanel