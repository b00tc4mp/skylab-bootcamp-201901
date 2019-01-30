import React, { Component } from 'react';

class HomePanel extends React.Component{
    state = { query: '', }
    // handleEmailChange = event => this.setState({ email: event.target.value})
    handleSearchChange = event => this.setState({query: event.target.value})

    onClickSearch = event =>{
        event.preventDefault()
        //const { state: { email, password }, props: { onLogin } } = this
        const query = this.state.query
        const onSearchApp = this.props.onSearchApp
        onSearchApp(query)
    }

    clickLogOut = event =>{
        event.preventDefault()
        const onLogout = this.props.onLogout
        onLogout()
    }

    render() {
        return <section className=" rounded search container text-dark .col-sm-12 .col-md-10 .col-lg-8 .col-xl-8 justify-content-center">
                    <div className="row justify-content-center">
                        <h2 className="col-12">Welcome</h2>
                        <div className="col-10"></div>
                        <button onClick={this.clickLogOut} className="col-2 badge badge-danger">Exit</button>
                    </div>
                    <form onSubmit = {this.onClickSearch}>
                        <div className= "row justify-content-center">
                            <div className="row input-group mb-1 .col-sm-8 .col-md-8 .col-lg-6 .col-xl-6">
                                <input onChange={this.handleSearchChange} type="text" id="search" className="form-control .col-sm-5 .col-md-5 .col-lg-5 .col-xl-5" placeholder="Search on Spotify" aria-label="Username" aria-describedby="basic-addon1" /></div>
                            <button type="submit" className="btn btn-primary .col-sm-5">Search</button>
                        </div>
                    </form>
                </section>
                
    }
}


export default HomePanel