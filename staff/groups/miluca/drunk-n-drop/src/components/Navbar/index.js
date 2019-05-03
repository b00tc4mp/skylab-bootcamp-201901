import React, { Component } from 'react'    

import '../Navbar/index.sass'
import logo from '../Navbar/logomin.png'


class Navbar extends Component {
    state = { toggled: false }

    handleClick = () =>{
        this.setState( state => ({
            toggled: !state.toggled
          }));
    }

    render(){
        return <nav class="navbar is-black is-fixed-top">
        <div class="navbar-brand">
        <a class="navbar-item Navbar_logo" href="/">
        <img src={logo} alt="Drunk n Drop" width="100" height="28" />
        </a>
        <div class="navbar-burger burger" onClick={this.handleClick} data-target="navbar">
            <span></span>
            <span></span>
            <span></span>
        </div>
        </div>
        <div id="navbar" className={this.state.toggled ?"navbar-menu is-back is-active ":"navbar-menu" }>
        <div class="navbar-start">
        {!this.props.isHome && <div class="navbar-item has-dropdown is-hoverable" >
            <a class="navbar-link" href="/search" >
            Categories
            </a>
            <div class="navbar-dropdown is-boxed" > 
                <a class="navbar-item" onClick={() => this.props.categorySearch('Cocktail')} >
                Cocktail
                </a>
                <a class="navbar-item" onClick={() => this.props.categorySearch('Milk / Float / Shake')}>
                Milk / Float / Shake
                </a>
                <a class="navbar-item" onClick={() => this.props.categorySearch('Cocoa')}>
                Cocoa
                </a>
                <a class="navbar-item" onClick={() => this.props.categorySearch('Shot')}>
                Shot
                </a>
                <a class="navbar-item" onClick={() => this.props.categorySearch('Coffee / Tea')}>
                Coffee / Tea
                </a>
                <a class="navbar-item" onClick={() => this.props.categorySearch('Homemade Liqueur')}>
                Homemade Liqueur
                </a>
                <a class="navbar-item" onClick={() => this.props.categorySearch('Punch / Party Drink')}>
                Punch / Party Drink
                </a>
                <a class="navbar-item" onClick={() => this.props.categorySearch('Beer')}>
                Beer
                </a>
                <a class="navbar-item" onClick={() => this.props.categorySearch('Soft Drink / Soda')}>
                Soft Drink / Soda
                </a>
                <a class="navbar-item" onClick={() => this.props.categorySearch('Other/Unknown')}>
                Other/Unknown
                </a>

            </div>
        </div>}
            
        </div>
        </div>
    </nav>

    }  

}

export default Navbar