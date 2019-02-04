import React, { Component } from 'react'
import './index.sass'


class DetailedPokemonPanel extends Component {

    render() {

        const { props: {pokemonToShow :{name, stats, abilities, moves, types,held_items,heigth,weight,id }}} = this
        let source = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        console.log(name)
        return <section>
            
            <h2>{name}</h2>
            <img src={source}></img>
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

                {abilities.map(ability => <li>{ability.ability.name}</li>)}
                

            </ul>

            <ul>
                <h3>MOVES</h3>
                {moves.map(move =><li>{move.move.name}</li>)}

            </ul>

            <ul>
            {types.map(type =><li>{type.type.name}</li>)}
            </ul>

            <ul>
                <h3>HELD ITEMS</h3>
                {held_items.map(item => <li>{item.item.name}</li>)}

            </ul>



        </section>


    }


}

export default DetailedPokemonPanel