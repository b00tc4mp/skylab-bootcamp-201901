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
    
        <div className="header__register">
        {!logic.isUserLoggedIn ? <Link to="/register" >Register</Link> : '' }
        </div>
    
        <div  className="header__login">
        {!logic.isUserLoggedIn ? <Link to="/login" >Login</Link> : '' }    
        </div>
    
        <div className="header__link-create-event">
        {logic.isUserLoggedIn ? <Link to="/create-event" >Create Event</Link> : '' }      </div>
        <div>
    
        <div>
        {logic.isUserLoggedIn ? <button onClick={onLogout}>Logout</button> : <Redirect to ='/home' />}
        </div>
    
        <div>
        {logic.isUserLoggedIn ? <Link to="/user" > User</Link> : '' }
        </div>
    
        <div>
        {logic.isUserLoggedIn ? <Link to="/my-events" > My events</Link> : '' }
        </div>
    
        </div>
        </section>
        )}
}  

export default withRouter(Header)