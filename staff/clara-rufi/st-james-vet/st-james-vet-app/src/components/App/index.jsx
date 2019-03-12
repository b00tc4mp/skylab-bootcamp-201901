import React, { Component, Fragment } from 'react'
import { Route, Redirect  } from 'react-router-dom'

import Welcome from '../Welcome'
import Login from '../Login'
import RegisterOwner from '../RegisterOwner'
import RegisterPet from '../RegisterPet'
import Home from '../Home'
import EditOwner from '../EditOwner'
import EditPet from '../EditPet'
import Visit from '../Visit'
 import VisitOwner from '../Visit_Owner'
import Appointments from '../Appointments';

import './index.sass'
import logic from '../../logic';

//testejar el helper, cors....

class App extends Component {
  
    state={isLoggedIn: logic.isUserLoggedIn, isAdmin: logic.isAdmin, feedback: ''}

    handleLogin = (email, password) => {
        try {
            logic.logInUser(email, password)
                .then(() =>{
                    this.setState({isLoggedIn: logic.isUserLoggedIn, isAdmin: logic.isAdmin})
                })
                .catch(({message})=> this.setState({ feedback: message }))
            
        } catch ({ message }) {
            this.setState({ feedback: message })
        }
    }
   
    render() {

        const {state: {isLoggedIn, isAdmin}, handleLogin} = this

        return <Fragment>

                <Route exactpath="/" render={() =>  isLoggedIn ? <Home/>: <Welcome/>}/>
    <Route path='/login' render={() => isLoggedIn? <Login/>: <Home/>}/> */}
                <Route path='/registerOwner' render={() => isAdmin? <RegisterOwner /> : <Redirect to='/'/>}/>

                 <Route path='/registerPet' component={RegisterPet}/>

                 <Route path='/editOwner' render={()=> isAdmin? <EditOwner /> : <Redirect to='/' /> }/>
                 <Route path='/editPet' component={EditPet}/>
                 <Route path='/visit' component={Visit}/>
                 <Route path='/appointments' component={Appointments}/>
                <Route path='/visitOwner' component={VisitOwner}/> 
                <Route path='/editOwner' component={EditOwner}/>                 
                <Route path='/login' component={Login}/>                  <Route path= '/home' component={Home}/> */}
            </Fragment>    
    }
}

export default App