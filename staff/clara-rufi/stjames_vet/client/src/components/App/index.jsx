import React, { Component, Fragment } from 'react'
import { Route  } from 'react-router-dom'

import Welcome from '../Welcome'
import Login from '../Login'
import Register_Owner from '../Register_Owner'
import Register_Pet from '../Register_Pet'
import Home from '../Home'
import EditOwner from '../EditOwner'
import EditPet from '../EditPet'
import Visit from '../Visit'


import Appointments from '../Appointments';

import './index.sass'

//testejar el helper, cors....

class App extends Component {
  
   
    render() {
        return <Fragment>
                <Route exact path='/' component={Welcome}/>
                <Route path='/login' component={Login}/>
                <Route path='/registerOwner' component={Register_Owner}/>
                <Route path='/registerPet' component={Register_Pet}/>
                <Route path='/editOwner' component={EditOwner}/>
                <Route path='/editPet' component={EditPet}/>
                <Route path='/visit' component={Visit}/>
                <Route path='/appointments' component={Appointments}/>

                <Route path= '/home' component={Home}/>
            </Fragment>    
    }
}

export default App