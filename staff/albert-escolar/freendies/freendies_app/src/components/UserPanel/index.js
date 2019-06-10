import React, { Component } from 'react'
import './index.scss'
import ListComponent from '../ListComponent'
import logic from '../../logic';


class UserPanel extends Component {

    state = {
        user: "",
        updateForm: false,
        email: '',
        password: '',
        passwordConfirmation: '',
        favs: [],
        uploads: []
    }

    async componentDidMount() {
        try {
            const { user } = this.props
            const favs = await logic.retrieveFavs()
            const uploads = await logic.retrieveUploads()
            this.setState({ user,favs, uploads })

        } catch ({ message }) {
            console.log('Error when retriving')
        }
    }



    onInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit = (event) => {
        event.preventDefault()

        const { onUpdateUserEmail } = this.props
        const { email } = this.state

        onUpdateUserEmail(email)

    }

    updateFormHandler = (event) => {
        event.preventDefault()
        const { state: { updateForm } } = this
        updateForm ? this.setState({ updateForm: false }) : this.setState({ updateForm: true })

        // this.setState({updateForm: !updateForm}) ---- Version Mágica, nadie entiende que hace pero funciona 


    }



    render() {
        const { state: { updateForm, favs, uploads }, props: { user }, updateFormHandler, onInputChange, onSubmit } = this

        return <div className="userPanel">
            {/* <h2>{user ? user.username : 'User'}'s Panel</h2>
            <div>
                {updateForm ? <button onClick={updateFormHandler}>Change Email</button> : <button onClick={updateFormHandler}>Change Email</button>}
                {updateForm && < form onSubmit={onSubmit} >
                    <input name="email" placeholder="insert your new email" type="text" onChange={event => onInputChange(event)} />
                    <br />
                    <button>Submit</button>
                </form>}
            </div> */}
            <section className="userPanel__section">
            <h2 className="userPanel__sectionTitle">My Uploaded Games</h2>
            <ListComponent results={uploads} />
            </section>

            <section className="userPanel__section">
            <h2 className="userPanel__sectionTitle">My Favorite Games</h2>
            <ListComponent results={favs} />
            </section>


        </div>

    }



}
export default UserPanel    