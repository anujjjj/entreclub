import React, { Component } from "react";
import { Grid, Row, Col, Button, Modal, Table } from "react-bootstrap";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Card } from "components/Card/Card.jsx";
import moment from 'moment';
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Sector
} from 'recharts';
import { Link } from 'react-router-dom';

import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";

import firestore from "../../firestore";
import firebase from "../../firestore";
import { format } from "url";

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsInfo: '',
      data: '',
      count: '',
      modalOpen: false,
      modalOpenlog: false,
      modalOpenee: false,
      logData: []
    }
  }

  componentDidMount() {
    const db = firestore.firestore();
    var ref = db.collection('Users');
    let size = 0, val = '';
    let events = []
    let id = this.props.match.params.id;
    db.collection('Events').get().then(snap => {
      size = snap.docs.length // will return the collection size
      snap.docs.forEach(data => {
        val = data.data();
        if (val.id === id) {
          this.setState({
            eventsInfo: val
          })
          console.log("sad", moment.unix(val.Date.seconds).format("YYYY-MM-DDTHH:mm"));
          this.setState({
            decisions: val.Decisions,
            amendments: val.Amendments,
            futurescope: val.Futurescope,
            remarks: val.Remarks,
            Link: val.Link,
            Title: val.Title,
            Agenda: val.Agenda,
            Date:
              moment.unix(val.Date.seconds).format("YYYY-MM-DDTHH:mm"),
            Platform: val.Platform
          })
        }
      });
    }
    );

    this.loadBarData();
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleEditEvent = () => {
    let id = this.props.match.params.id;
    const db = firestore.firestore();
    let va = moment(this.state.Date).valueOf();
    let dd = firebase.firestore.Timestamp.fromMillis(va);
    console.log("dd ", dd);

    db.collection("Events").doc(id).update({
      Link: this.state.Link,
      Title: this.state.Title,
      Agenda: this.state.Agenda,
      Date: dd,
      Platform: this.state.Platform
    })
    this.handleCloseee()
  }

  loadBarData = () => {
    const db = firestore.firestore();
    let size = 0;
    let amt = [];
    let val = '', k = '';
    let labels = [];
    let values = [];
    let id = this.props.match.params.id;
    let count = []
    // console.log(id);
    // console.log('Events/' + id + '/Logs');

    db.collection('Events/' + id + '/Logs').get().then(snap => {
      size = snap.docs.length // will return the collection size      
      snap.docs.forEach(data => {
        val = data.data();
        // console.log(val);
        if (amt[val.service_consumed]) {
          amt[val.service_consumed] += val.amount;
          count[val.service_consumed]++;
        }
        else {
          amt[val.service_consumed] = val.amount;
          count[val.service_consumed] = 1;
        }
      });
      let i = 1;
      for (k in amt) {
        labels.push({
          name: k, service: i, amount: amt[k]
        });

        i++;
      }
      i = 0;

      for (k in count) {
        values.push({
          name: k, service: i, amount: count[k]
        });

        i++;
      }

      this.setState({
        data: labels,
        count: values,
        totalServices: i
      })
    }
    );
  }

  handleOpen = () => {
    console.log(this.props.match.params.id);
    this.setState({
      modalOpen: true
    })
  }

  handleClose = () => {

    this.setState({
      modalOpen: false
    })
  }

  handleOpenViewLog = () => {
    this.handleLogMount();
    console.log(this.props.match.params.id);
    this.setState({
      modalOpenViewLog: true
    })
  }

  handleCloseViewLog = () => {

    this.setState({
      modalOpenViewLog: false
    })
  }

  handleOpenlog = () => {

    this.setState({
      modalOpenlog: true
    })
  }

  handleCloselog = () => {

    this.setState({
      modalOpenlog: false,
      fromUser: '',
      toUser: '',
      amount: ''
    })
  }

  handleOpenee = () => {

    this.setState({
      modalOpenee: true
    })
  }

  handleCloseee = () => {
    this.setState({
      modalOpenee: false
    })
  }

  handleLogMount = () => {
    const db = firestore.firestore();
    var ref = db.collection('Users');
    let size = 0, val = '';
    let users = []
    let user = []
    let obj = ''
    let id = this.props.match.params.id;
    db.collection('Events').doc(id).collection("Logs").get().then(snap => {
      size = snap.docs.length // will return the collection size
      snap.docs.forEach(data => {
        val = data.data();
        obj = {
          from_user: val.from_user,
          to_user: val.to_user,
          service_consumed: val.service_consumed,
          amount: val.amount
        }
        user = Object.values(obj);
        users.push(user);
        console.log("logs ", users);
      })
      this.setState({
        logData: users
      })
    });
  }

  handleEESave = () => {
    let id = this.props.match.params.id;
    const db = firestore.firestore();
    console.log("id ", id);
    // db.collection("Events").doc(id).set({
    //   Decisions: this.state.decisions,
    //   Futurescope: this.state.futurescope,
    //   Amendments: this.state.amendments,
    //   Remarks: this.state.remarks
    // }, { merge: true })
    this.handleClose();
  }

  handleLogSave = () => {
    const db = firestore.firestore();
    let id = this.props.match.params.id;
    let size = ''
    db.collection("Events").doc(id).collection("Logs").add({
      from_user: this.state.fromUser,
      to_user: this.state.toUser,
      amount: this.state.amount
    })
      .then(() => {
        db.collection("Events").doc(id).get()
          .then(snap => {
            console.log("snap", snap);
            let h = snap.data().amount
            console.log("h", h);
            if (h) {
              console.log("parseInt(snap.data().amount", parseInt(snap.data().amount))
              this.setState({
                amountToBeAdded: parseInt(snap.data().amount)
              })
            }
            else {
              console.log("amountToBeAdded", 0)
              this.setState({
                amountToBeAdded: 0
              })
            }
            console.log("amt2beadd", this.state.amountToBeAdded);
            console.log("this.state.amountToBeAdded", this.state.amountToBeAdded);
            console.log("this.state.amount", this.state.amount);
            let v1 = this.state.amountToBeAdded;
            let v2 = this.state.amount;
            console.log("this.state.amountToBeAdded", v1)
            console.log("this.state.amount", v2)
            db.collection("Events").doc(id).update({
              amount: parseInt(v1) + parseInt(v2)
            })
          });
      })
    this.handleCloselog();
  }

  handleMOMSave = () => {
    let id = this.props.match.params.id;
    const db = firestore.firestore();
    console.log("id ", id);
    db.collection("Events").doc(id).set({
      Decisions: this.state.decisions,
      Futurescope: this.state.futurescope,
      Amendments: this.state.amendments,
      Remarks: this.state.remarks
    }, { merge: true })
    // db.collection('Events').doc(id).collection("MOM").set(data);
    this.handleClose();
  }

  render() {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    let data = this.state.data
    let eventsInfo = this.state.eventsInfo
    console.log("eventsInfo", eventsInfo);
    let thArray = ["From User", "To User", "Service", "Amount"];
    return (
      <div className="content" >
        <Grid fluid>
          {this.state.modalOpen && <Modal show={this.state.modalOpen} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>MOM</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={9}>
                  {/* <Card */}
                  <p>Add Minutes of Meeting</p>
                  {/* content={ */}
                  <form>
                    <FormInputs
                      ncols={["col-md-10"]}
                      proprieties={[
                        {
                          name: "decisions",
                          label: "Decisions Made",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Enter Decisions made",
                          value: this.state.decisions,
                          onChange: this.handleChange
                        }]}
                    />
                    <FormInputs
                      ncols={["col-md-10"]}
                      proprieties={[
                        {
                          name: 'futurescope',
                          label: "Future Scope",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Enter Future scope of the meeting",
                          value: this.state.futurescope,
                          onChange: this.handleChange
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-10"]}
                      proprieties={[
                        {
                          name: 'amendments',
                          label: "Amendments",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Enter Amendments",
                          value: this.state.amendments,
                          onChange: this.handleChange
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-10"]}
                      proprieties={[
                        {
                          name: 'remarks',
                          label: "Remarks",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Enter Remarks if any",
                          value: this.state.remarks,
                          onChange: this.handleChange
                        }
                      ]}
                    />
                    <div className="clearfix" />
                  </form>
                  {/* } */}

                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
            </Button>
              <Button variant="primary" onClick={this.handleMOMSave}>
                Save Changes
            </Button>
            </Modal.Footer>
          </Modal>
          }
          {this.state.modalOpenee && <Modal show={this.state.modalOpenee} onHide={this.handleCloseee}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={9}>
                  {/* <Card */}
                  {/* content={ */}
                  <form>

                    <FormInputs
                      ncols={["col-md-10"]}
                      proprieties={[
                        {
                          name: 'Title',
                          label: "Title",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Enter event title",
                          value: this.state.Title,
                          onChange: this.handleChange
                        }]}
                    />
                    <FormInputs
                      ncols={["col-md-8"]}
                      proprieties={[
                        {
                          name: 'Agenda',
                          label: "Agenda",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Enter agenda for the event",
                          value: this.state.Agenda,
                          // defaultValue: "Business",
                          onChange: this.handleChange
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-8"]}
                      proprieties={[
                        {
                          name: 'Date',
                          label: "Date",
                          type: "datetime-local",
                          bsClass: "form-control",
                          placeholder: "DD/MM/YY",
                          // value: this.state.Date,
                          defaultValue:
                            "12/12/12 04:01",
                          value: this.state.Date,
                          onChange: this.handleChange
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-8"]}
                      proprieties={[
                        {
                          name: 'Platform',
                          label: "Platform",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Enter Platform for the event",
                          value: this.state.Platform,
                          // defaultValue: "Google+",
                          onChange: this.handleChange
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-8"]}
                      proprieties={[
                        {
                          name: 'Link',
                          label: "Link",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Enter Link for the event",
                          value: this.state.Link,
                          // defaultValue: "Google+",
                          onChange: this.handleChange
                        }
                      ]}
                    />
                    <div className="clearfix" />
                  </form>
                  {/* } */}

                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleCloseee}>
                Close
            </Button>
              <Button variant="primary" onClick={this.handleEditEvent}>
                Save Changes
            </Button>
            </Modal.Footer>
          </Modal>
          }
          {this.state.modalOpenlog && <Modal show={this.state.modalOpenlog} onHide={this.handleCloselog}>
            <Modal.Header closeButton>
              <Modal.Title>Add Log</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={9}>
                  {/* <Card */}
                  <p>Add Log</p>
                  <form>

                    <FormInputs
                      ncols={["col-md-10"]}
                      proprieties={[
                        {
                          label: "Transaction From",
                          name: "fromUser",
                          type: "email",
                          bsClass: "form-control",
                          placeholder: "Email id of the user",
                          value: this.state.fromUser,

                          onChange: this.handleChange
                        }]}
                    />
                    <FormInputs
                      ncols={["col-md-10"]}
                      proprieties={[
                        {
                          name: "toUser",
                          label: "Transaction To",
                          type: "email",
                          bsClass: "form-control",
                          placeholder: "Email id of the user",
                          value: this.state.toUser,
                          //value: this.state.data.emailid,
                          onChange: this.handleChange
                        }]}
                    />
                    <FormInputs
                      ncols={["col-md-10"]}
                      proprieties={[
                        {
                          name: "serviceConsumed",
                          label: "Service consumed",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Enter Service consumed",
                          value: this.state.serviceConsumed,
                          onChange: this.handleChange
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-5"]}
                      proprieties={[
                        {
                          name: "amount",
                          label: "Amount",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "Amount",
                          value: this.state.amount,
                          onChange: this.handleChange
                        }
                      ]}
                    />



                    <div className="clearfix" />
                  </form>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleCloselog}>
                Close
            </Button>
              <Button variant="primary" onClick={this.handleLogSave}>
                Save Changes
            </Button>
            </Modal.Footer>
          </Modal>
          }
          {this.state.modalOpenViewLog && <Modal show={this.state.modalOpenViewLog} onHide={this.handleCloseViewLog}>
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
              <Button variant="secondary" onClick={this.handleCloseViewLog}>
                Close
            </Button>
            </Modal.Footer>
          </Modal>
          }

          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-users text-success" />}
                statsText="Total Services"
                statsValue={this.state.totalServices}
              // statsIcon={<i className="fa fa-refresh" />}
              // statsIconText="Updated now"
              />
            </Col>

            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-users text-success" />}
                statsText="Total Amount"
                statsValue={this.state.eventsInfo.amount ? this.state.eventsInfo.amount : 0}
              // statsIcon={<i className="fa fa-refresh" />}
              // statsIconText="Updated now"
              />
            </Col>
          </Row>
          <Row>
            < Col md={10} >

              <h3>{eventsInfo.Title}</h3>

              <p>Agenda  : {eventsInfo.Agenda}</p>
              <p>Date : {moment(this.state.Date).format("DD   MM YYYY HH:MM")}</p>
              <p>Platform  : {eventsInfo.Platform}</p>
              <p>Link  : {eventsInfo.Link}</p>

              <Button variant="primary"
                style={{ marginBottom: '14px', marginRight: '25px' }}
                onClick={this.handleOpen}
              >MOM</Button>
              <Button variant="primary"
                style={{ marginBottom: '14px', marginRight: '25px' }}
                onClick={this.handleOpenlog}
              >Add Log</Button>
              <Button variant="primary"
                style={{ marginBottom: '14px', marginRight: '25px' }}
                onClick={this.handleOpenee}
              >Edit Event</Button>
              <Button variant="primary"
                style={{ marginBottom: '14px', marginRight: '25px' }}
                onClick={this.handleOpenViewLog}
              >View Log</Button>
              <Card
                title="Amount per Service"
                category="All logs of the event considered"
                content={
                  <div className="ct-chart"
                    style={{
                      marginBottom: '90px'
                    }}
                  >
                    <ResponsiveContainer height={300}>
                      <BarChart
                        data={this.state.data}
                        margin={{
                          top: 10, right: 10, left: 30, bottom: 65,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="amount" stackId="a" fill="#8884d8" />
                        {/* <Bar dataKey="service" stackId="a" fill="#82ca9d" /> */}
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                }
              />
              <Card
                title="Entrepreneurs per Service"
                category="All logs of the event considered"
                content={
                  <div className="ct-chart"
                    style={{
                      marginBottom: '90px'
                    }}
                  >
                    <ResponsiveContainer height={300}>
                      <BarChart
                        data={this.state.count}
                        margin={{
                          top: 10, right: 10, left: 30, bottom: 65,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="amount" stackId="a" fill="#8884d8" />
                        {/* <Bar dataKey="name" stackId="a" fill="#82ca9d" /> */}
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                }
              />
            </Col>
          </Row>



        </Grid >
      </div >
    );
  }
}

export default Event;
