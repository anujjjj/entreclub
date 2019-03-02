import React, { Component } from "react";
import { Grid } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <Grid fluid>
          <nav className="pull-left">
            <ul>
              <li>
                <a href="#dashboard">Dashboard</a>
              </li>
              <li>
                <a href="#user">User Profile</a>
              </li>
              <li>
                <a href="#list">Entrepreneur List</a>
              </li>
            </ul>
          </nav>
          <p className="copyright pull-right">
            copyright
            &copy; {new Date().getFullYear()}{" "}
          </p>
        </Grid>
      </footer>
    );
  }
}

export default Footer;
