import React, {Component, Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'
import './index.sass'


class Breadcrumb extends Component {

  state = {pathname: '/home', city: ''}


  componentWillReceiveProps(props){
    const {pathname} = props
    this.setState({pathname}, () => {
      pathname.includes('search') && pathname.split('/').length && this.setState({city: pathname.split('/').pop()})
    })   
   
  }

    render() {

      const{ state: {pathname, city}} = this

        return <nav className="breadcrumb" aria-label="breadcrumbs">
        <ul>
          {pathname.includes('/home') && <li className={pathname === '/home' ? 'is-active': ''} ><Link to="/home" className="breadcrumbHome">Home</Link></li>}
          {pathname.includes('/home/user')&& <li className={pathname === '/home/user' ? 'is-active': ''} ><Link to="/home/user">User</Link></li>}
          {pathname.includes('/home/user/favourites')&& <li className={pathname === '/home/user/favourites' ? 'is-active': ''} ><Link to="/home/user/favourites">Favourites</Link></li>}
          {pathname.includes('home/search')&& <li className={pathname.includes('/home/search') ? 'is-active': ''} ><a href="#">Search</a></li>}
          {pathname.includes('/home/event')&& <Fragment><li><Link to={`/home/search/${city}`}>Search</Link></li><li className={pathname.includes('/home/event') ? 'is-active': ''} ><a href="#">Event</a></li></Fragment>}
        </ul>
      </nav>
    }

}

export default withRouter(Breadcrumb)