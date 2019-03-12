import React, { Component } from 'react'
import './index.sass';




class Header extends Component {

    state = {

        user: ""


    }

    componentWillReceiveProps(props){

        this.setState({user:props.user})

    }    

    goToRegister = event => {
        event.preventDefault()

        const { props: {handleGoToRegister} } = this

        handleGoToRegister()
        

    }

    goToLogin= event => {
        event.preventDefault()
        const { props: {handleGoToLogin} } = this
        handleGoToLogin()

    }

    goToLanding = event => {
        event.preventDefault()
        
        const { props: {handleGoToLanding} } = this

        handleGoToLanding()



    }

    goToLogout = event => {
        event.preventDefault()

        this.setState({ user: "" })
        
        const { props: {handleGoToLogout} } = this

        handleGoToLogout()

    }
    goToUser = event => {
        event.preventDefault()

        const { props: {handleGoToUser} } = this

        handleGoToUser()


    }
    goToConversations = event => {
        event.preventDefault()

        const { props: {handleGoToConversations} } = this

        handleGoToConversations()

    }


    renderUnloggedButtons(goToLogin,goToRegister){
        
        return <div className="header-unLoggedButtons">

            <button className="header-unLoggedButtons__login" onClick={goToLogin}>Login</button>
            <button className="header-unLoggedButtons__register" onClick ={goToRegister}>Register</button>
        </div>

    }

    renderloggedButtons(goToLogout,goToConversations,goToUser){

        return <div className="header-loggedButtons">

            <img className="header-loggedButtons__messages" src="http://cdn.onlinewebfonts.com/svg/img_326000.png" onClick={goToConversations}></img>
            <img className="header-loggedButtons__logout" src="http://cdn.onlinewebfonts.com/svg/img_235476.png" onClick ={goToLogout}></img>
            <img className="header-loggedButtons__userProfile" src="http://monumentfamilydentistry.com/wp-content/uploads/2015/11/user-placeholder.png" onClick={goToUser}></img>
        </div>

    }


    render() {

        const { goToLogin, goToRegister, goToLanding, goToLogout,goToConversations,goToUser, renderUnloggedButtons,renderloggedButtons, state: { user } } = this

        return <div className="header">


            <img className="header__logo" src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png" onClick={goToLanding}></img>

            {user ? renderloggedButtons(goToLogout,goToConversations,goToUser):renderUnloggedButtons(goToLogin,goToRegister)}


        </div>






    }



}


export default Header