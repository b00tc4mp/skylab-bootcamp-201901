import React, {useState, useEffect, useContext } from 'react'
import CharacterInfoResult from '../CharacterInfoResult'
import SearchResults from '../SearchResults'
import logic from '../../logic'
import { DemoContext } from '../DemoContext';


export default function Search() {

    const {characters, setCharacters} = useContext(DemoContext)

    const [query, setQuery] = useState('avengers')
    const [feedback, setFeedback] = useState(null)
    const [character, setCharacter] = useState(null)
    const [searching, setSearching] = useState(null)

    useEffect(() => {
        handleSearch()
    },[query])


    function handleSearch() {
        setSearching(true)
        setCharacters(null)
        setCharacter(null)
        setFeedback(null)
        try {
            logic.searchCharacter(query)
                .then(({results}) => { setSearching(null); setFeedback(null); setCharacters(results.map(({ id, name, thumbnail: {path,extension} }) => ({id, name, path, extension})))})
                .catch(({ message }) => { setFeedback(message); setSearching(null); setCharacters(null)})
        } catch ({ message }) { setFeedback(message); setSearching(null); setCharacters(null)}
    }

    function handleCharacterSelected(id) {
        try {
        logic.retrieveCharacter(id)
            .then(el => setCharacter(el.results[0]))
            .catch(({ message }) => { setCharacter(null); setFeedback(message)})
        } catch ({ message }) { setCharacter(null); setFeedback(message) }
    }

    return <section className="margin-top">
        <div className="columns is-mobile is-centered">
            <div className="column"> 
                <form onSubmit={(e) => {e.preventDefault(); handleSearch()}} className="field has-addons has-addons-centered">
                    <div className="control has-icons-left is-expanded">
                        <input onChange={e => setQuery(e.target.value)} className="input is-small is-rounded" placeholder="Look for your character!" type="text" name="query"></input>
                        <span className="icon is-small is-left">
                            <i className="fas fa-bolt"></i>
                        </span>
                    </div>
                    <div className="control">
                        <button className="button is-small is-rounded is-warning"type="submit">Search</button>
                    </div>
                </form>
            </div>
        </div>
        <SearchResults characters={characters} searching={searching} feedback={feedback} onCharacterSelected={handleCharacterSelected} />
        <CharacterInfoResult character={character}/>
    </section>

}