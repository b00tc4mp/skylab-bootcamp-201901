import React, { Component } from 'react'
import './index.css'


class CreateComment extends Component {
    state = { text: '', eventId : ''}

    handleTextInput = event => this.setState({ text : event.target.value })
    


    handleFromSubmit = event => {
        event.preventDefault()
        const { state: { text}, props: { eventId , onCreateComment } } = this
        onCreateComment(eventId ,text)
        this.setState({text : ''})
    }
    
  

    render() {
        const { handleTextInput , handleFromSubmit , state:{text}} = this
        return (

          <section className="create">
            <form className="create__form" onSubmit={handleFromSubmit}>
                <textarea className="create__form-text" onChange={handleTextInput} value={text}   type="text" placeholder="Writte comment..." required/>
                <button className="create__form-button">Comment</button>
            </form>
          </section>     
      )


    }
}

export default  CreateComment