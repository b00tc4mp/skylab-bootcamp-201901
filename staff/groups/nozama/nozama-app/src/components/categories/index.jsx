import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class Categories extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Categories
        </DropdownToggle>
        <DropdownMenu>
          {this.props.categories.map(categorie => <DropdownItem>{categorie}</DropdownItem>)}
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}

export default Categories