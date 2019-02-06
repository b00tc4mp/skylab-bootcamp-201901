import React from 'react'
import './index.sass'
import {getPokemonId} from '../../utils'


class ItemResult extends React.Component {


    retrieveDataFromItem = () => {
        this.props.onGoToDetails(this.props.pokemonName)
    }

    render(){

        const {props: {stringPokemonId, pokemonName}} = this
        console.log(stringPokemonId)
        let pokemonId = getPokemonId(stringPokemonId)
        const source = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`

        return <div className="card pokemonCard">
            <img onClick={this.retrieveDataFromItem}  src={source} className="card-img-top"/>

            {/* <img className="pokemonCard__pokeball" src="https://cdn4.iconfinder.com/data/icons/pokemon-go/512/Pokemon_Go-01-128.png"/> */}
            
                <p onClick={this.retrieveDataFromItem} className="card-text">{pokemonName.toUpperCase()}</p>
                <button onClick={this.retrieveDataFromItem} className="pokemonCard__details">More</button>
                <p className="heart">♡</p>
        </div>
    }
}


export default ItemResult