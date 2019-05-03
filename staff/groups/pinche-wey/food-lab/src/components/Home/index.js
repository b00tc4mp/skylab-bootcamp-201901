import React, { Component } from 'react'
import logic from '../../logic'
import Results from '../Results'
import Detail from '../Detail'
import User from '../User'
import './index.sass'
import SmallCard from '../SmallCard';
import { logicalExpression } from '@babel/types';
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'

class Home extends Component {

    state = { error: null, recipes: null, recipe: null, wanted: null, done: null, notes: null, forks: null, fullDone: null, fullWanted: null }

    handleGoBack = () => {
        this.setState({ recipe: null })
        if (!this.state.random) window.history.back()
        else this.props.history.push('/home')
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

                this.setState({ error: null, recipe: null, recipes: random, random: true })
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

    componentWillReceiveProps(props) {
        const { results } = props

        if (results !== null && results.meals !== null && results !== this.state.recipes) {
            this.setState({ recipes: results, recipe: null, error: null, random: false})
        } else if (results !== null && results.meals === null) this.setState({ recipes: null, error: "No results for your Search" })
        else {
            const [, , id] = props.location.pathname.split('/')

            id && this.retrieve(id)
        }

    }

    handleRetrieve = id => { 
        this.props.history.push(`/home/${id}`)
        this.props.handleUpdateUser()
    }

    retrieve = id => {
        logic.retrieveRecipe(id)
            .then((recipe) => {
                this.setState({ recipe: recipe, error: null })
            })
            .catch(error =>
                this.setState({ error: error.message })
            )
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
            handleNotes,
            handleWaitingList,
            handleRetrieve,
            handleFav,
            state: { error, recipe, recipes, wanted, done, notes, forks, fullWanted, fullDone },
            props: { onSearch, userXXX, handleUpdateUser }
        } = this

        return <main className="home">

            <div>
                <nav className="nav">
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
                       
                            <button onClick={() => handleFav(false)} className='nav__results-header-button' >Boiling</button>
                            <button onClick={() => handleFav(true)} className='nav__results-header-button' >My creations</button>
                        
                    </div>

                    {!recipe && !userXXX && recipes && <Results items={recipes} onItem={handleRetrieve} onSearch={onSearch} error={error} wanted={wanted} done={done}/*onFav={handleFav} favs={favs}*/ />}
                    {!userXXX && recipe && <Detail item={recipe} onForks={handleForks} onNotes={handleNotes} onBack={handleGoBack} onWaiting={handleWaitingList} error={error} done={done} wanted={wanted} notes={notes} forks={forks} />}
                    { userXXX && <User onUpdate={handleUpdateUser} onBack={handleUpdateUser} user={userXXX} />}
                </div>
            </div>

        </main>
    }
}
export default withRouter(Home)