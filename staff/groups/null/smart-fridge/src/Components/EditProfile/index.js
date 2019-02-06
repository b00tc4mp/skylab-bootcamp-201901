import React from 'react'
import './index.sass'

class EditProfile extends React.Component {

    state = { 
        name: '', 
        surname: '', 
        email: '', 
        password: '', 
        confirmPassword: '', 
        gender:'', 
        height: null, 
        weigth: null, 
        birthDay:'', 
        lifeStyle: 'sedentary' 
    }

    handleNameInput = event => this.setState({ name: event.target.value })
    handleSurnameInput = event => this.setState({ surname: event.target.value })
   
    handleGenderInput= event => this.setState({gender: event.currentTarget.value})
    handleHeightInput= event => this.setState({height: parseInt(event.target.value)})
    handleWeidthInput= event => this.setState({weigth: parseInt(event.target.value)})
    handleBirthInput= event => this.setState({birthDay: event.target.value})
    handleLifeStyleInput = event => this.setState({lifeStyle: event.target.value})


    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { name, surname, gender, height, weight, birthDate, lifeStyle }, props: { onEditProfile } } = this

        const user= JSON.parse(sessionStorage.getItem('user'))

        // if (!name) this.setState({name: user.name})
        // if (!surname) this.setState({surname: user.surname})
        // if (!gender) this.setState({gender: user.gender})
        // if (!height) this.setState({height: user.height})
        // if (!weight) this.setState({weigth: user.weight})
        // if (!birthDate) this.setState({birthDay: user.birthDate})
        // if (!lifeStyle) this.setState({lifeStyle: user.lifeStyle})

        this.setState({
            name: name || user.name,
            surname: surname || user.surname,
            gender: gender || user.gender,
            height: height || user.height,
            weight: weight || user.weight,
            birthDate: birthDate || user.birthDate,
            lifeStyle: lifeStyle || user.lifeStyle
        }, () => {
            const { state: { name, surname, gender, height, weight, birthDate, lifeStyle }} = this

            let data={name, surname, gender, height, weight, birthDate, lifeStyle}

         onEditProfile(data)
        })
        

    }

    handleCancelButton = event => {
        event.preventDefault()

        this.props.cancelButton()
    }

    render() {
        return <section className="register">
            <div className="register__box container pl-lg-5 pr-lg-5">
                <h2 className="text-center mt-3">Edit Profile</h2>
                <form onSubmit={this.handleFormSubmit} className="login__form form-group container mb-3 " >
                    <div className="row mr-2">
                        <label htmlFor="name" className="col col-md-3 col-sm-12 flex mt-1">New Name</label>
                        <input onChange={this.handleNameInput} type="text" className="col col-md-9 col-12 form-control mt-1" name="name" placeholder="Name" />
                        <label htmlFor="surname" className="col col-md-3 col-sm-12 flex mt-1">New Surname</label>
                        <input onChange={this.handleSurnameInput} type="text" className="col col-md-9 col-12 form-control mt-1" name="surname" placeholder="Surname" />
                        

                        <div className='mt-4 col-12 p-0'>
                            <h2 className="text-center mt-3">About you</h2>
                            <div className='mt-2 col-12 text-center'>
                                <input onChange={this.handleGenderInput} className='mr-2' type="radio" id="male" name="gender" value="male"/>
                                <label className='mr-5' for="male">Male</label>
                                <input onChange={this.handleGenderInput} className='mr-2' type="radio" id="female" name="gender" value="female"/>
                                <label for="female">Female</label>
                            </div>
                            <div className='row'>
                                <div className='col-12 col-md-4'>
                                    <label htmlFor="height" className="flex mt-1">Height (cm)</label>
                                    <input onChange={this.handleHeightInput} type="text" className="form-control mt-1" name="height" placeholder="Height (cm)" />
                                </div>
                                <div className='col-12 col-md-4'>
                                    <label htmlFor="weigth" className="flex mt-1">Weigth (kg)</label>
                                    <input onChange={this.handleWeidthInput} type="text" className="form-control mt-1" name="weigth" placeholder="Weigth (kg)" />
                                </div>
                                <div className='col-12 col-md-4'>
                                    <label htmlFor="birthDay" className="flex mt-1">Birth Day</label>
                                    <input onChange={this.handleBirthInput} type="date" className="form-control mt-1" name="birthDay" placeholder="Birth Day" />
                                </div>
                            </div>
                            <div className='row mt-5'>
                                <label htmlFor="lifestyle" className="col col-md-3 col-sm-12 flex mt-1">Life Style</label>
                                <select onChange={this.handleLifeStyleInput} value={this.state.value} name="lifestyle" className="col col-md-9 col-12 form-control mt-1">
                                    <option value="sedentary">Sedentary or Light activity (1 or 2 times per month)</option>
                                    <option value="active">Active or Moderate active (1 or 2 times per week)</option>
                                    <option value="vigorouse">Vigorously active (4 times per week or more)</option>
                                </select>
                            </div>

                        </div>

                    </div>
                    <div className="row login-flex mt-3">
                        <div className="col-md-3 col-0"></div>
                        <button type="submit" className="btn btn-dark col-12 col-md-6 mr-2">Edit Profile</button>
                        <button onClick={this.handleCancelButton} className="btn btn-outline-light col-12 col-md-2 mt-2 mt-sm-0">Cancel</button>
                    </div>
                </form>
            </div>
        </section>
    }

}

export default EditProfile