import React, { Component, Fragment } from 'react'
// import Login from 'Login'
// import Register from 'Register'
import Nav from '../Nav'
import Footer from '../Footer'
import Carousel from '../Carousel'

import './index.sass'


class Welcome extends Component{
   
    render(){

      return <Fragment>
          <Nav className='fixed'></Nav>
          <Carousel className="fixed"></Carousel>
          <Footer className='fixed'></Footer>
      </Fragment>
    }
}

export default Welcome