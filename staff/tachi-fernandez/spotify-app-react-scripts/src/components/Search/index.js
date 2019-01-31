import React , {Component} from 'react'
import Feedback from '../Feedback'



class Search extends Component {
    state = { query: '', searchFeedback: '' }
    handleQueryInput = event => this.setState({ query: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()
        const { state: { query }, props: { onSearch } } = this
        onSearch(query)
    }




    render() {
        const { handleFormSubmit, handleQueryInput, props: { feedback, onLogout } } = this
        return <section className="search">
            <form onClick={handleFormSubmit}>
                <button onClick={onLogout}>Logout</button>
                <h2>Welcome </h2>
                <input type="text" onChange={handleQueryInput}></input>
                <button type="submit" >Search</button>
                {feedback && <Feedback message={feedback} />}
            </form>
        </section>
    }


}

export default Search