import React, { Component} from 'react'
import Calendar from '../Calendar'




class Appointments extends Component {
   
    render() {
 

        return <section>
           
        <h1>Calendar</h1>
        <Calendar year={2019} month={5} ></Calendar>
        <Calendar year={2019} month={6} ></Calendar>
    
        </section>
              
    } 
  }
export default Appointments


   
  
