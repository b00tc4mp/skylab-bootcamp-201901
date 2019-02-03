import React, {Component} from 'react'
import Search from '../Search'


class Header extends Component {


    render(){

        const { handleSearch } = this

        return <header className="header">
            <p>Hamburguer</p>
            <p>Logo</p>
            <Search onSearch={handleSearch}/>
            <p>inciar session</p>
        </header>
    }
}


export default Header