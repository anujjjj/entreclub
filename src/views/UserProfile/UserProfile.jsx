import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

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
      data: ''
    }
  }

  componentDidMount() {
    const db = firestore.firestore();
    let id1 = localStorage.getItem("emailid")

    // let id1 = currentUser.email
    let data = ''
    let val = '';
    let id = this.props.match.params.id == "id" ? this.props.match.params.id : id1
    console.log(this.props.match.params.id);

    db.collection('Users').doc(id).get().then(snap => {
      let data = snap.data();
      console.log(data);
      this.setState({
        data: data
      })
      console.log("sad", this.state.data);
    });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    let emailid = this.state.data.emailid;
    console.log(this.state);
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
                          value: this.state.data.emailid,
                          disabled: true,
                          onChange: this.handleChange
                        },
                        {
                          label: "DOB",
                          type: "date",
                          bsClass: "form-control",
                          placeholder: "Username",
                          value: "1/1/1",
                          onChange: this.handleChange
                        },
                        {
                          label: "Contact No",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "Number",
                          onChange: this.handleChange
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-4", "col-md-4"]}
                      proprieties={[
                        {
                          label: "First name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "First name",
                          defaultValue: "Mike",
                          onChange: this.handleChange
                        },
                        {
                          label: "Last name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Last name",
                          defaultValue: "Andrew",
                          onChange: this.handleChange
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-7", "col-md-5"]}
                      proprieties={[
                        {
                          label: "Company Name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Company Name",
                          defaultValue:
                            "XYZ",
                          onChange: this.handleChange
                        },
                        {
                          label: "Position",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Position"
                        }
                      ]}
                    />


                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="formControlsTextarea">
                          <ControlLabel>Description</ControlLabel>
                          <FormControl
                            rows="5"
                            componentClass="textarea"
                            bsClass="form-control"
                            placeholder="Here can be your description"
                            defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button bsStyle="info" pullRight fill type="submit">
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
