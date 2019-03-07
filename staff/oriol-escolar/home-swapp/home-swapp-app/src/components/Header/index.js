import React, { Component } from 'react'



class Header extends Component {

    state = {

        user: ""


    }

    componentWillReceiveProps(props){

        this.setState({user:props.user})

    }    

    goToRegister() {

    }

    goToLogin() {

    }

    goToLanding() {

    }

    goToLogout() {


    }
    goToUser() {


    }
    goToConversations() {


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

        return <section className="header">


            <img className="header__logo" src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png" onClick={goToLanding}></img>

            {user ? renderloggedButtons(goToLogin,goToRegister):renderUnloggedButtons(goToLogout,goToConversations,goToUser)}


        </section>






    }



}


export default Header