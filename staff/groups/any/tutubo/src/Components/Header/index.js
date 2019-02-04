import React, {Component} from 'react'
import Search from '../Search'


class Header extends Component {

    render(){
        
        const { props:{onSearch, onGoToLogin} } = this

        return <header className="header">
            <p>Hamburguer</p>
            <p>Logo</p>
            <Search onSearch={onSearch}/>
            <button onClick={onGoToLogin}>Login to Sesson</button>
        </header>
    }
}


export default Header