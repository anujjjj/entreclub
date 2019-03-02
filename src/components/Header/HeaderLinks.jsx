import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import { Button } from 'react-bootstrap'
import firebase from 'firebase'
import { withRouter } from 'react-router-dom'

class HeaderLinks extends Component {

  logout = () => {
    let fireAuth = firebase.auth();
    fireAuth.signOut()
      .then(() => {

        localStorage.removeItem('isAuthenticated');
        this.props.history.replace('/signin');
      })
      .catch(error => console.log(error.message));
  }

  render() {

    console.log(this.props);
    const notification = (
      <div>
        <i className="fa fa-globe" />
        <b className="caret" />
        {/* <span className="notification">5</span> */}
        <p className="hidden-lg hidden-md">Notification</p>
      </div>
    );
    return (
      <div>
        <Nav>
          <NavItem eventKey={1} href="#">
            <p className="hidden-lg hidden-md">Dashboard</p>
          </NavItem>

        </Nav>
        <Nav pullRight>

          {/* <NavDropdown
            eventKey={2}
            title={notification}
            noCaret
            id="basic-nav-dropdown"
          > */}
            {/* <MenuItem eventKey={2.1}>Notification 1</MenuItem>
            <MenuItem eventKey={2.2}>Notification 2</MenuItem>
            <MenuItem eventKey={2.3}>Notification 3</MenuItem>
            <MenuItem eventKey={2.4}>Notification 4</MenuItem>
            <MenuItem eventKey={2.5}>Another notifications</MenuItem> */}
          {/* </NavDropdown> */}
          {/* <NavItem eventKey={1} href="#">
            Account
          </NavItem> */}
          {/* <NavDropdown
            eventKey={2}
            title="Dropdown"
            id="basic-nav-dropdown-right"
          >
            <MenuItem eventKey={2.1}>Action</MenuItem>
            <MenuItem eventKey={2.2}>Another action</MenuItem>
            <MenuItem eventKey={2.3}>Something</MenuItem>
            <MenuItem eventKey={2.4}>Another action</MenuItem>
            <MenuItem eventKey={2.5}>Something</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={2.5}>Separated link</MenuItem>
          </NavDropdown> */}

          <button class="btn" style={{ border: "0px", marginBottom: '10px' }} onClick={this.logout}>Log Out</button>
        </Nav>
      </div>
    );
  }
}

export default withRouter(HeaderLinks);
