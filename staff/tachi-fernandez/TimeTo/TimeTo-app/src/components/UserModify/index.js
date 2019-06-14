import React, {Component} from 'react'
import logic from '../../logic'
import {withRouter} from 'react-router-dom'
import './index.css'
import feedback from '../../plugins/feedback'

class UserModify extends Component{
    state = {name:'',surname:'',age:'',description: '',image: ''} 
    componentDidMount(){
        try {
            logic.retrieveUser()
                .then(results => {
                    this.setState({ 
                        name: results.name,
                        surname: results.surname,
                        age: results.age,
                        description: results.description,
                        email: results.email,
                        image: results.image
                    })
                })
                .catch( ({message}) => {
                    feedback(message , "error")

                }) 
        } catch ({message}) {
            feedback(message , "error")

        }
    }


    handleNameInput = event => this.setState({ name: event.target.value  })
    handleSurnameInput = event => this.setState({ surname: event.target.value })
    handleAgeInput = event => this.setState({ age: Number(event.target.value) })
    handleDescriptionInput = event => this.setState({ description: event.target.value })
    handleImageInput = event => {
        let files = event.target.files[0]
        logic.updateImage(files)
            .then(image => {
                this.setState({ image:image.secure_url})
                this.props.history.push('/user')
            })
        this.setState({ image: files })
    }


    updateUser = event => {
        event.preventDefault()
        const {state:{name,surname,age,description}} = this
        try {
            logic.updateUser(name,surname,age,description)
                .then(() => {
                    this.props.history.push('/user')
                    this.setState({ searchFeedback:null}) 
                })
                .catch( ({message}) => {
                    feedback(message , "error")
                }) 
        } catch ({message}) {
            feedback(message , "error")
        }
    }
    

    render(){
        const {handleNameInput,
            handleSurnameInput,
            handleDescriptionInput,
            handleAgeInput,
            handleImageInput,
            updateUser,
            state:{name,
                surname,
                age,
                description,
                image
                }}
            = this

        return( 
            <section className="modify">
            <div className="modify__container">

            <form className="modify__card" onSubmit={updateUser}>

            <div className="modify__card-name">
            <label className="modify__card-name-label">Name:</label>
            <input className="modify__card-name-input" onChange={handleNameInput}  defaultValue={name}></input>
            </div>

            <div className="modify__card-surname"> 
            <label className="modify__card-surname-label">Surname:</label>
            <input className="modify__card-surname-input" onChange={handleSurnameInput}  defaultValue={surname}></input>
            </div>

            <div className="modify__card-age">
            <label className="modify__card-age-label">Age:</label>
            <input className="modify__card-age-input" onChange={handleAgeInput}  defaultValue={age} type="number"></input>
            </div>

            <div className="modify__card-description">
            <label className="modify__card-description-label">Description:</label>
            <input  className="modify__card-description-input" onChange={handleDescriptionInput} defaultValue={description}  type="textarea"></input>
            </div>

            

            <div className="modify__card-image">
            {image && (<img className="modify__card-image-img" src={image} alt={image} />)}
                <label className="modify__card-image-label" htmlFor="file">
                select File
                <input className="modify__card-image-input" onChange={handleImageInput}
                defaultValue={image} name="image" id="file" type="file"></input>
                
                </label>
            </div>
        

            <div className="button-primary-action">
            <button className="modify__card-button modify__card-button-blue"> Modify </button>
            </div>
           
 
        
            

                </form>   

            </div>

 
            </section>
        )
    }
}

export default withRouter(UserModify)