import React, { Component} from 'react'

// import Moment from 'react-moment';
// import InfiniteCalendar from 'react-infinite-calendar';
import './index.sass'

import moment from 'moment';
import {DatetimePicker} from 'rc-datetime-picker';
class Appointments extends Component {
   

        constructor() {
            super();
            this.state = {
              moment: moment()
            };
          }
        
          handleChange = (moment) => {
            this.setState({
              moment
            });
          }
        
          render() {

            return (
              <DatetimePicker>
                moment={this.state.moment}
                onChange={this.handleChange}
                </DatetimePicker>
            
            );
          }
        }
    


export default Appointments


   
  
