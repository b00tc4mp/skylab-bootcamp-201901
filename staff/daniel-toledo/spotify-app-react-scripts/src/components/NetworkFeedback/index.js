import React from 'react'

class NetworkFeedback extends React.Component{
    state= {token:''}

    handleTokenInput = event => this.setState({ token: event.target.value }) 

    handleGetToken= event => {
        event.preventDefault()

        var token = this.state.token
        this.props.getToken(token)
    }

    render(){
        var link= "https://developer.spotify.com/console/get-search-item/?q=upc%3A00602537817016&type=album&market=&limit=&offset="
        return <section className="welcome">
        <section className="login__margins">
            <div className="login container pl-lg-5 pr-lg-5">
                <h2 className="mt-3">Token error</h2>
                <a href={link} target='blank' >Get Token</a>
                <form onSubmit={this.handleGetToken} className="form-inline p-2 row">
                    <input onChange={this.handleTokenInput} className="form-control mr-sm-2 col-sm-6 col-12" type="text" name="token" placeholder="Insert Token..." aria-label="Search" />
                    <button className="btn btn-outline-info my-2 my-sm-0 col-sm-5 col-12" type="submit">Accept new Token</button>
                </form>
            </div>
        </section>
    </section> 
    }
}

export default NetworkFeedback