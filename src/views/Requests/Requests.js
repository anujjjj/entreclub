import React, { Component } from "react";
import { Grid, Row, Col, Table, Button } from "react-bootstrap";
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

class Requests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }



  componentDidMount() {

    const db = firestore.firestore();
    var ref = db.collection('Users');
    let size = 0, val = '';
    let users = []
    let user = []
    let obj = ''
    let id = this.props.match.params.id;
    db.collection('Users').get().then(snap => {
      size = snap.docs.length // will return the collection size
      snap.docs.forEach(data => {
        val = data.data();
        if (val.flag === "0") {
          obj = {
            emailid: val.emailid
          }
          user = Object.values(obj);
          users.push(user);
          console.log(users);
        }
      });
      this.setState({
        users: users
      })

    });
  }

  handleClick = (props, val) => {
    console.log(props);
    const db = firestore.firestore();
    db.collection("Users").doc(props[0]).update({
      flag: val
    }).then(() => {
      let u = []
      u = u.filter(function (item) {
        return item !== props
      })
      console.log(u);
      this.setState({
        users: u
      })
    })
  }

  render() {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    // console.log(users);
    // console.log(eventsInfo);
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Requests"
                category="List of pending requests"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        <td>Users</td>
                        <td>Accept</td>
                        <td>Decline</td>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.users.map((prop, key) => {
                        return (
                          <tr key={key}>
                            {prop.map((prop, key) => {
                              if (key === 0) {
                                return <Link to={`/user/${prop}`} ><td key={key}>{prop}</td></Link>
                              }
                              return <td key={key}>{prop}</td>;
                            })}
                            <td key={2}>
                              <Button className="primary"
                                style={{
                                  color: "blue",
                                  backgroundColor: "green"
                                }}
                                onClick={() => this.handleClick(prop, "1")}
                              >Accept
                              </Button>
                            </td>
                            <td key={3}>
                              <Button className="primary"
                                onClick={() => this.handleClick(prop, "2")}
                                style={{
                                  color: "blue",
                                  backgroundColor: "red"
                                }}
                              >
                                Decline</Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />

            </Col>



          </Row>

        </Grid >
      </div >
    );
  }
}

export default Requests;
