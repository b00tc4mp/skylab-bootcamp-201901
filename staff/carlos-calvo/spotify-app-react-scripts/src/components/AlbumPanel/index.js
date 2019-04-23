import React, { Component } from 'react';
import '../AlbumPanel/index.sass'

class AlbumPanel extends React.Component{

   
    onAlbumSelected(id,name){
        const albumSelected = this.props.albumSelected
        albumSelected(id,name)
    }



    render(){
        const {props: {albumResults, artistName}} = this

        return<section>
            <h2>ALBUM LIST from {artistName}</h2>
            <div className="albumContainer ">
                {albumResults.map(({ id, images, name }) => {
                    return <div className="albumContainer__album "  id-data={id} onClick = {() => this.onAlbumSelected(id, name)}>
                        <img className="rounded-circle" src={images[0] ? images[0].url: ""}  />
                        <h3 className="text-center" >{name}</h3>
                    </div>
                })}
            </div>
        </section>
    }
}

export default AlbumPanel