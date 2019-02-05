import React, { Component } from 'react'
import './index.sass'


class DetailedPokemonPanel extends Component {

    state = {

        showType: true,
        showAbilities: false,
        showMoves: false,
        showItems: false



    }

    ShowTypesMethod = () => {
        this.setState({ showType: true, showAbilities: false,showMoves:false,showItems:false})
    }
    ShowAbilitiesMethod = () => {
        this.setState({ showType: false, showAbilities: true,showMoves:false,showItems:false})
    }
    ShowMovessMethod = () => {
        this.setState({ showType: false, showAbilities: false,showMoves:true,showItems:false})
    }
    ShowItemsMethod = () => {
        this.setState({ showType: false, showAbilities: false,showMoves:false,showItems:true})
    }
    renderHeldItems = () => {
        const { props: { pokemonToShow: { held_items } } } = this

        if (this.state.showItems) {
            return <div className='DetailPanel-otherInfo__items'>


                <ul>
                    <h3>HELD ITEMS</h3>
                    {held_items.map(item => <li>{item.item.name}</li>)}
                </ul>

            </div>
        }
    }

    onBackButtonClicked = () => {
        this.props.onBackButton()
    }

    render() {

        const {props: { pokemonToShow: { name, stats, abilities, moves, types, held_items, height, weight, id } }, onBackButtonClicked,ShowAbilitiesMethod,ShowItemsMethod,ShowMovessMethod,ShowTypesMethod } = this
        let source = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

        return <section className="DetailPanelContainer" >
            <div className='DetailPanel'>
                <button className='DetailPanel__backButton' onClick={onBackButtonClicked}>BACK</button>

                <div className='DetailPanel-mainInfo'>

                    <h2>{name.toUpperCase()}</h2>
                    <img className='img' src={source}></img>
                    <p>Height: <span>{height}</span></p>
                    <p>Weight: <span>{weight}</span></p>
                    <ul>
                        <h3>STATS</h3>
                        <li>Speed: <span> {stats[0].base_stat}</span></li>
                        <li>Special Defense: <span> {stats[1].base_stat}</span></li>
                        <li>Special Attack: <span> {stats[2].base_stat}</span></li>
                        <li>Defense: <span> {stats[3].base_stat}</span></li>
                        <li>Attack: <span> {stats[4].base_stat}</span></li>
                        <li>HP: <span> {stats[5].base_stat}</span></li>

                    </ul>
                </div>

                <div className='DetailPanel-otherInfo'>
                    <div className='DetailPanel-otherInfo__buttons'>

                        <button onClick={ShowTypesMethod}>TYPES</button>
                        <button onClick={ShowAbilitiesMethod}>ABILITIES</button>
                        <button onClick={ShowMovessMethod}>MOVES</button>
                        {!!held_items.length && <button onClick={ShowItemsMethod}>HELD ITEMS</button>}

                    </div>

                    {this.state.showType && <div className='DetailPanel-otherInfo__types' >

                        <ul>
                            <h3>TYPES</h3>
                            {types.map(type => <li>{type.type.name}</li>)}
                        </ul>

                    </div>}

                    {this.state.showAbilities && <div className='DetailPanel-otherInfo__abilities'>

                        <ul>
                            <h3>ABILITIES</h3>

                            {abilities.map(ability => <li>{ability.ability.name}</li>)}


                        </ul>
                    </div>}

                    {this.state.showMoves && <div className='DetailPanel-otherInfo__moves'>

                        <ul>
                            <h3>MOVES</h3>
                            {moves.map(move => <li>{move.move.name}</li>)}

                        </ul>
                    </div>}


                    {!!held_items.length && this.renderHeldItems()}

                </div>

            </div>
        </section>


    }


}

export default DetailedPokemonPanel