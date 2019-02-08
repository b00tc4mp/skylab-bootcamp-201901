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
        this.setState({ showType: true, showAbilities: false, showMoves: false, showItems: false })
    }
    ShowAbilitiesMethod = () => {
        this.setState({ showType: false, showAbilities: true, showMoves: false, showItems: false })
    }
    ShowMovesMethod = () => {
        this.setState({ showType: false, showAbilities: false, showMoves: true, showItems: false })
    }
    ShowItemsMethod = () => {
        this.setState({ showType: false, showAbilities: false, showMoves: false, showItems: true })
    }
    renderHeldItems = () => {
        const { props: { pokemonToShow: { held_items } } } = this

        if (this.state.showItems) {
            return <div className='DetailPanel-otherInfo__items'>


                <h3>HELD ITEMS</h3>
                <ul>
                    {held_items.map(item => <div className='item'> <li>{item.item.name}</li></div>)}
                </ul>

            </div>
        }
    }

    onBackButtonClicked = () => {
        this.props.onBackButton()
    }

    render() {

        const { props: { pokemonToShow: { name, stats, abilities, moves, types, held_items, height, weight, id } }, onBackButtonClicked, ShowAbilitiesMethod, ShowItemsMethod, ShowMovesMethod, ShowTypesMethod } = this
        let source = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        const selectedButtonAbilities = this.state.showAbilities ? 'DetailPanel-otherInfo__buttons-button-selected' : 'DetailPanel-otherInfo__buttons-button'
        const selectedButtonItems = this.state.showItems ? 'DetailPanel-otherInfo__buttons-button-selected' : 'DetailPanel-otherInfo__buttons-button'
        const selectedButtonMoves = this.state.showMoves ? 'DetailPanel-otherInfo__buttons-button-selected' : 'DetailPanel-otherInfo__buttons-button'
        const selectedButtonType = this.state.showType ? 'DetailPanel-otherInfo__buttons-button-selected' : 'DetailPanel-otherInfo__buttons-button'

        return <section className="DetailPanelContainer" >
            <div className='DetailPanel'>

                <div className='DetailPanel-mainInfo'>
                    <div className= 'DetailPanel-mainInfo-TitleRow'>
                
                        <h2>{name.toUpperCase()}</h2>
                        <button className='DetailPanel__backButton btn btn-dark' onClick={onBackButtonClicked}>BACK</button>
                    </div>
                    <img className='img' src={source}></img>
                    <p >Height: <span className='badge badge-primary badge-pill'>{height}</span></p>
                    <p>Weight: <span className='badge badge-primary badge-pill'>{weight}</span></p>
                    <h3>STATS</h3>
                    <ul className='list-group'>
                        <li>Speed:<span></span> <span className='badge badge-primary badge-pill'> {stats[0].base_stat}</span></li>
                        <li>Special Defense: <span></span><span className='badge badge-primary badge-pill'> {stats[1].base_stat}</span></li>
                        <li>Special Attack: <span></span><span className='badge badge-primary badge-pill'> {stats[2].base_stat}</span></li>
                        <li>Defense:<span></span> <span className='badge badge-primary badge-pill'> {stats[3].base_stat}</span></li>
                        <li>Attack:<span></span> <span className='badge badge-primary badge-pill'> {stats[4].base_stat}</span></li>
                        <li>HP:<span></span> <span className='badge badge-primary badge-pill'> {stats[5].base_stat}</span></li>

                    </ul>
                </div>

                <div className='DetailPanel-otherInfo'>
                    <div className='DetailPanel-otherInfo__buttons'>

                        <button className={selectedButtonType} onClick={ShowTypesMethod}>TYPES</button>
                        <button className={selectedButtonAbilities} onClick={ShowAbilitiesMethod}>ABILITIES</button>
                        <button className={selectedButtonMoves} onClick={ShowMovesMethod}>MOVES</button>
                        {!!held_items.length && <button className={selectedButtonItems} onClick={ShowItemsMethod}>HELD ITEMS</button>}

                    </div>

                    {this.state.showType && <div className='DetailPanel-otherInfo__types' >
                        <h3>TYPES</h3>

                        <ul>

                            {types.map(type => <div className={`type type-${type.type.name}`} ><li>{type.type.name}</li></div>)}
                        </ul>

                    </div>}

                    {this.state.showAbilities && <div className='DetailPanel-otherInfo__abilities'>

                        <h3>ABILITIES</h3>
                        <ul>

                            {abilities.map(ability => <div className='ability'><li>{ability.ability.name}</li></div>)}


                        </ul>
                    </div>}

                    {this.state.showMoves && <div className='DetailPanel-otherInfo__moves'>
                        <h3>MOVES</h3>

                        <ul>
                            {moves.map(move => <div className='move'><li>{move.move.name}</li></div>)}

                        </ul>
                    </div>}


                    {!!held_items.length && this.renderHeldItems()}

                </div>

            </div>
        </section>


    }


}

export default DetailedPokemonPanel