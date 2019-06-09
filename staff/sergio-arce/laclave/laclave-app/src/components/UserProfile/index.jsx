import React, { Component } from 'react'
import logic from '../../logic'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Favorites from '../Favorites'

import Congresses from '../Congresses'

import Artists from '../Artists'
import { toast } from 'react-toastify';


class UserProfile extends Component {
    state =  { userData: false, profileShow: true, favoritesShow: false, congressesShow: false, artistsShow: false  }
    

    //antes de que se monte el componente
    componentWillMount() {
        // this.props.onRetrieveUser()
        this.handleRetrieveUser()
    }

    handleRetrieveUser = () => {
        
        logic.retrieveUser()    
            .then(userData => {
                this.setState({ userData })
                //this.props.history.push('/profile')
            })
            .catch(error => toast(error.message))
    }

    handleSubmit = event => {
        event.preventDefault()
        const userData = {
            name: event.target.name.value,
            username: event.target.username.value,
            email: event.target.email.value
        }

        this.props.onUpdateProfile(userData)
        this.handleRetrieveUser()
    }

    showFavorites = () => {
        this.setState({ profileShow: false, favoritesShow: true, congressesShow: false, artistsShow: false })
    }

    showCongresses = () => {
        this.setState({ profileShow: false, congressesShow: true, favoritesShow: false, artistsShow: false })
    }

    showArtists = () => {
        this.setState({ profileShow: false, congressesShow: false, favoritesShow: false, artistsShow: true })
    }

    showProfile = () => {
        this.setState({ profileShow: true, congressesShow: false, favoritesShow: false, artistsShow: false  })
    }
    

   render () {
        const { state: { userData, 
                        favoritesShow, 
                        profileShow , 
                        congressesShow,
                        artistsShow
                    }, 
                showFavorites, showCongresses, showProfile, showArtists} = this

        return (

            <div className="profile">

                <h3 className="profile__link">Account settings</h3>
                <div className="profile__links">

                    <a onClick={showProfile} className="profile__links__link">Edit profile</a>

                    <a onClick={showFavorites} className="profile__links__link">Favorites</a>
                    <a onClick={showCongresses} className="profile__links__link">Your Congresses</a>
                    <a onClick={showArtists} className="profile__links__link">Your Artists</a>
                </div>

                {profileShow &&
                <section className="profile__form">
                    
                    <h1>Welcome { userData.name } </h1>

                    <form onSubmit={this.handleSubmit} >
                        <fieldset>
                            <label for="name">name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                autoComplete="off"
                                spellCheck={false}
                                defaultValue={userData.name}
                            />
                        </fieldset>

                        <fieldset>
                            <label for="name">Username</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                required
                                autoComplete="off"
                                spellCheck={false}
                                defaultValue={userData.username}
                            />
                        </fieldset>

                        <fieldset>
                            <label for="name">email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                required
                                autoComplete="off"
                                spellCheck={false}
                                defaultValue={userData.email}
                            />
                        </fieldset>

                        <button type="submit">Update profile</button>

                    </form>
                </section>
            
                }

                {favoritesShow &&
                <Favorites onFavorites={userData.favorites} />
                }

                {congressesShow &&
                <Congresses onCongresses={userData.createdCongresses} />
                }

                {artistsShow &&
                <Artists onArtists={userData.createdArtists} />
                }

            </div>
        )
   }
}


export default UserProfile