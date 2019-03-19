/* eslint-disable */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import logic from '../../logic';
import moment from 'moment';
import './index.sass'

class VisitOwner extends Component {

    state = { user: '', appointmentsOwner: [], year: moment().format('YYYY'), month: moment().format('MM'), error: false, noAppointments: true, deleteVisit: false}


    componentDidMount() {
        this.retrieveAppointmentsOwner()
        this.retrieveUser()
    }

    retrieveAppointmentsOwner = async () => {
        debugger
        const appointmentsOwner = await logic.retrieveAppointmentsOwner()
        this.setState({ appointmentsOwner })
        // console.log(this.state.appointmentsOwner.length)
        // console.log(this.state.appointmentsOwner)
    }

    retrieveUser = async () => {
        const user = await logic.retrieveUser()
        this.setState({ user: user.id })
    }

    handleGoHome = event => {
        event.preventDefault()
        this.props.history.push('/home')
    }

    handleDeleteVisit = event => {
        event.preventDefault()
        const Id = event.target.value;
        this.deleteVisit(Id)
    }

    deleteVisit = async (Id) => {
        try {
            await logic.deleteAppointment(Id)
            this.setState({ deleteVisit: true, visitConfirmed: false })
            this.retrieveAppointmentsOwner()
        } catch ({ message }) {
            this.setState({ error: message, visitConfirmed: false })
        }
    }

    handleGoHome = event => {
        event.preventDefault()
        this.props.history.push('/home')
    }

    visitOwner=(id, owner, pet, date) => {
        let dateVisit = date
        var today = new Date()
        
        if ( dateVisit.getUTCFullYear() > today.getUTCFullYear()) return(   
            <tr>
            <p className="appointment" value={id}>
                <th>
                    Date:{' '}{dateVisit.getUTCMonth() + 1}{'-'}{dateVisit.getUTCDate()}{'-'}{dateVisit.getUTCFullYear()}
                    <br />
                    Hour:{' '}{dateVisit.getUTCHours() + 2}{':'}{dateVisit.getMinutes()}{'h'}
                    <br />
                    Pet:{' '}{pet.name}{owner.name}
                    <button onClick={this.handleDeleteVisit} value={id} className="button__delete">Delete</button> 
                    </th>
                </p>
            </tr>
        )


        if(  
            dateVisit.getUTCFullYear() === today.getUTCFullYear()
            &&
            dateVisit.getUTCMonth() + 1 > today.getUTCMonth() + 1
            ){
            
            return(   
                <tr>
                <p className="appointment" value={id}>
                    <th>
                        Date:{' '}{dateVisit.getUTCMonth() + 1}{'-'}{dateVisit.getUTCDate()}{'-'}{dateVisit.getUTCFullYear()}
                        <br />
                        Hour:{' '}{dateVisit.getUTCHours() + 2}{':'}{dateVisit.getMinutes()}{'h'}
                        <br />
                        Pet:{' '}{pet.name}{owner.name}
                        <button onClick={this.handleDeleteVisit} value={id} className="button__delete">Delete</button> 
                        </th>
                    </p>
                </tr>
            )
        } 


        if (dateVisit.getUTCMonth() + 1 == today.getUTCMonth() + 1 && (today.getUTCDate() + 2 < dateVisit.getUTCDate())) {
            return(   
                <tr>
                <p className="appointment" value={id}>
                    <th>
                        Date:{' '}{dateVisit.getUTCMonth() + 1}{'-'}{dateVisit.getUTCDate()}{'-'}{dateVisit.getUTCFullYear()}
                        <br />
                        Hour:{' '}{dateVisit.getUTCHours() + 2}{':'}{dateVisit.getMinutes()}{'h'}
                        <br />
                        Pet:{' '}{pet.name}{owner.name}
                        <button onClick={this.handleDeleteVisit} value={id} className="button__delete">Delete</button> 
                        </th>
                    </p>
                </tr>
            )
        }

        return(   
            <tr>
            <p className="appointment" value={id}>
                <th>
                    Date:{' '}{dateVisit.getUTCMonth() + 1}{'-'}{dateVisit.getUTCDate()}{'-'}{dateVisit.getUTCFullYear()}
                    <br />
                    Hour:{' '}{dateVisit.getUTCHours() + 2}{':'}{dateVisit.getMinutes()}{'h'}
                    <br />
                    Pet:{' '}{pet.name}{owner.name}
                    </th>
                </p>
            </tr>
        )
    }
    // }
render() {
    
    const { state: { appointmentsOwner }, visitOwner } = this
    
    return <form>
            <div className="input__form">
                <h1>Appointments:</h1>
                {
                    appointmentsOwner.map(({ id, owner, pet, date }) => {
                        
                        // console.log(11111, this.state.appointmentsOwner)
                        appointmentsOwner.sort(function (a, b) {
                            return a.date - b.date
                        })
                        // console.log(2222, this.state.appointmentsOwner)
                    // let dateVisit = new Date(date)
                    //   let dateVisit = date
                        // var today = new Date()
                        // var day = today.getDate()+2

                        if (owner._id === this.state.user) {
                            // return this.visitOwner(id, owner, pet, date)
                        return visitOwner(id, owner, pet, date)
                           
                                // <tr>
                                //     <p className="appointment" value={id}>
                                //         <th>
                                //             Date:{' '}{dateVisit.getUTCMonth() + 1}{'-'}{dateVisit.getUTCDate()}{'-'}{dateVisit.getUTCFullYear()}
                                //             <br />
                                //             Hour:{' '}{dateVisit.getUTCHours() + 2}{':'}{dateVisit.getMinutes()}{'h'}
                                //             <br />
                                //             Pet:{' '}{pet.name}{owner.name}
                                            /* {console.log(dateVisit.getUTCDate(), today.getDate()+2)} */
                                            /* {dateVisit.getUTCDate() < today.getDate()+2 ?   <button onClick={this.handleDeleteVisit} value={id} className="button__delete">Delete</button>:''}    */
                                //             {/* <button onClick={this.handleDeleteVisit} value={id} className="button__delete">Delete</button> */} 
                                //         </th>
                                //     </p>
                                // </tr>

//     <tr>
//     <p className="appointment" value={id}>
//         {/* <th className="calendarOwner"> */}
//         <th>
//             {/* Date:{' '}{dateVisit.getUTCMonth() + 1}{'-'}{dateVisit.getUTCDate()}{'-'}{dateVisit.getUTCFullYear()}
//             <br />
//             Hour:{' '}{dateVisit.getUTCHours() + 1}{':'}{dateVisit.getMinutes()}{'h'}
//             <br />
//             Pet:{' '}{pet.name}{owner.name} */}
//             {/* {dateVisit+2 >= today  ?  <button onClick={this.handleDeleteVisit} value={id} className="button__delete">Delete</button>:''}   
//             {/* {dateVisit.getUTCMonth() >= today.getUTCMonth() ?  <button onClick={this.handleDeleteVisit} value={id} className="button__delete">Delete</button>:''}    */}
//             {/* {dateVisit.getUTCDate() - today.getUTCDate() >= 2 ?   <button onClick={this.handleDeleteVisit} value={id} className="button__delete">Delete</button>:''}    */} */}

//             {/* dateVisit.getUTCMonth() >= today.getUTCMonth() && dateVisit.getUTCDate() - today.getUTCDate() >= 2 ?   <button onClick={this.handleDeleteVisit} value={id} className="button__delete">Delete</button>:''}    */}
//             {console.log(dateVisit.getUTCDate() - 2, today.getDate())}
//             {/* <button onClick={this.handleDeleteVisit} value={id} className="button__delete">Delete</button> */} 
//         </th>
//     </p>
// </tr>

//    {dateVisit.getUTCMonth() >= today.getUTCMonth() && dateVisit.getUTCDate() - today.getUTCDate() >= 2 ?   <button onClick={this.handleDeleteVisit} value={id} className="button__delete">Delete</button>:''}   


                        
                        }
// return visitOwner(id, owner, pet, date)

})
                    }
                {this.state.deleteVisit && <p className="feedback feedback__success">Appointment succesfully deleted</p>}
                <div className="no__appointments">
                    {/* <div className="noAppointments"> */}
                    {/* <p>You don't have any appointment</p> */}


                    <p>If you want an appointment or modify it, you can call at 01792 205000</p>
                    <p>Or send us an email: stjamesvet@stjamesvet.com</p>

                </div>
                    // </div>
                }
            </div>
            <button className="button__gohome" onClick={this.handleGoHome}>Go Home</button>
        </form>
    }
}

