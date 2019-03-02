import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl, Modal, Table
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
      emailid: '',
      modalOpenlog: false
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
    this.handleUserLog()
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleUserLog = () => {
    const db = firestore.firestore();
    var ref = db.collection('Users');
    let size = 0, val = '';
    let users = []
    let user = []
    let obj = ''
    let id = this.props.match.params.id;
    let val2 = ''
    db.collection('Events').get().then(snap => {
      size = snap.docs.length // will return the collection size
      snap.docs.forEach(data => {
        val = data.data();
        obj = {
          from_user: val.from_user,
          to_user: val.to_user,
          service_consumed: val.service_consumed,
          amount: val.amount
        }
        // user = Object.values(obj);
        // users.push(user);
        console.log("logs ", val);
        db.collection('Events/' + val.id + '/Logs').get().then(logdoc => {
          logdoc.docs.forEach(data2 => {
            val2 = data2.data();
            // console.log("val2", val2);
            if ((val2.from_user === localStorage.getItem("emailid"))
              || (val2.to_user === localStorage.getItem("emailid"))
            ) {
              obj = {
                from_user: val2.from_user,
                to_user: val2.to_user,
                service: val2.service_consumed,
                amount: val2.amount
              }
              console.log("object1", obj);
              user = Object.values(obj);
              users.push(user);
              console.log("valid", users);
            }
          })
        })

      })
      this.setState({
        logData: users
      })
    });
  }

  handleOpenlog = () => {

    this.setState({
      modalOpenlog: true
    })
  }

  handleCloselog = () => {

    this.setState({
      modalOpenlog: false
    })
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
    let thArray = ["from ", "to", "service", "amount"]
    const that = this;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            {this.state.modalOpenlog && <Modal show={this.state.modalOpenlog} onHide={this.handleCloselog}>
              <Modal.Header closeButton>
                <Modal.Title>View Log</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <Col md={9}>
                    {/* <Card */}
                    <p>Logs for the event</p>
                    {/* content={ */}
                    <Table striped hover>
                      <thead>
                        <tr>
                          {thArray.map((prop, key) => {
                            return <th key={key}>{prop}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.logData.map((prop, key) => {
                          return (
                            <tr key={key}>
                              {prop.map((prop, key) => {
                                if (key === 0) {
                                  return <td key={key}>{prop}</td>
                                }
                                return <td key={key}>{prop}</td>;
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                    {/* } */}

                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleCloselog}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            }
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
                    <Button variant="primary"
                      style={{ marginBottom: '14px', marginRight: '25px' }}
                      onClick={this.handleOpenlog}
                    >View Log</Button>
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
