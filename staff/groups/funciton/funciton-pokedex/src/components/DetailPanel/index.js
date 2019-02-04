import React, { Component } from 'react'
import './index.sass'


class DetailedPokemonPanel extends Component {

    render() {

        const { props: { name, stats, abilities, moves, types,heldItems,heigth,weight }} = this

        return <section>

            <h2>{name}</h2>
            <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'></img>
            <p>Height: <span>{heigth}</span></p>
            <p>weight: <span>{weight}</span></p>
            <ul>
                <h3>STATS</h3>
                <li>Speed: <span> {stats[0].base_stat}</span></li>
                <li>Special Defense: <span> {stats[1].base_stat}</span></li>
                <li>Special Attack: <span> {stats[2].base_stat}</span></li>
                <li>Defense: <span> {stats[3].base_stat}</span></li>
                <li>Attack: <span> {stats[4].base_stat}</span></li>
                <li>HP: <span> {stats[5].base_stat}</span></li>

            </ul>

            <ul>
                <h3>ABILITIES</h3>

                <li>{abilities[0].ability.name}</li>
                <li>{abilities[1].ability.name}</li>


            </ul>

            <ul>
                <h3>MOVES</h3>
                <li>{moves[0].move.name}</li>


            </ul>

            <ul>
                <h3>TYPES</h3>
                <li>{types[0].type.name}</li>

            </ul>

            <ul>
                <h3>HELD ITEMS</h3>
                <li>{heldItems[0].item.name}</li>
                <li>{heldItems[1].item.name}</li>

            </ul>

        </section>


    }


}

export default DetailedPokemonPanel