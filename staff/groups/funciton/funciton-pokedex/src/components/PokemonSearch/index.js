import React, { Component } from "react";
import logic from '../../logic'
import './index.sass'
import ItemResult from "../ItemResult";


class PokemonSearch extends Component {
  state = { pokemons: [], searchText: '', loading: true };

  componentDidMount() {
    logic.retrieveAllPokemons().then(pokemons => {
      this.setState({ pokemons, loading: false })

    });
  }

  handleChange = event => {
    this.setState({
      searchText: event.target.value
    });
    this.props.setSearchTextApp(event.target.value);

  };

  renderList = () => {
    const {props : {onPokemonDetail}} = this
    
    return <ul className='pokemon__ul'>
      {
        this.state.pokemons
          .filter(pokemon => pokemon.name.includes(this.props.searchText))
          .map(pokemon => <ItemResult stringPokemonId = {pokemon.url} pokemonName={pokemon.name} onGoToDetails={onPokemonDetail} />)
      }
    </ul>

    }

  render() {

    
    return (
      <div className='searchPanel'>
        {/* <img src={titleImage} alt="poke_title"></img> */}
        <img src='https://fontmeme.com/temporary/976c1064ba4f2fa060d1fa70fd97bf54.png'></img>
        <h2 className='title__search'>Search Pokemon</h2>
        
          <input className="input__searchPokemon"
            onChange={this.handleChange}
            type="text"
            placeholder="Search your Pokemon"
            value={this.props.searchText}
          />
          {
            this.state.loading && <h1>LOADING</h1>
          }
          {
            this.props.searchText !== "" && this.renderList()
          }

      </div>
    );
  }
}

export default PokemonSearch;
