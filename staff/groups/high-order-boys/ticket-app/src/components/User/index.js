import React, { Component } from 'react'
import { Link, Route, withRouter } from 'react-router-dom'
import Register from '../Register'
import Favourites from '../Favourites'
import logic from '../../logic'



class User extends Component {
    state = { user: null, registerFeedback: null, eventsFavourites: null }

    componentDidMount() {
        this.handleUser()
    }

    componentWillMount() {
        this.props.history.listen(() => this.handleUser())
    }

    
    handleUser = () =>{
        logic.getUserApiToken() && logic.retrieveUser()
            .then(user => this.setState({ user }))
            .then(() => this.handleFavourites())
    }

    handleRegister = (name, surname, email, password, passwordConfirmation, bDate) => {

        const updateInfo = {
            name: name,
            surname: surname,
            username: email,
        }

        if (password.lenght > 0) updateInfo.password = password
        if (passwordConfirmation.lenght > 0) updateInfo.passwordConfirmation = passwordConfirmation
        if (bDate.length > 0) updateInfo.bDate = bDate

        try {
            logic.updateUser(updateInfo)
                .then(() => window.location.reload())
                .then(() => logic.retrieveUser())
                .then(user => this.setState({ user }))
                .catch(({ message }) => this.setState({ registerFeedback: message }))
        } catch ({ message }) {
            this.setState({ registerFeedback: message })
        }
    }

    handleFavourites() {
        const { state: { user } } = this

        if(user && user.favourites.length > 0)
            logic.getFavourites(user.favourites)
            .then(res => this.setState({eventsFavourites: res}))
    }

    render() {
        const { location: { pathname } } = this.props
        const isFavourites = (pathname.includes("home/user/favourites"))
        const { state: { user, eventsFavourites }, handleRegister, registerFeedback } = this

        return <section>
            {!isFavourites && <Link to="/home/user/favourites" className="button">Favourites</Link>}
            {!isFavourites && <Register user={user} onRegister={handleRegister} registerFeedback={registerFeedback} />}
            <Route exact path="/home/user/favourites" render={(props) => < Favourites events={eventsFavourites} {...props} />}  />
            
        </section >
    }
}

export default withRouter(User)