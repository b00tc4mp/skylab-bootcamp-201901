import React from 'react';
import { Container, Col, Row, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import ShoppingCartIcon from '../shopping-cart'
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
  }
  render() {
    return (
      <div>
        <Navbar color="faded" light>
          <NavbarBrand href="/" className="mr-auto">
          <Container flex-start>
            <Row>
              <Col>nozama</Col>
              <Col>
                <NavLink href="#">
                  <ShoppingCartIcon 
                    onGoToCart={this.handleGoToCart} 
                    cartQuantity={this.props.cartQuantity}/>          
                </NavLink>
              </Col>
            </Row>
          </Container>
          </NavbarBrand>

          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              {!logic.isLoggedIn && 
                  <NavItem>
                    <Link to="/login">Login</Link>
                  </NavItem>}
              {!logic.isLoggedIn && 
                <NavItem>
                  <Link to="/register/">Register</Link>
                </NavItem> 
              }
              {logic.isLoggedIn && 
                <NavItem>
                  <Link to="/logout/">Logout</Link>
                </NavItem>
              }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
