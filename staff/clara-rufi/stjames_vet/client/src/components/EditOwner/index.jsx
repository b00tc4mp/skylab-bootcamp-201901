import React, {Component} from 'react'
import logic from '../../logic'


class EditOwner extends Component {

    state = { users: [], name: '', surname: '', idCard: '', phone: '',  adress: '', city: '', email: '', error: null, isModified: false }
    
    handleOnChange = ({ target: { name, value } }) => this.setState({ [name]: value })
    

    retrieveUsers = async () => {
        const users = await logic.retrieveUsers()
        this.setState({users})
    }

    // retrieveUser = async () => {
    //     const user = await logic.retrieveUser()
    //     this.setState({user})

    // }

    handleSelectChange = async event => {
        event.preventDefault()
        const userId = event.target.value
        console.log(userId)
        if (!userId) return
        const {name,  surname, idCard, phone, adress, city, email} = await logic.retrieveUser(userId)
        this.setState({name, surname, idCard, phone, adress, city, email})
    }

    componentDidMount() {
        this.retrieveUsers()
    }


    handleEditProfile = event => {
        event.preventDefault()
        const { state: { name, surname, idCard, phone, adress, city, email} } = this
        this.editProfile(name, surname, idCard, phone, adress, city, email)
    }


    editProfile = async (name, surname, idCard, phone, adress, city, email) => {
        try {
            
            await logic.updateUser(name, surname, idCard, phone, adress, city, email)
            this.setState({isModified: true})
            // this.setState({isRegister: true, error: null})
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    handleGoHome = event => {
        event.preventDefault()
        this.props.history.push('/')
    }

    render(){

        return <form className="register" onSubmit={this.handleEditProfile} >
        <p className="title__form">Owner's details:</p>
        <label onClick={this.handleSelect}>Select Owner</label>
            <select name="owner" onChange={this.handleSelectChange}>
                {this.state.users.map(user => <option name= "owner" value={user.id}>{user.name}</option>)}
            </select>
        <div className="form-group row">
            <label for="validationDefault01" className="col-sm-2 col-form-label">Name</label>
            <div className="col-sm-7">
                <input value={this.state.name} type="name" name="name" onChange={this.handleOnChange} className="form-control" id="inputEmail3" required/>
            </div>
        </div>
        <div className="form-group row">
            <label for="validationDefault01" className="col-sm-2 col-form-label">Surname</label>
            <div className="col-sm-7">
                <input value={this.state.surname} type="surname" name="surname" onChange={this.handleOnChange} className="form-control" id="inputPassword3"></input>
            </div>
        </div>
        <div className="form-group row">
            <label for="validationDefault01" className="col-sm-2 col-form-label">Id Card</label>
            <div className="col-sm-7">
                <input value={this.state.idCard} type="idCard" name="idCard" onChange={this.handleOnChange} className="form-control" id="inputEmail3"></input>
            </div>
        </div>
        <div className="form-group row">
            <label for="validationDefault01" className="col-sm-2 col-form-label">Phone</label>
            <div className="col-sm-7">
                <input value={this.state.phone} type="phone" name="phone" onChange={this.handleOnChange} className="form-control" id="inputEmail3"></input>
            </div>
        </div>
        <div className="form-group row">
            <label for="validationDefault01" className="col-sm-2 col-form-label">Adress</label>
            <div className="col-sm-7">
                <input value={this.state.adress} type="adress" name="adress" onChange={this.handleOnChange} className="form-control" id="inputEmail3" required></input>
            </div>
        </div>
        <div className="form-group row">
            <label for="validationDefault01" className="col-sm-2 col-form-label">City</label>
            <div className="col-sm-7">
                <input value={this.state.city} type="city" name="city" onChange={this.handleOnChange} className="form-control" id="inputEmail3"></input>
            </div>
        </div>
      
        <div className="form-group row">
            <label for="validationDefault01" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-7">
                <input value={this.state.email} type="email" name="email" onChange={this.handleOnChange} className="form-control" id="inputPassword3" disabled></input>
            </div>
        
        <button type="submit" className="button">Edit</button>
        <button className="button__home" onClick={this.handleGoHome}>Go Home</button>
        {this.state.error && <p className= "feedback__Error">{this.state.error}</p>} 
        {this.state.isModified && <p className= "feedback__Ok">You have successfully modified {this.state.name}</p>}
        </div>
    </form>
    }
}


export default EditOwner