import React, { Component, Fragment } from "react";
import PokemonSearch from '../PokemonSearch';
import MainPanel from '../mainPanel';
import DetailedPokemonPanel from '../DetailPanel';
import requireAuth from '../RequireAuth'
import FavoritesPanel from '../FavoritesPanel'


class Welcome extends Component {

    state = { pokemonVisible: null, searchText: '', pokemonSearchVisible: true }

    setPokemonVisible = pokemonVisible => this.setState({ pokemonVisible })

    setSearchText = searchText => this.setState({ searchText })

    onBackButtonDetailedPokemon = () => this.setState({ pokemonVisible: null, searchText: this.state.searchText })

    enableSearch = () => this.setState({pokemonSearchVisible: true})
    enableFavorites = () => this.setState({pokemonSearchVisible: false})
    
    
    render() {

        return <Fragment>

            {!this.state.pokemonVisible && this.state.pokemonSearchVisible && <PokemonSearch setSearchText={this.setSearchText} setPokemonVisible={this.setPokemonVisible} searchText={this.state.searchText} />}
            {!this.state.pokemonVisible && !this.state.pokemonSearchVisible && <FavoritesPanel  setPokemonVisible={this.setPokemonVisible}  />}
            <MainPanel enableFavorites = {this.enableFavorites} enableSearch = {this.enableSearch}/>
            {this.state.pokemonVisible && <DetailedPokemonPanel pokemonToShow={this.state.pokemonVisible} onBackButton={this.onBackButtonDetailedPokemon}/>}

        </Fragment>


    }



}

export default requireAuth(Welcome)