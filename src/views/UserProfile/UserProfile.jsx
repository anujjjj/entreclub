import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import moment from 'moment'
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import firestore from "../../firestore";
import firebase from "../../firestore";
import avatar from "assets/img/faces/face-3.jpg";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      err: '',
      data: '',
      firstname: '',
      lastname: '',
      dob: '',
      contact: '',
      companyname: '',
      position: '',
      description: '',
      emailid: ''
    }
  }

  componentDidMount() {
    const db = firestore.firestore();
    let id1 = localStorage.getItem("emailid")

    // let id1 = currentUser.email
    let data = ''
    let val = '';

    console.log(this.props.match.params.id === "id");
    let id = this.props.match.params.id === ":id" ? id1 : this.props.match.params.id
    // console.log(id);

    db.collection('Users').doc(id).get().then(snap => {
      let data = snap.data();
      this.setState({
        data: data,
        firstname: data.firstname,
        lastname: data.lastname,
        dob: data.dob,
        contact: data.contact,
        companyname: data.companyname,
        position: data.position,
        description: data.description,
        emailid: data.emailid
      })
      // console.log("sad", this.state.data);
    });

  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleUpdate = () => {
    const db = firestore.firestore();
    let id1 = localStorage.getItem("emailid")
    let id = this.props.match.params.id === ":id" ? id1 : this.props.match.params.id
    // console.log("dsadsa", this.state.dob.toString());
    db.collection("Users").doc(id).update({
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      dob: this.state.dob,
      contact: this.state.contact,
      companyname: this.state.companyname,
      position: this.state.position,
      description: this.state.description
    })
  }

  render() {
    let emailid = this.state.emailid;

    const that = this;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={9}>
              <Card
                title="Edit Profile"
                content={

                  <form>
                    <center><img src={avatar}
                      style={{
                        alignItems: "center",
                        borderRadius: '50%',
                        margin: '5px 0 30 0'
                      }}

                    /></center>
                    <FormInputs
                      ncols={["col-md-5", "col-md-3", "col-md-4"]}
                      proprieties={[
                        {
                          label: "Email Id (disabled)",
                          type: "email",
                          bsClass: "form-control",
                          placeholder: "Email",
                          value: this.state.emailid,
                          disabled: true,
                          onChange: this.handleChange
                        },
                        {
                          name: "dob",
                          label: "DOB",
                          type: "date",
                          bsClass: "form-control",
                          value: moment(this.state.dob).format("YYYY-MM-DD"),
                          onChange: this.handleChange
                        },
                        {
                          name: "contact",
                          label: "Contact No",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "Number",
                          value: this.state.contact,
                          onChange: this.handleChange
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-4", "col-md-4"]}
                      proprieties={[
                        {
                          name: "firstname",
                          label: "First name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "First name",
                          value: this.state.firstname,
                          onChange: this.handleChange
                        },
                        {
                          name: "lastname",
                          label: "Last name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Last name",
                          value: this.state.lastname,
                          onChange: this.handleChange
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-7", "col-md-5"]}
                      proprieties={[
                        {
                          name: "companyname",
                          label: "Company Name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Company Name",
                          value: this.state.companyname,
                          onChange: this.handleChange
                        },
                        {
                          name: "position",
                          label: "Position",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Position",
                          value: this.state.position,
                          onChange: this.handleChange
                        }
                      ]}
                    />

                    <Col md={12}>
                      <form>
                        <label>Description</label>
                        <textarea
                          name="description"
                          onChange={this.state.handleChange}
                          value={this.state.description}
                          rows="4" fluid style={{ width: "100%" }}>
                        </textarea>
                      </form>
                    </Col>
                    <Button bsStyle="info" pullRight fill onClick={this.handleUpdate}>
                      Update Profile
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserProfile;
