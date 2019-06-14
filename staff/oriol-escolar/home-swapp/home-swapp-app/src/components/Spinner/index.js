import React, { Component } from 'react'
import './index.sass';

/*
 * React Material Design Loading Spinner
 * Based off https://material.io/guidelines/components/progress-activity.html#progress-activity-types-of-indicators
 */
class Spinner extends Component {
    
    render() {
        return <i className="fas fa-sync fa-spin spinner"></i>

    }
  }
 export default Spinner