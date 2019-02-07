import React, { Component } from "react";
import logic from '../../logic'
import './index.sass'
import ItemResult from "../ItemResult";
import { getPokemonId } from '../../utils';


class FavoritesPanel extends Component {

  state = { favPokemons: [], searchText: this.props.searchText, pokemons: [], loading: true };

  componentDidMount() {
    this.updatePokemonList()
  }

  updatePokemonList() {
    Promise.all([
      logic.retrieveAllPokemons(),
      logic.getFavorites(logic.getUserId(), logic.getUserApiToken())
    ])
      .then(([pokemons, favPokemons]) => this.setState({ pokemons, favPokemons }))
  }

  updateOnlyFavs() {
    Promise.all([
      logic.getFavorites(logic.getUserId(), logic.getUserApiToken())
    ])
      .then(([favPokemons]) => this.setState({favPokemons }))
  }

  handlePokemonDetail = (name) => {
    logic.retrievePokemon(name)
      .then((pokemonVisible) => {
        this.props.setPokemonVisible(pokemonVisible)
        return this.setState({ pokemonVisible })
      })
  }

  handleToggleFav =(userId, token, pokemonName) => {
    logic.toggleFavorite(userId, token, pokemonName)
      .then(() => this.updateOnlyFavs())
  }


  renderList = () => {
    if (this.state.favPokemons === null) {
      return <p>There is no favorites</p>
    } else {
      return <ul className='pokemon__ul'>
        {
          this.state.favPokemons.map(pokemon => {
            let result = this.state.pokemons.find(p => p.name === pokemon)
            return <ItemResult stringPokemonId={result.url} pokemonName={result.name} onGoToDetails={this.handlePokemonDetail} onToggleFav={this.handleToggleFav} favorites = {this.state.favPokemons} isFav="heart--fav" />
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