export default withRouter(VisitOwner)

// if (owner._id === this.state.user) {
//     if(dateVisit.getUTCDate() < today.getDate()){

// return (
    
//         <tr>
//             <p className="appointment" value={id}>
//                 <th>
//                     Date:{' '}{dateVisit.getUTCMonth() + 1}{'-'}{dateVisit.getUTCDate()}{'-'}{dateVisit.getUTCFullYear()}
//                     <br />
//                     Hour:{' '}{dateVisit.getUTCHours() + 2}{':'}{dateVisit.getMinutes()}{'h'}
//                     <br />
//                     Pet:{' '}{pet.name}{owner.name}
                  
//                     {/* <button onClick={this.handleDeleteVisit} value={id} className="button__delete">Delete</button> */}
//                 </th>
//             </p>
//         </tr>
        
//         )
         
     
        
//         // }
//         // count=+1
//         // console.log(count)
    
//     }
//     // this.getDelete()
    
// })
// }
// {this.state.deleteVisit && <p className="feedback feedback__success">Appointment succesfully deleted</p>}
// {this.state.noAppointments && <div className="no__appointments">
// {/* <div className="noAppointments"> */}
// {/* <p>You don't have any appointment</p> */}


// <p>If you want an appointment or modify it, you can call at 01792 205000</p>
// <p>Or send us an email: stjamesvet@stjamesvet.com</p>

// </div>
// // </div>
// }
// </div>
// <button className="button__gohome" onClick={this.handleGoHome}>Go Home</button>
// </form>
// }
// }
