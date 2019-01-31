import React, { Component } from 'react';
import '../FavoritesPanel/index.sass'

class FavoritesPanel extends React.Component{

    render(){
        const {props: {favoriteTracks} } = this

        return<section>
            {favoriteTracks.map((track) => {
                return <div>
                    <p>{track}</p>
                    <audio src=""/>
                </div>

            })}
        </section>
    }   
}

export default FavoritesPanel