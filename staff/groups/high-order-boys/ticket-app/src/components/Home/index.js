import React, { Component } from 'react'
import Search from '../Search'
import { Link } from 'react-router-dom'

class Home extends Component {

    componentDidMount(){
        console.log('holaa')
    }

    render(){
        return<div>
            <h1>HOME</h1>
            <Search />
        </div> 
    }
}

export default Home