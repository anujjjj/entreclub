import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BarLoader from 'react-bar-loader'
import { fireAuth } from 'firebase'
import firebase from 'firebase'

import './style.scss'

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
      loading: false
    }
  }

  componentDidMount() {
    // console.log(firebase.auth());
    if (localStorage.getItem("isAuthenticated")) {
      this.props.history.replace('/dashboard');
    }
    else {
      this.props.history.replace('/signin');
    }
  }

  handleValidation = () => {
    let formIsValid = true;
    let errors = {};
    let { email, password } = this.state;

    if (!password) {
      formIsValid = false;
      errors["password"] = "Cannot be empty";
    }
    if (!email) {
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  async fireBaseAuthentication(email, password) {
    let fireAuth = firebase.auth();
    try {
      const emailInDbMatch = await fireAuth.fetchSignInMethodsForEmail(email)
      const didEmailInDbMatch =
        (await emailInDbMatch.length) === 0 ? false : true
      if (!didEmailInDbMatch) {
        await this.setState({
          message: 'No user found by that email',
        })
      } else {

        await fireAuth.signInWithEmailAndPassword(email, password)
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("emailid", email);
        this.props.history.replace('/dashboard');
      }
    } catch (err) {
      await this.setState({
        message: err.message,
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({
      loading: true
    })

    if (!this.handleValidation()) {
      // alert("Form has errors");
    }
    else {
      const { email, password } = this.state;
      this.fireBaseAuthentication(email, password);
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-5 col-md-offset-4 col-lg-4 col-lg-offset-4">

            <h3>Entre Club</h3>
            {this.state.loading && <BarLoader color="#1D8BF1" height="4" />}
            <div className="panel panel-default box-shadow">
              <div className="panel-heading">
                <span className="text-primary">Sign In</span>
                <span className="text-muted pull-right today" title="Today"></span>
              </div>
              <div className="panel-body">
                <form >
                  <div className="form-group">
                    <label className="form-group-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email"
                      onChange={this.handleChange}
                    />
                    <span className="validn " style={{ color: "red" }}>{this.state.errors["email"]}</span>
                  </div>
                  <div className="clearfix"></div>

                  <div className="form-group">
                    <label className="form-group-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password"
                      onChange={this.handleChange}
                    />
                    <span className="validn " style={{ color: "red" }}>{this.state.errors["password"]}</span>
                  </div>

                  <button className="btn btn-block btn-primary" onClick={this.handleSubmit} tabindex="3">Sign In</button>
                  {/* <p class="text-center text-muted h4">
                    or
            </p>
                  <Link to="/registration" class="btn btn-block btn-success" tabindex="5">Create account</Link> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SignIn;