import React, {Component} from 'react'
import logic from '../../logic'
import {Link,withRouter} from 'react-router-dom'
import Feedback from '../Feedback';

class UserModify extends Component{
    state = {name:'',surname:'',age:'',description: '',email: '',image: '',updateFeedback: null} 
    componentDidMount(){
        debugger
        try {
            debugger
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
    handleAgeInput = event => this.setState({ age: event.target.value })
    handleDescriptionInput = event => this.setState({ description: event.target.value })
    handleEmailInput = event => this.setState({ email: event.target.value })
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
        const {state:{name,surname,age,description,email}} = this
        console.log(name)
        try {
            logic.updateUser(name,surname,age,description,email)
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
            handleEmailInput,
            handleImageInput,
            updateUser,
            state:{name,
                surname,
                age,
                description,
                email,
                image,
                updateFeedback}}
            = this

        return( 
            <section>
            <form onSubmit={updateUser}>
            <div>

            <div>
            <label>Name:</label>
            <input onChange={handleNameInput}  defaultValue={name}></input>
            </div>

            <div>
            <label>Surname:</label>
            <input onChange={handleSurnameInput}  defaultValue={surname}></input>
            </div>

            <div>
            <label>Age:</label>
            <input onChange={handleAgeInput}  defaultValue={age} type="text"></input>
            </div>

            <div>
            <label>Description:</label>
            <input onChange={handleDescriptionInput}  defaultValue={description}></input>
            </div>

            <div>
            <label>Email:</label>
            <input onChange={handleEmailInput} defaultValue={email} type="text"></input>
            </div>

            <div>
            {image && (<img className="image" src={image} alt={image} />)}
                <input onChange={handleImageInput} defaultValue={image} name="image" type="file"></input>
            </div>
        

           
            </div>

            <div>
            <Link to="/home" className="user__link-home">Go home</Link>
            <button> Modify </button>
            </div>  

                </form>   

            { updateFeedback && <Feedback message={updateFeedback} level="warn" /> }
 
            </section>
        )
    }
}

export default withRouter(UserModify)