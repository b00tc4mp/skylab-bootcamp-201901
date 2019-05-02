import React from 'react';
import Search from '../Search';
import ShoppingCartIcon from '../shopping-cart';
import { Link } from 'react-router-dom';
import logic from '../../logic';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  handleGoToCart = () => {
    console.log('Go to cart');
  };
  render() {
    return (
      <div>
        <div className="navbar navbar-light navbar-faded">
          <div className="navbar-brand mr-auto" href="/">
            <div className="container flex-start">
              <div className="row">
                <Link to="/">
                  <div className="col">nozama</div>
                </Link>
                <div className="col">
                  <Link className="navbar-nav" to="/cart/">
                    <ShoppingCartIcon
                      onGoToCart={this.handleGoToCart}
                      cartQuantity={this.props.cartQuantity}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {!logic.isLoggedIn && (
                <li className="nav-item my-2">
                  <Link to="/login">Login</Link>
                </li>
              )}
              {!logic.isLoggedIn && (
                <li className="nav-item my-2">
                  <Link to="/register/">Register</Link>
                </li>
              )}
              {logic.isLoggedIn && (
                <li className="nav-item my-2">
                  <Link to="/userProfile/">User profile</Link>
                </li>
              )}
              {logic.isLoggedIn && (
                <li className="nav-item my-2">
                  <Link to="/logout/">Logout</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
        <Search />
      </div>
    );
  }
}
