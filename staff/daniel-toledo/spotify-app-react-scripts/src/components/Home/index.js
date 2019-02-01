import React from 'react'
import Search from '../Search'

class Home extends React.Component {


    handleSearch = query => this.props.onSearch(query)
    searchFeedback =() => this.props.feedback


    render() {
        return <section className="welcome">
            <div className="welcome__banner">
                <h2 className="text-center pt-5 display-2"> Welcome, <span></span>!</h2>
                <p className="text-center mt-2 display-5">Search for an Artist to listen its music. </p>
                <Search onSearch={this.handleSearch} feedback={this.searchFeedback} />
            </div>

        </section>
    }
}

export default Home