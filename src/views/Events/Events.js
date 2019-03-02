import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Card } from "components/Card/Card.jsx";
import moment from 'moment';
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
      count: ''
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
        }
      });
    }
    );
    this.loadBarData();
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

  render() {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    let data = this.state.data
    let eventsInfo = this.state.eventsInfo
    console.log(eventsInfo);

    return (
      <div className="content">
        <Grid fluid>
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
