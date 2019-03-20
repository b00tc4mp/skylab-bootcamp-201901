import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Calendar from '../Calendar'
import './index.sass'


class Appointments extends Component {

  state = { users: [], pets: [], appointments: [], error: null, confirmHour: false }

  handleOnChange = ({ target: { name, value } }) => this.setState({ [name]: value })

  handleGoHome = event => {
    event.preventDefault()
    this.props.history.push('/home')
  }


  render() {

    return <section>

      <Calendar year={this.state.year} month={this.state.month} ></Calendar>
      <button className="button__gohome" onClick={this.handleGoHome}>Go Home</button>

    </section>

  }
}

export default withRouter(Appointments)




