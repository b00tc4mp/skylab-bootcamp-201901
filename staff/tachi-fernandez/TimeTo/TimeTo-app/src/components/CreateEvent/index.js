import React, { Component } from 'react'
import { withRouter } from 'react-router-dom' 
import './index.sass'


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
        return (

          <section className="createEvent">
            <div className="createEvent__form">
            <form onSubmit={handleFromSubmit}>
              <h1 className="createEvent__form-h1">Create event</h1>

                <div className="createEvent__form-title">
                <label className="createEvent__form-title-label">Title:</label>
                <input onChange={handleTitleInput} className="createEvent__form-title-input" type="text" placeholder="Title" required/>
                </div>

                <div className="createEvent__form-description">
                <label className="createEvent__form-description-label" >Description:</label>
                <textarea onChange={handleDescriptionInput} className="createEvent__form-description-input" maxLength="200" type="text" placeholder="Max: 250 characters" required/>
                </div>

                <div className="createEvent__form-date">
                <label className="createEvent__form-date-label">Date:</label>
                <input onChange={handleDateInput}className="createEvent__form-date-input" min="2018-03-21" type="date" placeholder="Date" required/>
                </div>

                <div className="createEvent__form-city">
                <label className="createEvent__form-city-label" >City:</label>
                <input onChange={handleCityInput} className="createEvent__form-city-input" type="text" placeholder="City" required/>
                </div>

                <div className="createEvent__form-address" >
                <label className="createEvent__form-address-label">Address:</label>
                <input onChange={handleAddressInput} className="createEvent__form-address-input" type="text" placeholder="address" required/>
                </div>

                <div className="createEvent__form-category">
                <label className="createEvent__form-category-label" >Category:</label>
                <select className="createEvent__form-category-select" onChange={handleCategorySelect}>
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

                <button className="createEvent__form-button-create">
                Create event
                </button>

                <div className="createEvent__form-text">
                <p>Do not you want to create any event?</p>
                </div>
                <button className="createEvent__form-button-home" onClick={() => this.props.history.push('/home')}>
                        Home
                </button>

            </form>
            </div>
          </section>     
      )


    }
}

export default  withRouter(CreateEvent)