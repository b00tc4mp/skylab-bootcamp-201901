import React, { Component } from 'react'
import { Link } from 'react-router-dom' 


class CreateEvent extends Component {
    state = { title: '', description: '' , date: '' , ubication : '' , category: ''}

    handleTitleInput = event => this.setState({ title: event.target.value })
    handleDescriptionInput = event => this.setState({ description: event.target.value })
    handleDateInput = event => this.setState({ date: event.target.value })
    handleUbicationInput = event => this.setState({ ubication: event.target.value })
    handleCategoryInput = event => this.setState({ category: event.target.value })


    handleFromSubmit = event => {
        event.preventDefault()
        const { state: { title, description, date, ubication, category}, props: { onCreateEvent } } = this
        onCreateEvent(title, description, date, ubication, category)
    }
    
  

    render() {
        const { handleTitleInput, handleDescriptionInput, handleDateInput , handleUbicationInput, handleCategoryInput , handleFromSubmit, handleGoBack } = this
        return (

          <section className="createEvent">
              <h1 className="createEvent__title">Create event</h1>
            <div className='createEvent__input'>
            <form onSubmit={handleFromSubmit}>
                <input onChange={handleTitleInput} className="createEvent__input-title" type="text" placeholder="Title" required/>
                <input onChange={handleDescriptionInput} className="createEvent__input-description" type="text" placeholder="Description" required/>
                <input onChange={handleDateInput} className="createEvent__input-Date" type="date" placeholder="Date" required/>
                <input onChange={handleUbicationInput} className="createEvent__input-ubication" type="text" placeholder="Ubication" required/>
                <input onChange={handleCategoryInput} className="createEvent__input-category" type="text" placeholder="Category" required/>
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