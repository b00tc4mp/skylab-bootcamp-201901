import React, { Component } from 'react'


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

          <section className="createEvent">
            <form onSubmit={handleFromSubmit}>
                <input onChange={handleTextInput} value={text}  className="createComment__input-title" type="text" placeholder="Writte comment..." required/>
                <button className="createEvent__button">Comment</button>
            </form>
          </section>     
      )


    }
}

export default  CreateComment