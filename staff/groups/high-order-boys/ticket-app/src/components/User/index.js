import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Register from '../Register'
import logic from '../../logic'



class User extends Component {
    state = {user: null, registerFeedback: null}

    componentDidMount(){
        logic.getUserApiToken() && logic.retrieveUser()
            .then(user => this.setState({user}))
    }

    componentWillReceiveProps(props){
        
        this.setState({user: props.user})
    }

    handleRegister = (name, surname, email, password, passwordConfirmation) => {
        try {
        //   logic.registerUser(name, surname, email, password, passwordConfirmation)
        //     .then(() => this.props.history.push('/login'))
        //     .catch(({ message }) => this.setState({ registerFeedback: message }))
        } catch ({ message }) {
          this.setState({ registerFeedback: message })
        }
      }

    render() {
        const { state: { user }, handleRegister, registerFeedback} = this

        return <section>
            <Link to="/home" className="button">Search Moar</Link>
            <Link to="/home/favourites" className="button">Favourites</Link>
            < Register user={user} onRegister={handleRegister} registerFeedback={registerFeedback}/>
            <div>
                <label>Name:</label>
                {user && <p>{user.name}</p>}
            </div>
            <div>
                <label>Surname:</label>
                {user && <p>{user.surname}</p>}
            </div>
            <div>
                <label>Email:</label>
                {user && <p>{user.email}</p>}
            </div>


        </section >
    }
}

export default User