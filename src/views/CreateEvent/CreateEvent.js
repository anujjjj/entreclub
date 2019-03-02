import React, { Component } from "react";
import { Grid, Row, Col,FormGroup,
  ControlLabel,
  FormControl } from "react-bootstrap";
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

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsInfo: []
    }
  }

  componentDidMount() {


  }



  render() {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    let eventsInfo = this.state.eventsInfo
    console.log(eventsInfo);
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
                        label: "Agenda",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Enter agenda for the event",
                        defaultValue: "Business",
                        onChange: this.handleChange
                      }
                    ]}
                  />
                  <FormInputs
                    ncols={["col-md-5", "col-md-5"]}
                    proprieties={[
                      {
                        label: "Date",
                        type: "date",
                        bsClass: "form-control",
                        placeholder: "DD/MM/YY",
                        defaultValue:
                          "XYZ",
                        onChange: this.handleChange
                      },
                      {
                        label: "Time",
                        type: "time",
                        bsClass: "form-control",
                        placeholder: "Position",
                        defaultValue: "01:01",
                        onChange: this.handleChange
                      }
                    ]}
                  />
                  <FormInputs
                    ncols={["col-md-8"]}
                    proprieties={[
                      {
                        label: "Platform",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Enter Platform for the event",
                        defaultValue: "Google+",
                        onChange: this.handleChange
                      }
                    ]}
                  />
                  <FormInputs
                    ncols={["col-md-8"]}
                    proprieties={[
                      {
                        label: "Link",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Enter Link for the event",
                        defaultValue: "Google+",
                        onChange: this.handleChange
                      }
                    ]}
                  />
                  
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

export default CreateEvent;
