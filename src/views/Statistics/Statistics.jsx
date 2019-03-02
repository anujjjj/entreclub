import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import moment from 'moment';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Sector, LineChart, Line
} from 'recharts';

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

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalEnt: 0,
      totalEvent: 0,
      data: '',
      data1: '',
      data2: '',
      labels: ''
    }
  }

  componentDidMount() {
    const db = firestore.firestore();
    var ref = db.collection('Users');
    let size = 0;
    db.collection('Users').get().then(snap => {
      size = snap.docs.length // will return the collection size
      this.setState({
        totalEnt: size
      })
    }
    );
    size = 0
    db.collection('Events').get().then(snap => {
      size = snap.docs.length // will return the collection size
      this.setState({
        totalEvent: size
      })
    }
    );
    console.log(size);
    this.loadBarData();
    this.loadPie();
    this.loadLineChart();
  }

  loadLineChart = () => {
    const db = firestore.firestore();
    let size = 0;
    let amt = [];
    let val = '', k = '';

    db.collection('Events').get().then(snap => {
      snap.docs.forEach(data => {
        val = data.data();
        console.log(val);
        amt.push({
          name: val.Title, date: moment(val.Date.seconds).format('DD MMM YY'), amount: val.amount
          // name: 'Event', uv: 1, pv: val.amount
        })
      });
      console.log(amt);
      amt.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
      });
      this.setState({
        data2: amt
      })
    })

  }

  loadPie = () => {
    const db = firestore.firestore();
    let size = 0;
    let amt = [];
    let val = '', k = '';
    let males = 0;
    let females = 0;
    db.collection('Users').get().then(snap => {
      snap.docs.forEach(data => {
        val = data.data();
        if (val.gender === "Female") {
          males++;
        }
        else {
          females++;
        }
      });
      this.setState({
        data1: [
          { name: 'Males', value: males },
          { name: 'Females', value: females }
        ]
      })
      console.log("Dat1 ", this.state.data1);
    })
  }



  loadBarData = () => {
    const db = firestore.firestore();
    let size = 0;
    let amt = [];
    let val = '', k = '';
    let labels = [];
    let values = [];
    db.collection('Events/1/Logs').get().then(snap => {
      size = snap.docs.length // will return the collection size      
      snap.docs.forEach(data => {
        val = data.data();
        // console.log(val);
        if (amt[val.service_consumed])
          amt[val.service_consumed] += val.amount;
        else
          amt[val.service_consumed] = val.amount;
      });
      let i = 1;
      for (k in amt) {
        console.log(k, amt[k]);
        labels.push({
          name: k, uv: i, pv: amt[k]
        });
        i++;
        values.push(amt[k]);
      }
      this.setState({
        data: labels
      })
    }
    );
  }

  render() {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    let data = this.state.data1
    let data2 = this.state.data2
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-users text-success" />}
                statsText="Total Entrepreneurs"
                statsValue={this.state.totalEnt}
              // statsIcon={<i className="fa fa-refresh" />}
              // statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-users text-success" />}
                statsText="Total Events"
                statsValue={this.state.totalEvent}
              // statsIcon={<i className="fa fa-calendar-o" />}
              // statsIconText="Last day"
              />
            </Col>
          </Row>

          <Row>
            <Col md={10}>
              <Card
                title="Amount per Event"
                category="All  of the event considered"
                content={
                  <div className="ct-chart"
                    style={{
                      marginBottom: '90px'
                    }}
                  >
                    <ResponsiveContainer height={300}>
                      <LineChart data={data2}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <XAxis dataKey="date" />
                        <YAxis datakey="amount" />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Line type="linear" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                }
              />
            </Col>


            <Col md={6}>
              <Card
                title="Male Female"
                category="Male Female"
                content={
                  <div className="ct-chart"
                    style={{
                      marginBottom: '120px',
                      marginTop: '-40px'
                    }}
                  >
                    <ResponsiveContainer height={500}>
                      <PieChart width={500} height={500}>
                        <Pie dataKey="value" isAnimationActive={true} data={data} cx={200} cy={200} outerRadius={100} fill="#8884d8" label />
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                }
              />
            </Col>

            <Col md={6}>
              <Card
                title="Male Female"
                category="Male Female"
                content={
                  <div className="ct-chart"
                    style={{
                      marginBottom: '120px',
                      marginTop: '-40px'
                    }}
                  >
                    <ResponsiveContainer height={500}>
                      <PieChart width={500} height={500}>
                        <Pie dataKey="value" isAnimationActive={true} data={data} cx={200} cy={200} outerRadius={100} fill="#8884d8" label />
                        <Tooltip />
                      </PieChart>
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

class CustomTooltip extends Component {

  render() {
    const { active } = this.props;


    if (active) {
      const { payload, label } = this.props;
      // console.log(payload[0].payload);
      // console.log(payload);
      return (
        <div className="custom-tooltip">
          <p className="label">{`Date : ${payload[0].payload.date}`}</p>
          <p className="label">{`Duration : ${payload[0].payload.amount}`}</p>
          {/* <p className="label">{`Event Title : ${payload[0].payload.name}`}</p> */}
        </div>
      );
    }

    return null;
  }
};


export default Statistics;
