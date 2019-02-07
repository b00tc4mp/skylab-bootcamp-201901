import React, { Component } from 'react'
import './index.sass'


class MainPanel extends Component  {


render(){
    return <section className='main'>
    <div className='main__image'>
    
    <img  src = 'https://media.giphy.com/media/26hisC8akEsnLmmSQ/giphy.gif'></img>
    {/* <img  src = 'https://i.gifer.com/W0w7.gif'></img> */}

    </div>

    <button onClick = {this.props.enableFavorites} >Favorites</button>
    <button onClick = {this.props.enableSearch} >Search</button>
    
    
    
    </section>
}

}

export default MainPanel