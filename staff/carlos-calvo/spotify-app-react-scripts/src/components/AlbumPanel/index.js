import React, { Component } from 'react';
import '../AlbumPanel/index.sass'

class AlbumPanel extends React.Component{

   
    onAlbumSelected(id){
        const albumSelected = this.props.albumSelected
        console.log(id)
        albumSelected(id)
    }



    render(){
        const {props: {albumResults}} = this

        return<section>
            <h2>ALBUM LIST</h2>
            <div className="albumContainer ">
                {albumResults.map(({ id, images, name }) => {
                    return <div className="albumContainer__album "  id-data={id} onClick = {() => this.onAlbumSelected(id)}>
                        <img className="rounded-circle" src={images[0] ? images[0].url: ""}  />
                        <h3 className="text-center" >{name}</h3>
                    </div>
                })}
            </div>
        </section>
    }
}

export default AlbumPanel