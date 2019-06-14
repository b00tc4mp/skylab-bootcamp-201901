import React, { Component } from 'react'
import { withRouter } from 'react-router-dom' 
import './index.sass'
import Feedback from '../Feedback'


class CreateEvent extends Component {
    state = { title: '', description: '' , date: '' , city : '', address: '' , category: ''}

    handleTitleInput = event => this.setState({ title: event.target.value })
    handleDescriptionInput = event => this.setState({ description: event.target.value })
    handleDateInput = event => this.setState({ date: event.target.value })
    handleCityInput = event => this.setState({ city: event.target.value })
    handleAddressInput = event => this.setState({ address: event.target.value })
    handleCategorySelect = event => this.setState({ category: event.target.value })


    handleFromSubmit = event => {
        event.preventDefault()
        const { state: { title, description, date, city, address, category}, props: { onCreateEvent } } = this
        onCreateEvent(title, description, date, city, address, category)
    }
    
  

    render() {
        const { handleTitleInput, 
            handleDescriptionInput, 
            handleDateInput , 
            handleCityInput, 
            handleAddressInput,
            handleCategorySelect ,
            handleFromSubmit } = this

        const {feedback} = this.props
        return (


          <section className="createEvent">
            <div className="createEvent__form">
            <form onSubmit={handleFromSubmit}>
              <h1 className="createEvent__form-h1">Create event</h1>

                <div className="createEvent__form-title">
                <input onChange={handleTitleInput} className="createEvent__form-input" type="text" placeholder="Title" required/>
                </div>

                <div className="createEvent__form-description">
                <textarea onChange={handleDescriptionInput} className="createEvent__form-input" maxLength="400" type="text" placeholder="Description of the event, meeting point, time... Max: 400 characters" required/>
                </div>

                <div className="createEvent__form-date">
                <input onChange={handleDateInput}className="createEvent__form-input" min="2018-03-21" type="date" placeholder="Date" required/>
                </div>

                <div className="createEvent__form-city">
                <input onChange={handleCityInput} className="createEvent__form-input" type="text" placeholder="City" required/>
                </div>

                <div className="createEvent__form-address" >
                <input onChange={handleAddressInput} className="createEvent__form-input" type="text" placeholder="Address" required/>
                </div>

                <div className="createEvent__form-category">
                <select className="createEvent__form-select" onChange={handleCategorySelect}>
                    <option>Category...</option>
                    <option value="5c7e95f564f6cfa555e483d6">Party</option>
                    <option value="5c7e961964f6cfa555e483e8">Food</option>
                    <option value="5c7e965a64f6cfa555e483ff">See Matches</option>
                    <option value="5c7e968364f6cfa555e4840b">Do Sport</option>
                    <option value="5c7e969e64f6cfa555e48419">Drink Something</option>
                    <option value="5c7e96b464f6cfa555e48420">Trip</option>
                    <option value="5c7e96c064f6cfa555e48426">Study</option>
                    <option value="5c7e96e064f6cfa555e48435">Cinema</option>
                    <option value="5c7e96f164f6cfa555e4843b">Dance</option>
                    <option value="5c7e970264f6cfa555e48448">Family</option>
                    <option value="5c7e971964f6cfa555e4844f">Photografy</option>
                    <option value="5c7e972664f6cfa555e48454">Video Games</option>
                </select>
                </div>

                <div className="button-primary-action">
                    <button className="createEvent__form-button createEvent__form-button--blue">
                        Create event
                    </button>
                </div>

                <div className="button-secondary-action">
                    <button className="createEvent__form-button createEvent__form-button--green" onClick={() => this.props.history.push('/home')}>
                            Home
                    </button>
                </div>

                { feedback && <Feedback message={feedback} level="warn" /> }
            </form>
            </div>
          </section>     
      )


    }
}

export default  withRouter(CreateEvent)