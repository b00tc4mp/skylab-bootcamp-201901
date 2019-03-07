import React, { Component} from 'react'

import moment from 'moment';

class Calendar extends Component {
    
    handleVisit = event =>{
        event.preventDefault()

    }

    render() {
        const { props: { year, month } } = this

        const m = moment(`${year}-${month}`)
        return <section>
            <h2>{m.format('MMMM')}</h2>
            {
                (() => {
                    const days = []
                    const weeks = Math.ceil((m.day() + m.daysInMonth()) / 7)

                    let paint = false
                    let count = 1
                    // let dayweek= 1
                    // let weekday=0

                    for (let w = 0; w < weeks; w++) {
                        for (let d = 0; d < 7; d++) {
                            if (d === m.day()) paint = true; 

                            const mNow = moment(`${year}-${month}-${count}`)


                            if (paint && count <= m.daysInMonth()) {
                                // if(dayweek<7)
                                // days.push(<div className="day-month" key={count}>{` ${mNow.format('dddd')} ${dayweek++}`}</div>)
                                // if(weekday<7)
                                days.push(<div><table><tr className="month-day" key={count}>{`${mNow.format('dddd')}    ${count++}`}
                                </tr>
                                <tr>
                                    <th onClick={this.handlevisit}>17:00</th>
                        
                                </tr>

                                <tr>
                                    <th onClick={this.handlevisit}>17:30</th>
                                </tr>
                                <tr>
                                    <th onClick={this.handlevisit}>18:00</th>
                                </tr>
                                <tr>
                                    <th onClick={this.handlevisit}>18:30</th>
                                </tr>
                                <tr>
                                    <th onClick={this.handlevisit}>19:00</th>
                                </tr>
                                <tr>
                                    <th onClick={this.handlevisit}>19:30</th>
                                </tr>
                            
                                </table>
                                </div>)
                               
                                //days.push(<div className="current-month-day" key={count}>{` ${count++}`}</div>)
                                //days.push(<div className="current-month-day" key={count}>{` ${count++} ${weekday++}`}</div>)
                                // if(weekday>7)
                                
                                // days.push(<div className="current-month-day" key={count}>{` ${count++} ${weekday++}`}</div>)
                            } else
                                days.push(<div className="day" key={`${w}-${d}`}></div>)
                        }
                    }
                
                    return days
                })()
            }
              </section>

              
      
              
    } 
  }
export default Calendar