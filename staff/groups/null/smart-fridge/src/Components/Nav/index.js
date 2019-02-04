import React from 'react'
import './index.sass'


class Nav extends React.Component{


    render(){
        return <nav className="nav navbar navbar-light bg-light">
                    <img src='./logo.png' alt='logo'className="navbar-brand" ></img>

                    <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        {this.props.user.name}
                     </button>
            </nav>

    }
}

export default Nav