import React , {Component} from 'react'
import { Link,Redirect,withRouter } from 'react-router-dom' 
import './index.css'
import logic from '../../logic'


class Header extends Component {

    onLogout = () => {
        logic.logOutUser()
        sessionStorage.clear()
        return this.props.history.push('/home')
      }

    render(){
        const {onLogout} = this
        return (<section className="header">
    
        {/* <div className="header__register">
        {!logic.isUserLoggedIn ? <Link to="/register" >Register</Link> : '' }
        </div> */}

        {!logic.isUserLoggedIn ? <button  
            onClick={() => this.props.history.push('/register')}>Register
        </button> : ''}
    
        {/* <div  className="header__login">
        {!logic.isUserLoggedIn ? <Link to="/login" >Login</Link> : '' }    
        </div> */}

        {!logic.isUserLoggedIn ? <button  
            onClick={() => this.props.history.push('/login')}>Login
        </button> : ''}
    
        {/* <div className="header__link-create-event">
        {logic.isUserLoggedIn ? <Link to="/create-event" >Create Event</Link> : '' }      </div>
        <div> */}

        {logic.isUserLoggedIn ? <button  
            onClick={() => this.props.history.push('/create-event')}>Create Event
        </button> : ''}
    
        {/* <div>
        {logic.isUserLoggedIn ? <button onClick={onLogout}>Logout</button> : <Redirect to ='/home' />}
        </div> */}

        {logic.isUserLoggedIn ? <button  
            onClick={onLogout}>Logout
        </button> : <Redirect to ='/home' />}
    
        {/* <div>
        {logic.isUserLoggedIn ? <Link to="/user" > User</Link> : '' }
        </div> */}

        {logic.isUserLoggedIn ? <button  
            onClick={() => this.props.history.push('/user')}>User
        </button> : ''}
    
        {/* <div>
        {logic.isUserLoggedIn ? <Link to="/my-events" > My events</Link> : '' }
        </div>
     */}

        {logic.isUserLoggedIn ? <button  
            onClick={() => this.props.history.push('/my-events')}> My Events
        </button> : ''}


        
        </section>
        )}
}  

export default withRouter(Header)