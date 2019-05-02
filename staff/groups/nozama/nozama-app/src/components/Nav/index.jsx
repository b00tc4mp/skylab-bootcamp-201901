import React from 'react';
import {
  Container,
  Col,
  Row,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
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
                <div className="col">nozama</div>
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
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon" />
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {!logic.isLoggedIn && (
                <li class="nav-item">
                  <Link to="/login">Login</Link>
                </li>
              )}
              {!logic.isLoggedIn && (
                <li class="nav-item">
                  <Link to="/register/">Register</Link>
                </li>
              )}
              {logic.isLoggedIn && (
                <li class="nav-item">
                  <Link to="/logout/">Logout</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
