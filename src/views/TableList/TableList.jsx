import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import firestore from "../../firestore";
import moment from 'moment'
import { Link } from 'react-router-dom'

import Card from "components/Card/Card.jsx";


class TableList extends Component {

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
        obj = {
          emailid: val.emailid,
          contact: val.contact,
          compname: val.companyname,
          city: val.city,
          dob: moment(val.dob).format("DD MM YYYY")
        }
        user = Object.values(obj);
        users.push(user);
        console.log(users);
      });
      this.setState({
        users: users
      })
    }
    );
  }

  render() {
    let users = this.state.users;
    let thArray = ["EmailId", "Contact", "Company Name", "City", "DOB"]
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Entrepreneurs"
                category="List of registered entrepreneurs"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((prop, key) => {
                        return (
                          <tr key={key}>
                            {prop.map((prop, key) => {
                              if (key === 0) {
                                return <Link to={`/user/${prop}`} ><td key={key}>{prop}</td></Link>
                              }
                              return <td key={key}>{prop}</td>;
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default TableList;
