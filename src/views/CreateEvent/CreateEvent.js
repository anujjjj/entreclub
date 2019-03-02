import React, { Component } from "react";
import {
  Grid, Row, Col, FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import moment from 'moment';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Sector
} from 'recharts';
import { Link } from 'react-router-dom';
import Button from "components/CustomButton/CustomButton.jsx";

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

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      agenda: '',
      date: '',
      time: '',
      platform: '',
      link: ''
    }
  }

  componentDidMount() {
    // console.log("SADSAdas ", firebase.firestore.Timestamp.fromDate("1/1/1"))
    console.log("SADSAdas ", firebase.firestore.Timestamp.fromMillis(moment().unix()))
    console.log(moment().unix())


    // db.collection('Users').doc().set().then(snap => {
    //   let data = snap.data();
    //   this.setState({
    //     data: data,
    //     firstname: data.firstname,
    //     lastname: data.lastname,
    //     dob: data.dob,
    //     contact: data.contact,
    //     companyname: data.companyname,
    //     position: data.position,
    //     description: data.description,
    //     emailid: data.emailid
    //   })
    //   // console.log("sad", this.state.data);
    // });

  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = () => {
    const db = firestore.firestore();
    let id1 = localStorage.getItem("emailid")
    console.log("ad", this.state.date);
    console.log("ts", moment(this.state.date).valueOf());
    let va = moment(this.state.date).valueOf();
    console.log("va", va);
    console.log("fin", firebase.firestore.Timestamp.fromMillis(va));
    let dd = firebase.firestore.Timestamp.fromMillis(va);
    var addDoc = db.collection('Events').add({
      Title: this.state.title,
      Agenda: this.state.agenda,
      Date: dd,
      // time: this.state.time,
      Platform: this.state.platform,
      Link: this.state.link
    }).then(ref => {
      db.collection("Events").doc(ref.id).update({
        id: ref.id
      })
      console.log('Added document with ID: ', ref.id);
    });
  }

  render() {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    let eventsInfo = this.state.eventsInfo
    // console.log(eventsInfo);
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={9}>
              <Card
                title="Create Event"
                content={

                  <form>

                    <FormInputs
                      ncols={["col-md-10"]}
                      proprieties={[
                        {
                          name: 'title',
                          label: "Title",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Enter event title",
                          //value: this.state.data.emailid,

                          onChange: this.handleChange
                        }]}
                    />
                    <FormInputs
                      ncols={["col-md-8"]}
                      proprieties={[
                        {
                          name: 'agenda',
                          label: "Agenda",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Enter agenda for the event",
                          // defaultValue: "Business",
                          onChange: this.handleChange
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-5"]}
                      proprieties={[
                        {
                          name: 'date',
                          label: "Date",
                          type: "datetime-local",
                          bsClass: "form-control",
                          placeholder: "DD/MM/YY",
                          // defaultValue:
                          //   "XYZ",
                          onChange: this.handleChange
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-8"]}
                      proprieties={[
                        {
                          name: 'platform',
                          label: "Platform",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Enter Platform for the event",
                          // defaultValue: "Google+",
                          onChange: this.handleChange
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-8"]}
                      proprieties={[
                        {
                          name: 'link',
                          label: "Link",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Enter Link for the event",
                          // defaultValue: "Google+",
                          onChange: this.handleChange
                        }
                      ]}
                    />

                    <Button bsStyle="info" pullRight fill onClick={this.handleSubmit}>
                      Create Event
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

export default CreateEvent;
