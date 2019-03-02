import React, { Component } from "react";
import { Grid, Row, Col, Button, Modal } from "react-bootstrap";
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

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsInfo: '',
      data: '',
      count: '',
      modalOpen: false,
      modalOpenlog: false
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
          this.setState({
            decisions: val.decisions,
            amendments: val.amendments,
            futurescope: val.futurescope,
            remarks: val.remarks
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

  handleMOMSave = () => {
    let id = this.props.match.params.id;
    const db = firestore.firestore();
    console.log("id ", id);
    db.collection("Events").doc(id).set({
      decisions: this.state.decisions,
      futurescope: this.state.futurescope,
      amendments: this.state.amendments,
      remarks: this.state.remarks
      // title: 'update'
    }, { merge: true })
    // db.collection('Events').doc(id).collection("MOM").set(data);
    this.handleClose();
  }

  render() {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    let data = this.state.data
    let eventsInfo = this.state.eventsInfo
    console.log(eventsInfo);

    return (
      <div className="content">
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
                          type: "email",
                          bsClass: "form-control",
                          placeholder: "Email id of the user",
                          //value: this.state.data.emailid,

                          onChange: this.handleChange
                        }]}
                    />
                    <FormInputs
                      ncols={["col-md-10"]}
                      proprieties={[
                        {
                          label: "Transaction To",
                          type: "email",
                          bsClass: "form-control",
                          placeholder: "Email id of the user",
                          //value: this.state.data.emailid,

                          onChange: this.handleChange
                        }]}
                    />
                    <FormInputs
                      ncols={["col-md-10"]}
                      proprieties={[
                        {
                          label: "Service consumed",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Enter Service consumed",
                          defaultValue: "Business",
                          onChange: this.handleChange
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-5"]}
                      proprieties={[
                        {
                          label: "Amount",
                          type: "number",
                          bsClass: "form-control",
                          placeholder: "Amount",
                          defaultValue:
                            "0",
                          onCha1nge: this.handleChange
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
              <Button variant="primary" onClick={this.handleCloselog}>
                Save Changes
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
          </Row>
          <Row>
            < Col md={10} >

              <h3>{eventsInfo.Title}</h3>
              <h6>{eventsInfo.Title}</h6>
              {/* <p>Date : {moment(eventsInfo.Date.seconds).format('DD MMM YYYY')}</p> */}
              <p>Link  : {eventsInfo.Link}</p>
              <p>Decisions Made  : {eventsInfo.Link}</p>
              <p>Future Scope : {eventsInfo.Link}</p>
              <p>Remarks: {eventsInfo.Remarks}</p>
              <p>Amendments : {eventsInfo.Amendments}</p>
              <Button variant="primary"
                style={{ marginBottom: '14px' }}
                onClick={this.handleOpen}
              >MOM</Button>
              <Button variant="primary"
                style={{ marginBottom: '14px' }}
                onClick={this.handleOpenlog}
              >Add Log</Button>

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
