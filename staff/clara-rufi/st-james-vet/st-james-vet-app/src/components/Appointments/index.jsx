import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Calendar from '../Calendar'
import './index.sass'


class Appointments extends Component {

  state = { users: [], pets: [], appointments: [], error: null, confirmHour: false }

  handleOnChange = ({ target: { name, value } }) => this.setState({ [name]: value })


  render() {

    return <section>

      <Calendar year={this.state.year} month={this.state.month} ></Calendar>

    </section>

  }
}

export default withRouter(Appointments)




