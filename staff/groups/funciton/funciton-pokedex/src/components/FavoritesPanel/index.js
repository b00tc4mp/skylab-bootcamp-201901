import React, { Component } from "react";
import logic from '../../logic'
import './index.sass'
import ItemResult from "../ItemResult";
import { getPokemonId } from '../../utils';


class FavoritesPanel extends Component {

  state = { favPokemons: [], searchText: this.props.searchText, pokemons: [], loading: true };

  componentDidMount() {

    logic.getFavorites(logic.getUserId(), logic.getUserApiToken())
      .then(favPokemons => this.setState({ favPokemons }))

    logic.retrieveAllPokemons().then(pokemons => {
      this.setState({ pokemons })
      console.log(this.state.pokemons)
    })

  }


  handlePokemonDetail = (name) => {
    logic.retrievePokemon(name)
      .then((pokemonVisible) => {
        this.props.setPokemonVisible(pokemonVisible)
        return this.setState({ pokemonVisible })
      })
  }



  renderList = () => {
    if (this.state.favPokemons ===null ) {
      return <p>There is no favorites</p>
    }else{
      return <ul className='pokemon__ul'>
        {
          this.state.favPokemons.map(pokemon => {
            let result = this.state.pokemons.find(p => p.name === pokemon)
            return <ItemResult stringPokemonId={result.url} pokemonName={result.name} onGoToDetails={this.handlePokemonDetail} />
          })
        }
      </ul>
    }

  }



  render() {

    return (
      <div className='searchPanel'>
        <img src={require('../../funcitons-pokedex-title.png')}></img>
        <h2 className='title__search'>Your Pokeballs</h2>
        {this.renderList()}
      </div>
    );
  }
}

export default FavoritesPanel;
