import React, {Component} from 'react'
import Search from '../Search'


class Header extends Component {


    render(){
        return <header className="header">
            <p>Hambuerguer</p>
            <p>Logo</p>
            {/* <Search onSearch/> */}
            <p>inciar session</p>
        </header>
    }
}


export default Header