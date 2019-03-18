import React, {Component} from 'react'
import logic from '../../logic'
import {Link,withRouter} from 'react-router-dom'
import Feedback from '../Feedback';
import './index.css'

class UserModify extends Component{
    state = {name:'',surname:'',age:'',description: '',image: '',updateFeedback: null} 
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
                .catch( ({error}) => {
                    this.setState({ results: null })
                    console.log(error)
                }) 
        } catch ({message}) {
            this.setState({ results: null})
        }
    }

    handleNameInput = event => this.setState({ name: event.target.value  })
    handleSurnameInput = event => this.setState({ surname: event.target.value })
    handleAgeInput = event => this.setState(Number({ age: event.target.value }))
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
                    alert('Usuario modificado')
                    this.props.history.push('/user')
                    this.setState({ searchFeedback:null}) 
                })
                .catch( ({message}) => {
                    this.setState({ searchFeedback:message})
                }) 
        } catch ({message}) {
            this.setState({ searchFeedback:message})
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
                image,
                updateFeedback}}
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
            <textarea  className="modify__card-description-input" onChange={handleDescriptionInput}  defaultValue={description}></textarea>
            </div>

            

            <div className="modify__card-image">
            {image && (<img className="modify__card-image-img" src={image} alt={image} />)}
                <input className="modify__card-image-input" onChange={handleImageInput} defaultValue={image} name="image" type="file"></input>
            </div>
        

            <div className="modify__card-button">
            <button className="modify__card-button-mod"> Modify </button>
            </div>
           

            <div className="modify__card-home">
            <Link to="/home" className="modify__card-home-link">Go home</Link>
            </div>  
        
            

                </form>   

            </div>

            { updateFeedback && <Feedback message={updateFeedback} level="warn" /> }
 
            </section>
        )
    }
}

export default withRouter(UserModify)