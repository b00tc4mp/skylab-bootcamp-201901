import React , {Component} from 'react'



class Tracks extends Component{
    state = { tracksId: '' }
    onGoToTrack = tracksId => {
        const {props:{handleTrack}} = this
        handleTrack(tracksId)
    }
    
    render(){
        const{props:{tracks,onBackToAlbums}} = this
        return <section>
            <h3>Tracks</h3>
            <button onClick={onBackToAlbums}>Back to Tracks</button>
            <ul>
                {tracks.map(({ id, name}) => {
                    return <li onClick={() => this.onGoToTrack(id)} key={id}>{name}></li>

                })}

            </ul>
        </section>
    }
}

export default Tracks