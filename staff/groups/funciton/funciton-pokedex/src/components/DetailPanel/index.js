import React, { Component } from 'react'
import './index.sass'


class DetailedPokemonPanel extends Component {

    state = {




    }


    renderHeldItems = () => {
        const { props: { pokemonToShow: { held_items } } } = this


        return <div className='DetailPanel-otherInfo__items'>


            <ul>
                <h3>HELD ITEMS</h3>
                {held_items.map(item => <li>{item.item.name}</li>)}
            </ul>

        </div>
    }

    onBackButtonClicked = () => {
        this.props.onBackButton()
    }

    render() {

        const { props: { pokemonToShow: { name, stats, abilities, moves, types, held_items, height, weight, id } }, onBackButtonClicked } = this
        let source = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        return <section className = 'Detail'>
            <div className='DetailPanel'>

                <div className='DetailPanel-mainInfo'>

                    <button onClick={onBackButtonClicked}>BACK</button>
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

                <button>TYPES</button>
                <button>ABILITIES</button>
                <button>MOVES</button>
                <button>HELD ITEMS</button>

                </div>
                    <div className='DetailPanel-otherInfo__types' >

                        <ul>
                            <h3>TYPES</h3>
                            {types.map(type => <li>{type.type.name}</li>)}
                        </ul>

                    </div>

                    <div className='DetailPanel-otherInfo__abilities'>

                        <ul>
                            <h3>ABILITIES</h3>

                            {abilities.map(ability => <li>{ability.ability.name}</li>)}


                        </ul>
                    </div>

                    <div className='DetailPanel-otherInfo__moves'>

                        <ul>
                            <h3>MOVES</h3>
                            {moves.map(move => <li>{move.move.name}</li>)}

                        </ul>
                    </div>


                    {held_items.length > 0 && this.renderHeldItems()}

                </div>

            </div>
        </section>


    }


}

export default DetailedPokemonPanel