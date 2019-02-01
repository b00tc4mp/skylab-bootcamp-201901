import React from 'react'

class Play extends React.Component{

    handleFavorite = trackId =>{
   
        this.props.favorite(trackId)
    }

   
    render(){

        const {props: {song, userFavorite}} =this
    
        userFavorite.includes(song.id)? this.hart=" favorite btn btn-outline-danger col-1 fas fa-heart" : this.hart="favorite btn btn-outline-default col-1 fas fa-heart"
    
        return <section className="results container">
            <ul>
                <li data-id={song.id} class="row pt-5">
                    <h3 className="col-12 col-sm-6 text-center display-5">{song.name}</h3>
                    <audio controls autoPlay loop src={song.preview_url} className="col-11 col-sm-5">
                    </audio>
    
                    <button onClick={()=>this.handleFavorite(song.id)} className={this.hart}></button>
    
                </li>
            </ul>
        </section>
    }
}

export default Play