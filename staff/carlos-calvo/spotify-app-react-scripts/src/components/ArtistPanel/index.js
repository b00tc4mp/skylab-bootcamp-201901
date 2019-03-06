import React, { Component } from 'react';
import './index.sass'

class ArtistPanel extends React.Component{

    onArtistSelected(id, name){
        const artistSelect = this.props.artistSelect
        console.log(id)
        artistSelect(id, name)
    }
    
    clearStyles(){
        //Pone todos sin estilo
    }

    highlightitem(id){
        
    }

    render(){
       const {props: {artistResults}} = this

       return <section>
           <h2>ARTIST LIST</h2>
           <div className="cardContainer">
                {artistResults.map(({ id, images, name }) => {
                    return <div className="cardContainer__Artist" id-data={id} onClick = {() => this.onArtistSelected(id, name)}>
                        <img className="rounded-circle" src={images[0] ? images[0].url: ""}  />
                        <h3 className="text-center">{name}</h3>
                    </div>
                })}
            </div>
        </section>
    }

}

export default ArtistPanel