import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Breadcrumb extends Component {

  state = {pathname: '/home'}


  componentWillReceiveProps(props){
    const {pathname} = props
    this.setState({pathname})
  }

    render() {

      const{ state: {pathname}} = this

      console.log('pathname', pathname)
      console.log(pathname.includes())
        return <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          {pathname.includes('/home') && <li className={pathname === '/home' ? 'is-active': ''} ><Link to="/home">Home</Link></li>}
          {pathname.includes('/home/user')&& <li className={pathname === '/home/user' ? 'is-active': ''} ><Link to="/home/user">User</Link></li>}
          {pathname.includes('/home/user/favourites')&& <li className={pathname === '/home/user/favourites' ? 'is-active': ''} ><Link to="/home/user/favourites">Favourites</Link></li>}
          {pathname.includes('/home/search')&& <li className={pathname.includes('/home/search') ? 'is-active': ''} ><a href="#">Search</a></li>}
          {/* <li><a href="#">Bulma</a></li>
          <li><a href="#">Documentation</a></li>
          <li><a href="#">Components</a></li>
          <li class="is-active"><a href="#" aria-current="page">Breadcrumb</a></li> */}
        </ul>
      </nav>
    }

}

export default Breadcrumb