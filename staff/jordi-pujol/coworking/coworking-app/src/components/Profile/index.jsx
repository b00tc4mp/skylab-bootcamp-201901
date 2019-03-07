import React, { Component } from 'react'
import {Route, withRouter} from 'react-router-dom'

class Profile extends Component {

    render() {

        return <section>
            <h2>Profile</h2>
            <h3>Basic Info</h3>
                <form>
                    <input type="text" placeholder="Name"/>
                    <input type="text" placeholder="Surname"/>
                    <img url="https://pm1.narvii.com/6345/537c878cad3a8b3630df52f128b12ce5d3bcdf6b_00.jpg"></img>
                    <input type="email" placeholder="Email"/>
                    <input type="text" placeholder="Company Name"/>
                    <input type="text" placeholder="Interests"/>
                    <button>Save Changes</button>
                </form>
        </section>
    }
}

export default withRouter(Profile)