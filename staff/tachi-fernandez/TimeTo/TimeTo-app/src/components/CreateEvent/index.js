import React, { Component } from 'react'
import { Link } from 'react-router-dom' 


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
        const { handleTitleInput, handleDescriptionInput, handleDateInput , handleCityInput, handleAddressInput ,handleCategorySelect , handleFromSubmit, handleGoBack } = this
        return (

          <section className="createEvent">
              <h1 className="createEvent__title">Create event</h1>
            <div className='createEvent__input'>
            <form onSubmit={handleFromSubmit}>
                <input onChange={handleTitleInput} className="createEvent__input-title" type="text" placeholder="Title" required/>
                <textarea onChange={handleDescriptionInput} className="createEvent__input-description" maxLength="200" type="text" placeholder="Description" required/>
                <input onChange={handleDateInput} className="createEvent__input-Date" min="2018-03-21" type="date" placeholder="Date" required/>
                <input onChange={handleCityInput} className="createEvent__input-city" type="text" placeholder="City" required/>
                <input onChange={handleAddressInput} className="createEvent__input-Address" type="text" placeholder="address" required/>
                <select onChange={handleCategorySelect}>
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
                <button className="createEvent__button">Create event</button>
            </form>
            </div>
            <div className="createEvent__link">
                <div>
                <Link to="/home" className="createEvent__link-home">Go home</Link>
                </div>
            </div>
          </section>     
      )


    }
}

export default  CreateEvent