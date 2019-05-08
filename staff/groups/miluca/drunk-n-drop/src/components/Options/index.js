import React, { Component } from 'react'    

import '../Navbar/index.sass'
import logo from '../Navbar/logomin.png'


class Options extends Component {
    state = { toggled: false }

    handleClick = () =>{
        this.setState( state => ({
            toggled: !state.toggled
        }));
    }

    render(){
        <nav class="level is-mobile bar">
            <p class="level-item has-text-centered">
                <a onClick={() => onRegister()} class="link is-info  regist-login">
                    Register
                </a>
            </p>
            <p class="level-item has-text-centered">
                <a onClick={() => { if (!islogedIn) this.LoginVisibleHandler() }} class="link is-info  regist-login">
                    Login
                </a>
            </p>
            <p class="level-item has-text-centered">
                <a onClick={() => this.goToSearch()} class="link is-info  regist-login">
                    Search
                </a>
            </p>
        </nav>

    }  

}

export default Options