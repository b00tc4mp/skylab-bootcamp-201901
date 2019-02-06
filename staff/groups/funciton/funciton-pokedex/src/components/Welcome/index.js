import React, { Component, Fragment } from "react";
import PokemonSearch from '../PokemonSearch';
import MainPanel from '../mainPanel';
import DetailedPokemonPanel from '../DetailPanel';
import requireAuth from '../RequireAuth'


class Welcome extends Component {

    state = { pokemonVisible: null, searchText: '' }

    setPokemonVisible = pokemonVisible => this.setState({ pokemonVisible })

    setSearchText = searchText => this.setState({ searchText })

    onBackButtonDetailedPokemon = () => this.setState({ pokemonVisible: null, searchText: this.state.searchText })
    
    
    render() {

        return <Fragment>

            {!this.state.pokemonVisible && <PokemonSearch setSearchText={this.setSearchText} setPokemonVisible={this.setPokemonVisible} searchText={this.state.searchText} />}
            <MainPanel />
            {this.state.pokemonVisible && <DetailedPokemonPanel pokemonToShow={this.state.pokemonVisible} onBackButton={this.onBackButtonDetailedPokemon}/>}

        </Fragment>


    }



}

export default requireAuth(Welcome)