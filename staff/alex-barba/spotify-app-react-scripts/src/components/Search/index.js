import React from 'react';
import Feedback from '../Feedback';

class Search extends React.Component {

    state = {query: ''}

    handleSearchInput = event => {
        this.setState({query: event.target.value}, ()=> {
            const {state: {query}, props: {onToSearch, feedback}} = this
            onToSearch(query, feedback)
        })  
    }

    handleOnSearch = (event) => {
       
        event.preventDefault()

        const {state: {query}, props: {onToSearch, feedback}} = this

        onToSearch(query, feedback)
    }

    handleOnLogout = () => {
        const { props: {onToLogout} } = this

        onToLogout()
    }

    handleOnFavourites = () => {
        const {props: {onToFavourites}} = this

        onToFavourites()
    }

    render() {
        const {handleOnSearch, handleSearchInput, handleOnLogout, handleOnFavourites, props:{feedback, user}} = this

        return <section className="search margin-top">
        <div className="level is-mobile">
        <div className="level-item"></div>
            <div className="level-item">
                <h4 className="subtitle is-4" >Welcome, {user} !</h4>
            </div>
            <div className="level-item">
                <button onClick={handleOnFavourites} className="button is-rounded is-small search__logout">Favourites &nbsp;<i className="fas fa-heart"></i></button>
            </div>
            <div className="level-item">
                <button onClick={handleOnLogout} className="button is-rounded is-small search__logout"><i className="fas fa-sign-out-alt"></i></button>
            </div>
            <div className="level-item"></div>
        </div>
        <div className="columns is-mobile is-centered">
            <div className="column is-two-thirds-tablet is-three-quarters-mobile is-centered"> 
                <form onSubmit={handleOnSearch} className="field has-addons has-addons-centered">
                    <div className="control has-icons-left is-expanded">
                        <input onChange={handleSearchInput}className="input is-small is-rounded" placeholder="Find an artist" type="text" name="query"></input>
                        <span className="icon is-small is-left">
                            <i className="fas fa-music"></i>
                        </span>
                    </div>
                    <div className="control">
                        <button className="button is-small is-rounded is-success"type="submit">Find!</button>
                    </div>
                </form>
            </div>
        </div>
        {feedback && <Feedback message={feedback} />}
    </section>
    }
}

export default Search;