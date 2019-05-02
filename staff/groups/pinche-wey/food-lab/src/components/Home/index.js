import React, { Component } from 'react'
import literals from './literals'
import logic from '../../logic'
import Results from '../Results'
import Detail from '../Detail'
import User from '../User'
import Favorites from '../Favorites'
import './index.sass'
import SmallCard from '../SmallCard';
import { logicalExpression } from '@babel/types';


class Home extends Component {

    state = { error: null, recipes: null, recipe: null, wanted: null, done: null, notes: null, forks: null, fullDone: null, fullWanted: null, user: null }

    handleGoBack = () => this.setState({ recipe: null })

    handleRetrieve = id => {
        logic.retrieveRecipe(id)
            .then((recipe) => {
                this.setState({ recipe: recipe, error: null })
            })
            .catch(error =>
                this.setState({ error: error.message })
            )
    }

    handleWaitingList = (id, done) => {
        try {
            logic.updateBook(id, done)
                .then(() =>
                    logic.retrieveBook()
                )
                .then(([wanted, done, notes, forks, fullWanted, fullDone]) => {
                    this.setState({ wanted, done, notes, forks, fullWanted, fullDone })
                })
                .catch(error =>
                    this.setState({ error: error.message })
                )
        } catch ({ message }) {
            console.error(message)
        }
    }

    handleNotes = (id, changes, notes) => {
        logic.updatingNotes(id, changes, notes)
            .then(() => logic.retrieveBook())
            .then(([wanted, done, notes, forks, fullWanted, fullDone]) => {
                this.setState({ wanted, done, notes, forks, fullWanted, fullDone })
            })
            .catch((error) => this.setState({ error: error.message }))
    }


    handleRandom = () => {

        let random = { meals: [] }

        Promise.all([logic.retrieveRandomRecipes(),
        logic.retrieveRandomRecipes(),
        logic.retrieveRandomRecipes(),
        logic.retrieveRandomRecipes(),
        logic.retrieveRandomRecipes(),
        logic.retrieveRandomRecipes(),
        logic.retrieveRandomRecipes(),
        logic.retrieveRandomRecipes()])
            .then(response => {
                random.meals = response.map(_meal => {
                    const { meals } = _meal
                    return meals[0]
                })

                this.setState({ error: null, recipe: null, recipes: random })
            })
            .catch((error) => this.setState({ error: error.message }))

    }


    handleRetriveBook = () => {
        logic.retrieveBook()
            .then(([wanted, done, notes, forks, fullWanted, fullDone]) => {
                this.setState({ wanted, done, notes, forks, fullWanted, fullDone })
            })
            .catch((error) => this.setState({ error: error.message }))

    }

    handleUser = () => { // nuevo
        logic.retrieveUser()
            .then(response => {
                // const {name,surname,email} = response
                this.setState({ user: response })
            })
            .catch((error) => this.setState({ error: error.message }))
    }

    handleUpdateUser = (xxx) => { // nuevo

        if (!xxx) {
            this.setState({ user: null })
        } else {
            logic.updateUser(xxx)
                .then(response => {
                    if (response.status === 'OK') this.setState({ error: null, user: null })
                    else throw Error(response.error)
                })
                .catch((error) => this.setState({ error: error.message }))
        }
    }

    componentWillReceiveProps(props) {
        const { results } = props
        if (results !== null && results.meals !== null) {
            this.setState({ recipes: results, recipe: null, error: null, });
        } else if (results !== null && results.meals === null) this.setState({ recipes: null, error: "No results for your Search" })
    }

    componentDidMount() {
        this.handleRetriveBook()
        this.handleRandom()
    }

    handleForks = (index, changes, forks) => {
        logic.updatingForks(index, changes, forks)
            .then(() => logic.retrieveBook())
            .then(([wanted, done, notes, forks, fullWanted, fullDone]) => {

                this.setState({ wanted, done, notes, forks, fullWanted, fullDone })
            })
            .catch((error) => this.setState({ error: error.message }))
    }

    handleFav = (x) => {
        let toSend = { meals: x === true ? this.state.fullDone : this.state.fullWanted }
        this.setState({ recipes: toSend, recipe: null })
    }

    render() {
        const {
            handleGoBack,
            handleForks,
            handleUpdateUser,
            handleNotes,
            handleWaitingList,
            handleUser,
            handleRetrieve,
            handleFav,
            state: { error, recipe, recipes, wanted, done, notes, forks, user, fullWanted, fullDone },
            props: { onSearch }
        } = this

        return <main className="home">

            <div>
                <nav className="nav">
                    <div className="nav__user">
                        <div className="nav__user-img">

                            <img onClick={() => handleUser()} src="http://www.europe-together.eu/wp-content/themes/sd/images/user-placeholder.svg" />
                        </div>
                        <p className="nav__user-name" >Hola</p>
                    </div>
                    <div className="nav__recipes">
                        <h4 onClick={() => handleFav(false)} className="nav__recipes-title" >Boiling</h4>
                        <SmallCard toPaint={fullWanted} wanted={wanted} done={done} onItem={handleRetrieve}></SmallCard>
                    </div>
                    <div className="nav__recipes">
                        <h4 onClick={() => handleFav(true)} className="nav__recipes-title" >My Creations</h4>
                        <SmallCard toPaint={fullDone} wanted={wanted} done={done} forks={forks} onItem={handleRetrieve}></SmallCard>
                    </div>
                </nav>
            </div>
            <div >
                <div className="nav__results">
                    <div className="nav__results-header">
                        <h4 className="nav__results-header-title" >Searching into {} by {}</h4>
                        <div>
                            <button onClick={() => handleFav(false)} className='nav__results-header-button' >Boiling</button>
                            <button onClick={() => handleFav(true)} className='nav__results-header-button' >My creations</button>
                        </div>
                    </div>
                    {!recipe && !user && recipes && <Results items={recipes} onItem={handleRetrieve} onSearch={onSearch} error={error} wanted={wanted} done={done}/*onFav={handleFav} favs={favs}*/ />}
                    {!user && recipe && <Detail item={recipe} onForks={handleForks} onNotes={handleNotes} onBack={handleGoBack} onWaiting={handleWaitingList} error={error} done={done} wanted={wanted} notes={notes} forks={forks} />}
                    {user && <User onUpdate={handleUpdateUser} onBack={handleUpdateUser} user={user} />}
                </div>
            </div>

        </main>
    }
}
export default Home