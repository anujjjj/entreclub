import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
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

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsInfo: []
    }
  }

  componentDidMount() {

    if (!localStorage.getItem("isAuthenticated")) {
      this.props.history.replace("/signin");
    }

    const db = firestore.firestore();
    var ref = db.collection('Users');
    let size = 0, val = '';
    let events = []
    db.collection('Events').get().then(snap => {
      size = snap.docs.length // will return the collection size
      snap.docs.forEach(data => {
        val = data.data();
        if (moment.unix(val.Date.seconds) - moment() > 0)
          events.push(val);
      });
      events.sort(function (a, b) {
        return new Date(moment.unix(a.Date.seconds)) - new Date(moment.unix(b.Date.seconds));
      });
      size = 1;
      this.setState({
        eventsInfo: events
      })
    }
    );
  }



  render() {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    let eventsInfo = this.state.eventsInfo
    console.log(eventsInfo);
    return (
      <div className="content">
        <Grid fluid>
          <h3 style={{ marginTop: '-8px', marginBottom: '17px' }}>Upcoming Events</h3>
          <Row>
            {eventsInfo.map(data => (

              < Col md={10} >
                <Card
                  title={data.Title}
                  category={data.Agenda}
                  content={
                    <div className="gh"
                      style={{
                        marginBottom: '40px'
                      }}
                    >
                      <p>Date : {moment.unix(data.Date.seconds).format('DD MMM YYYY')}</p>
                      <p>Link  : {data.Link}</p>
                      <p>Decisions Made  : {data.Link}</p>
                      <p>Future Scope : {data.Link}</p>
                      <p>Remarks: {data.Remarks}</p>
                      <p>Amendments : {data.Amendments}</p>
                      <Link to={`/event/${data.id}`}>
                        <span style={{ fontWeight: "70 %", fontSize: '20px' }}>Explore</span></Link>
                    </div>
                  }
                />
              </Col>
            ))}


          </Row>

        </Grid >
      </div >
    );
  }
}

export default Dashboard;
